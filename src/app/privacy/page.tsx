export default function PrivacyPage() {
  const lastUpdated = "January 24, 2026";

  return (
    <div className="min-h-screen bg-white py-20 px-6">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
          Privacy Policy
        </h1>
        <p className="text-slate-500 mb-10">Last updated: {lastUpdated}</p>

        <div className="prose prose-slate lg:prose-lg">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">1. Overview</h2>
            <p className="text-slate-600 leading-relaxed">
              This portfolio is a personal space to share my work, thoughts, and photography. 
              I value your privacy as much as my own. This policy outlines how I handle 
              information on this site.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">2. Data Collection</h2>
            <p className="text-slate-600 leading-relaxed">
              <strong>Direct Information:</strong> I only collect personal information 
              (such as your name or email) when you voluntarily provide it via the 
              "Book a Meeting" page or by contacting me directly.
            </p>
            <p className="text-slate-600 leading-relaxed mt-4">
              <strong>Cookies:</strong> This site is built with Next.js and hosted on Vercel. 
              I do not use invasive tracking cookies or sell your data to third parties.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">3. Third-Party Services</h2>
            <p className="text-slate-600 leading-relaxed">
              I use <strong>Calendly</strong> to manage my schedule. When you book a meeting, 
              their privacy policy applies to the data you enter into that widget.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">4. Contact</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions about this policy, feel free to reach out via 
              the contact details provided in the footer.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-100">
          <a href="/" className="text-blue-600 font-medium hover:underline">
            ← Back to Home
          </a>
        </div>
      </article>
    </div>
  );
}