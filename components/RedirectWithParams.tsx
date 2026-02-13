"use client";

import { useEffect } from "react";

type RedirectWithParamsProps = {
  to: string;
};

/**
 * Client-side redirect that preserves query parameters from the current URL.
 * Use for static export where server-side redirect/headers are unavailable.
 */
export function RedirectWithParams({ to }: RedirectWithParamsProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const path = to.split('?')[0];
  
    const search = window.location.search;
  
    const target = search ? `${path}?${search}` : path;

    window.location.replace(target);
  }, [to]);

  return null;
}
