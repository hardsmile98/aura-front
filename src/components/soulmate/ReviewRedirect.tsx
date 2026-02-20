import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ReviewRedirect({ locale }: { locale: string }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/${locale}/soulmate/review/1`, { replace: true });
  }, [locale, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-zinc-500">...</div>
    </div>
  );
}
