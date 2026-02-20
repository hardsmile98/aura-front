import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

type RedirectWithParamsProps = {
  to: string;
};

/**
 * Redirect that preserves query parameters from the current URL.
 */
export function RedirectWithParams({ to }: RedirectWithParamsProps) {
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    const path = to.split('?')[0];

    const target = location.search ? `${path}${location.search}` : path;
  
    navigate(target, { replace: true });
  }, [to, navigate, location.search]);

  return null;
}
