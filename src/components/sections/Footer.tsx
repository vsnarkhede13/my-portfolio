import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-slate-500">
          © 2026 Vishal. Built with Next.js & Passion.
        </div>
        
        <div className="flex gap-8 text-sm font-medium text-slate-600">
          <Link href="/privacy" className="hover:text-black">Privacy Policy</Link>
          <a href="https://twitter.com/yourhandle" target="_blank" className="hover:text-black">Twitter</a>
          <a href="https://linkedin.com/in/yourhandle" target="_blank" className="hover:text-black">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}