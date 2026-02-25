import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Fbq {
    (...args: unknown[]): void;
    callMethod?: (...args: unknown[]) => void;
    queue?: unknown[];
    push?: (...args: unknown[]) => void;
    loaded?: boolean;
    version?: string;
  }

  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID;

function initMetaPixel() {
  if (!PIXEL_ID || window?.fbq) return;

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.innerHTML = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
  `;

  document.head.appendChild(script);

  window?.fbq?.('init', PIXEL_ID as string);
}

export function MetaPixel() {
  const location = useLocation();

  useEffect(() => {
    try {
      initMetaPixel();
    } catch (error) {
      console.error('Error initializing Meta Pixel:', error);
    }
  }, []);

  useEffect(() => {
    if (!PIXEL_ID || !window.fbq) return;

    window?.fbq?.('track', 'PageView');
  }, [location.pathname, location.search]);

  return null;
}