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
    const target = new URL(to, window.location.origin);
  
    target.search = window.location.search;

    window.location.replace(target.toString());
  }, [to]);

  return null;
}
