import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
  }
}

const COUNTER_ID = import.meta.env.VITE_YANDEX_METRIKA_ID
  ? Number(import.meta.env.VITE_YANDEX_METRIKA_ID)
  : null;

function initYandexMetrika() {
  if (!COUNTER_ID || window.ym) return;

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.async = true;
  script.innerHTML = `
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r)return;}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    ym(${COUNTER_ID}, "init", {clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true});
  `;

  document.head.appendChild(script);
}

export function YandexMetrika() {
  const location = useLocation();

  useEffect(() => {
    try {
      initYandexMetrika();
    } catch (error) {
      console.error('Error initializing Yandex Metrika:', error);
    }
  }, []);

  useEffect(() => {
    if (!COUNTER_ID || !window.ym) return;

    const url = window.location.origin + location.pathname + location.search;

    window?.ym?.(COUNTER_ID, 'hit', url, {
      title: document.title,
      referrer: document.referrer || undefined,
    });
  }, [location.pathname, location.search]);

  return null;
}
