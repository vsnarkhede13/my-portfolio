export default function Hero() {
  return (
    <section className="py-24 flex flex-col items-center text-center">
      <div className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-blue-600 uppercase bg-blue-50 rounded-full">
        Available for new projects
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 mb-6">
        Building digital products <br /> 
        <span className="text-gray-400">with purpose and code.</span>
      </h1>
      <p className="max-w-2xl text-lg text-slate-600 mb-10 leading-relaxed">
        I'm Vishal—a developer focused on clean interfaces and scalable systems. 
        I write about my journey and share what I learn along the way.
      </p>
      <div className="flex gap-4">
        <button className="bg-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform">
          View My Work
        </button>
        <button className="border border-slate-200 px-8 py-4 rounded-full font-bold hover:bg-slate-50 transition">
          Read the Blog
        </button>
      </div>
    </section>
  );
}