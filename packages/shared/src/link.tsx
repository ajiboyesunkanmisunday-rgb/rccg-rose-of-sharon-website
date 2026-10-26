import NextLink from "next/link";
import type { ComponentProps } from "react";
import { resolveHref } from "./sites";

/**
 * Drop-in replacement for next/link. Write canonical paths (/youth/about, /trainings, /give ...) and the
 * link goes to the right site: a normal client-side link inside this site, a full address for another site.
 */
export default function Link({ href, prefetch, replace, scroll, shallow, ...rest }: ComponentProps<typeof NextLink>) {
  const resolved = typeof href === "string" ? resolveHref(href) : href;
  if (typeof resolved === "string" && /^https?:\/\//i.test(resolved)) {
    return <a href={resolved} {...(rest as ComponentProps<"a">)} />;
  }
  return <NextLink href={resolved} prefetch={prefetch} replace={replace} scroll={scroll} {...rest} />;
}

/** Drop-in replacement for a plain <a href="..."> that should understand canonical paths. */
export function A({ href, ...rest }: ComponentProps<"a">) {
  return <a href={href ? resolveHref(href) : href} {...rest} />;
}
