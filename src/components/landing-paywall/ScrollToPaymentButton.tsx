import { Link } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function ScrollToPaymentButton({ children, className, style }: Props) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('payment-button')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  return (
    <Link to="#payment-button" onClick={handleClick} className={className} style={style}>
      {children}
    </Link>
  );
}
