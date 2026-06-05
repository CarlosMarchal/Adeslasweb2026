/**
 * JsonLd — renderiza bloques JSON-LD server-side (Server Component).
 * Autor: Juan Carlos Díaz — Convertiam.
 */
export function JsonLd({ schemas }: { schemas: Array<Record<string, unknown> | null | undefined> }) {
  return (
    <>
      {schemas.filter(Boolean).map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
