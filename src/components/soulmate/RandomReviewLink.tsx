import { useNavigate, useSearchParams } from "react-router-dom";

const defaultLinkClassName =
  "w-full py-4 px-8 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center text-center";

function RandomReviewLinkInner({
  locale,
  children,
  className,
}: {
  locale: string;
  children: React.ReactNode;
  className?: string;
}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const search = searchParams.toString();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
  
    const id = 1 + Math.floor(Math.random() * 5);
  
    const path = `/${locale}/soulmate/review/${id}`;
  
    navigate(search ? `${path}?${search}` : path);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className ?? defaultLinkClassName}
    >
      {children}
    </button>
  );
}

export function RandomReviewLink({
  locale,
  children,
  className,
}: {
  locale: string;
  children: React.ReactNode;
  className?: string;
}) {
  const linkClassName = className ?? defaultLinkClassName;
  return (
    <RandomReviewLinkInner locale={locale} className={linkClassName}>
      {children}
    </RandomReviewLinkInner>
  );
}
