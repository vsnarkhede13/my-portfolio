// File path: src/app/meet/page.tsx

'use client';

import { Calendar, Mail, User, FileText } from 'lucide-react';
import { useEffect } from 'react';

export default function MeetPage() {
  useEffect(() => {
    // Redirect to Google Calendar appointment link with pre-filled parameters
    const googleCalendarUrl = 'https://calendar.app.google/U2P89UrtTucxLrr19';
    
    // Open in same window after a brief moment to show the page
    const timer = setTimeout(() => {
      window.location.href = googleCalendarUrl;
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
              <Calendar className="w-10 h-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Book a Meeting
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Redirecting you to Google Calendar...
            </p>
          </div>

          {/* Loading Animation */}
          <div className="flex justify-center mb-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>

          {/* Information */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              What to Expect
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              You'll be redirected to Google Calendar to schedule our meeting. Please provide the following information:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <User className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">First Name & Last Name</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your full name for identification</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Email Address</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Where to send the meeting confirmation</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">Agenda</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Brief description of what you'd like to discuss</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Manual Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Not redirected automatically?
            </p>
            <a
              href="https://calendar.app.google/U2P89UrtTucxLrr19"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              <Calendar className="w-5 h-5" />
              <span>Click Here to Book</span>
            </a>
          </div>

          {/* Footer Note */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              Looking forward to connecting with you! I typically respond to meeting requests within 24 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
