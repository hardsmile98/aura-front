import { Link, useSearchParams } from 'react-router-dom';

type ButtonLinkProps = {
  to: string;
  children: React.ReactNode;
};

const linkClassName =
  'w-full py-4 px-8 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center text-center';

export function ButtonLink({ to, children }: ButtonLinkProps) {
  const [searchParams] = useSearchParams();
  const path = to.split('?')[0];
  const search = searchParams.toString();
  const resolvedTo = search ? `${path}?${search}` : path;

  return (
    <Link to={resolvedTo} className={linkClassName}>
      {children}
    </Link>
  );
}
