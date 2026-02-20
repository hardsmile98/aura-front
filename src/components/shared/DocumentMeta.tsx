import { useEffect } from 'react';

type DocumentMetaProps = {
  title: string;
  description?: string;
};

export function DocumentMeta({ title, description }: DocumentMetaProps) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    if (description === undefined) return;

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [description]);

  return null;
}
