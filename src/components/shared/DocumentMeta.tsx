type DocumentMetaProps = {
  title: string;
  description?: string;
};

export function DocumentMeta({ title, description }: DocumentMetaProps) {
  return (
    <>
      <title>{title}</title>

      {description && (
        <meta name="description" content={description} />
      )}
    </>
  );
}
