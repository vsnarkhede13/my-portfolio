// src/app/blog/[[...slug]]/page.tsx

export default function BlogCatchAll({ params }: { params: { slug?: string[] } }) {
  const [year, month, week] = params.slug || [];

  return (
    <div className="min-h-screen p-20">
      <h1 className="text-3xl font-bold">Archive Explorer</h1>
      <nav className="flex gap-2 text-sm text-gray-500 mt-2 capitalize">
        <span>Blog</span>
        {year && <span>/ {year}</span>}
        {month && <span>/ {month}</span>}
        {week && <span>/ {week.replace('-', ' ')}</span>}
      </nav>

      <div className="mt-12 border-t pt-12">
        {!year ? (
          <p>Welcome to the main Blog listing.</p>
        ) : (
          <p>Showing results for {month || "the year"} {year} {week ? `(${week})` : ""}.</p>
        )}
      </div>
    </div>
  );
}