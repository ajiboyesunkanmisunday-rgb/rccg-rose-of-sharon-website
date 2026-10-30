"use client";

import { useEffect } from "react";
import { BIRTH_LABEL, PERSON_NAME_LABEL, checkDate, checkEmail, checkPersonName, checkPhone } from "./validate";

/*
 * Checks the fields of every form on the page for wrong or improper input, as the ROSMS forms do: it flags the
 * field in red with a short message when the visitor leaves it, clears the message as soon as the value is fixed,
 * and stops the form from being sent while anything is still wrong. Mounted once for each site (LayoutWrapper).
 * A field or form can opt out with data-no-check.
 */

type Control = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const STYLE = `
.fc-bad { outline: 2px solid #DC2626 !important; outline-offset: -1px; border-color: #DC2626 !important; }
td .fc-bad, .fc-paper .fc-bad { background-color: #FEF2F2 !important; }
.fc-msg { color: #DC2626; font-size: 12px; line-height: 1.35; margin: 4px 0 0; font-family: inherit; font-weight: 500; }
`;

function labelFor(el: Control): string {
  const id = el.id;
  if (id) {
    const l = document.querySelector<HTMLLabelElement>(`label[for="${CSS.escape(id)}"]`);
    if (l?.textContent) return l.textContent;
  }
  const aria = el.getAttribute("aria-label");
  if (aria) return aria;
  // a field wrapper with a label above the input (the shared FormField)
  const wrap = el.closest("div");
  const lab = wrap?.querySelector("label");
  if (lab?.textContent && lab.contains(el) === false) {
    const t = lab.textContent;
    // only trust a label that sits right before this control inside the same wrapper
    if (wrap && wrap.querySelectorAll("input,select,textarea").length <= 3) return t;
  }
  // paper forms: the label is the cell to the left
  const td = el.closest("td");
  const prev = td?.previousElementSibling;
  if (prev?.textContent) return prev.textContent;
  const cell = td?.textContent;
  if (cell) return cell;
  return el.getAttribute("placeholder") ?? "";
}

function problem(el: Control): string {
  if (el.hasAttribute("data-no-check") || el.closest("[data-no-check]")) return "";
  if (el.disabled || (el as HTMLInputElement).readOnly) return "";
  if (el instanceof HTMLInputElement && ["checkbox", "radio", "file", "hidden", "submit", "button"].includes(el.type)) return "";
  const value = el.value ?? "";
  if (el.required && !value.trim()) return "This field is required";
  if (!value.trim()) return "";
  if (el instanceof HTMLInputElement) {
    if (el.type === "email") return checkEmail(value);
    if (el.type === "tel") return checkPhone(value);
    if (el.type === "date") return checkDate(value, { notFuture: BIRTH_LABEL.test(labelFor(el)) });
  }
  if (el instanceof HTMLInputElement && (el.type === "text" || el.type === "")) {
    const label = labelFor(el);
    if (PERSON_NAME_LABEL.test(label)) return checkPersonName(value);
    if (BIRTH_LABEL.test(label) && /^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value.trim())) {
      const [d, m, y] = value.trim().split("/").map(Number);
      const dt = new Date(y, m - 1, d);
      if (dt.getMonth() !== m - 1 || dt.getDate() !== d || y < 1900) return "Enter a valid date (DD/MM/YYYY)";
      if (dt.getTime() > Date.now()) return "This date cannot be in the future";
    }
  }
  return "";
}

function anchorFor(el: Control): Element {
  const parent = el.parentElement;
  if (parent && parent.querySelectorAll("input,select,textarea").length > 1 && parent.tagName === "DIV") return parent;
  return el;
}

function show(el: Control, message: string) {
  const anchor = anchorFor(el);
  const inCell = !!el.closest("td") || !!el.closest(".fc-paper");
  let note = el.dataset.fcId ? document.getElementById(el.dataset.fcId) : null;
  if (!message) {
    el.classList.remove("fc-bad");
    el.removeAttribute("aria-invalid");
    if (inCell) el.removeAttribute("title");
    note?.remove();
    delete el.dataset.fcId;
    return;
  }
  el.classList.add("fc-bad");
  el.setAttribute("aria-invalid", "true");
  if (inCell) { el.setAttribute("title", message); return; }
  if (!note) {
    note = document.createElement("p");
    note.className = "fc-msg";
    note.setAttribute("role", "alert");
    note.id = `fc-${Math.random().toString(36).slice(2, 9)}`;
    el.dataset.fcId = note.id;
    anchor.insertAdjacentElement("afterend", note);
  }
  note.textContent = message;
}

function isControl(t: EventTarget | null): t is Control {
  return t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement;
}

export default function FormChecks() {
  useEffect(() => {
    const onBlur = (e: Event) => {
      if (!isControl(e.target) || !e.target.closest("form")) return;
      show(e.target, problem(e.target));
    };
    const onInput = (e: Event) => {
      const t = e.target;
      if (!isControl(t) || !t.closest("form")) return;
      // once a field has been flagged, re-check it on every keystroke so the message goes as soon as it is fixed
      if (t.classList.contains("fc-bad")) show(t, problem(t));
    };
    const onSubmit = (e: Event) => {
      const form = e.target;
      if (!(form instanceof HTMLFormElement) || form.hasAttribute("data-no-check")) return;
      let first: Control | null = null;
      form.querySelectorAll<Control>("input,select,textarea").forEach((c) => {
        const msg = problem(c);
        show(c, msg);
        if (msg && !first) first = c;
      });
      if (first) {
        e.preventDefault();
        e.stopImmediatePropagation();
        (first as Control).scrollIntoView({ block: "center", behavior: "smooth" });
        (first as Control).focus({ preventScroll: true });
      }
    };
    const style = document.createElement("style");
    style.textContent = STYLE;
    document.head.appendChild(style);
    document.addEventListener("focusout", onBlur, true);
    document.addEventListener("input", onInput, true);
    document.addEventListener("change", onInput, true);
    document.addEventListener("submit", onSubmit, true);
    return () => {
      style.remove();
      document.removeEventListener("focusout", onBlur, true);
      document.removeEventListener("input", onInput, true);
      document.removeEventListener("change", onInput, true);
      document.removeEventListener("submit", onSubmit, true);
    };
  }, []);
  return null;
}
