"use client";

import { InlineWidget } from "react-calendly";

export default function MeetPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Let’s talk.
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Select a time that works for you. Whether it's a project inquiry, 
          mentorship, or just a virtual coffee—I'm looking forward to it.
        </p>
      </div>

      {/* Calendly Widget Container */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <InlineWidget 
          url="https://calendly.com/YOUR_USERNAME" // Replace with your actual Calendly link
          styles={{
            height: '700px'
          }}
          pageSettings={{
            backgroundColor: 'ffffff',
            hideEventTypeDetails: false,
            hideLandingPageDetails: false,
            primaryColor: '000000',
            textColor: '4d5055'
          }}
        />
      </div>

      <div className="mt-12 text-center text-sm text-slate-500">
        <p>Prefer email? Reach out at <span className="font-semibold text-black">your-email@example.com</span></p>
      </div>
    </div>
  );
}