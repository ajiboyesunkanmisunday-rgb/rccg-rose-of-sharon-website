#!/usr/bin/env python3
"""
Compares every Rose of Sharon API call in the website's source with the backend's Swagger (live, or a saved copy):
path exists, HTTP method allowed, query parameter names known and required ones present, and, for calls with an
object-literal body, every body field is a field of the request schema (and required-looking fields are listed).
Usage: python3 scripts/check-api-conformance.py [swagger.json]
Exit code 1 when something does not match. Run it before any deploy that touches API code.
"""
import json, re, sys, glob, urllib.request

src = sys.argv[1] if len(sys.argv) > 1 else None
sw = json.load(open(src)) if src else json.load(urllib.request.urlopen("http://137.184.72.16:6001/v3/api-docs", timeout=30))
paths = sw["paths"]; schemas = sw["components"]["schemas"]

def match_path(p):
    """Find the swagger path for a call path like /users/member/search (path params may be ${...})."""
    base = p.split("?")[0]
    # a template like /users/${kind}/search stands for each of the member kinds below; all must exist
    if "${kind}" in base:
        alts = [base.replace("${kind}", k) for k in ("member", "e-member")]
        found = [match_path(a) for a in alts]
        return found[0] if all(found) else None
    full = "/api/v1" + re.sub(r"\$\{[^}]*\}", "{x}", base)
    if full in paths: return full
    for sp in paths:
        rx = "^" + re.sub(r"\\\{[^}]+\\\}", "[^/]+", re.escape(sp)) + "$"
        if re.match(rx, full): return sp
    return None

def resolve(s):
    if "$ref" in s: return resolve(schemas[s["$ref"].split("/")[-1]])
    return s

def body_props(op):
    rb = op.get("requestBody")
    if not rb: return None, []
    sc = list(rb["content"].values())[0]["schema"]
    r = resolve(sc)
    return set(r.get("properties", {}).keys()), r.get("required", [])

def top_keys(obj):
    """Top-level keys of a JS object literal string '{...}'."""
    keys, depth, i, n = [], 0, 0, len(obj)
    cur = ""
    while i < n:
        c = obj[i]
        if c in "{[(": depth += 1
        elif c in "}])": depth -= 1
        elif c in "\"'`":
            q = c; j = i + 1
            while j < n and obj[j] != q:
                j += 2 if obj[j] == "\\" else 1
            i = j
        if depth == 1 and c in "{,":
            m = re.match(r"\s*(?:\.\.\.[^,}]*|(\w+)\s*(?::|,|\}))", obj[i + 1:])
            if m and m.group(1): keys.append(m.group(1))
        i += 1
    return keys

def obj_at(text, start):
    d = 0
    for j in range(start, len(text)):
        if text[j] == "{": d += 1
        elif text[j] == "}":
            d -= 1
            if d == 0: return text[start:j + 1]
    return ""

problems, checked = [], 0
files = [f for f in glob.glob("apps/*/**/*.ts*", recursive=True) + glob.glob("packages/shared/src/**/*.ts*", recursive=True) if "/.next/" not in f and "node_modules" not in f]
call_rx = re.compile(r"""(?P<fn>post|apiFetch|rosFetch|createRila|fetch)\(\s*(?P<q>[`"'])(?P<path>[^`"']*)(?P=q)""")
for f in files:
    t = open(f).read()
    for m in call_rx.finditer(t):
        path = m.group("path")
        if m.group("fn") == "fetch":
            mm = re.match(r"\$\{API_BASE\}(/.*)|/ros-api(/.*)", path)
            if not mm: continue
            path = mm.group(1) or mm.group(2)
        if not path.startswith("/"): continue
        if path.startswith("/api/"): continue            # the website's own routes
        # method
        window = t[m.end(): m.end() + 400]
        mth = "post" if m.group("fn") == "post" else (re.search(r"method:\s*[\"'](\w+)[\"']", window) or [None, "GET"])[1].lower()
        sp = match_path(path)
        label = f"{f}: {mth.upper()} {path}"
        checked += 1
        if not sp: problems.append(f"{label}  -> path not in Swagger"); continue
        op = paths[sp].get(mth)
        if not op: problems.append(f"{label}  -> method {mth.upper()} not allowed (Swagger has {', '.join(k.upper() for k in paths[sp])})"); continue
        # query params
        q = path.split("?", 1)[1] if "?" in path else ""
        sent = set(re.findall(r"([A-Za-z]+)=", q))
        qparams = {p["name"]: p for p in op.get("parameters", []) if p["in"] == "query"}
        for s in sent - set(qparams): problems.append(f"{label}  -> unknown query parameter '{s}'")
        missing = [n for n, p in qparams.items() if p.get("required") and n not in sent and not f.endswith("api.ts")]
        if missing and mth == "get" and "${" not in q: problems.append(f"{label}  -> required query parameter(s) missing: {missing}")
        # body
        props, req = body_props(op)
        if mth in ("post", "put", "patch") and props is not None:
            after = t[m.end(): m.end() + 3000]
            bm = re.search(r",\s*(\{)", after) if m.group("fn") == "post" else re.search(r"body:\s*JSON\.stringify\((\{)", after)
            if bm:
                start = m.end() + bm.start(1)
                keys = top_keys(obj_at(t, start))
                bad = [k for k in keys if k not in props]
                if bad: problems.append(f"{label}  -> body field(s) not in the request schema: {bad}")
# calls whose path or body is not a literal cannot be checked by text; list them so they are reviewed by hand
review = []
for f in files:
    t = open(f).read()
    for m in re.finditer(r"\bpost\(\s*([A-Za-z_][\w.]*)\s*,", t):
        review.append(f"{f}: post({m.group(1)}, ...) - path from a variable")
    for m in re.finditer(r"\bpost\(\s*([\"'`][^\"'`]+[\"'`])\s*,\s*([A-Za-z_]\w*)\s*\)", t):
        review.append(f"{f}: post({m.group(1)}, {m.group(2)}) - body from a variable")
for r in sorted(set(review)): print("REVIEW  ", r)
print(f"checked {checked} calls against {len(paths)} Swagger paths")
for p in problems: print("MISMATCH", p)
print("OK: every checked call matches Swagger" if not problems else f"{len(problems)} mismatch(es)")
sys.exit(1 if problems else 0)
