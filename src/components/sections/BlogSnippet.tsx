export default function BlogSnippet() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-6">Latest Writing</h2>
      {/* The "Snap-point" horizontal scroll */}
      <div className="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="min-w-[300px] snap-center bg-gray-50 p-6 rounded-2xl border">
            <span className="text-sm text-gray-500 italic">Jan 24, 2026</span>
            <h3 className="text-xl font-semibold mt-2">The Future of AI Design...</h3>
            <p className="mt-4 text-blue-600 font-medium cursor-pointer">Read more →</p>
          </div>
        ))}
      </div>
    </section>
  );
}