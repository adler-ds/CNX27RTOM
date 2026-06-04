'use client';

import { useState } from 'react';

interface LoginInfo {
  url: string;
  username: string;
  password: string;
  contactName: string;
  contactEmail: string;
}

export default function Home() {
  const [email, setEmail] = useState('');
  const [loginInfo, setLoginInfo] = useState<LoginInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/assign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setLoginInfo(data.login);
        setMessage(data.message);
      } else {
        setError(data.error || 'Failed to assign login');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Scott's Personalized Demo Experience
        </h1>

        {!loginInfo ? (
          <>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-green-900 mb-4 flex items-center">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg font-bold">1</span>
                Step 1: View the Read-Only Demo
              </h2>
              <p className="text-green-800 mb-4 text-sm">
                First, log into the read-only site to see Scott's personalized experience:
              </p>
              <div className="bg-white rounded-lg p-4 space-y-3 border border-green-200">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    URL
                  </label>
                  <a
                    href="https://login.salesforce.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 hover:text-green-900 underline font-mono text-sm break-all"
                  >
                    login.salesforce.com
                  </a>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Username
                  </label>
                  <div className="bg-gray-50 px-3 py-2 rounded border border-gray-200 font-mono text-sm">
                    promoupsdemo2@example.com
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Password
                  </label>
                  <div className="bg-gray-50 px-3 py-2 rounded border border-gray-200 font-mono text-sm">
                    Abcd@1234
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg font-bold">2</span>
                Step 2: Get Your Own Interactive Org
              </h2>
              <p className="text-blue-800 mb-4 text-sm">
                Request your personal credentials to create offers and experience a personalized demo:
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Enter your email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {loading ? 'Processing...' : 'Get My Personal Org Credentials'}
            </button>
          </form>
          </>
        ) : (
          <div className="space-y-4">
            {message && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                {message}
              </div>
            )}

            <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-6 mb-4">
              <h2 className="text-xl font-bold text-purple-900 mb-3 flex items-center">
                <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg font-bold">3</span>
                Step 3: Experience Your Personalized Demo
              </h2>
              <p className="text-purple-800 mb-4 text-sm">
                Use your credentials below to log into your personal org, then visit Scott's demo site:
              </p>
              <div className="bg-white rounded-lg p-4 border border-purple-200">
                <label className="block text-xs font-semibold text-gray-600 mb-2">
                  Scott's Demo Site
                </label>
                <a
                  href="https://promo-ups-org2-4ff2cdd3b3d9.herokuapp.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-700 hover:text-purple-900 underline font-medium text-sm break-all"
                >
                  https://promo-ups-org2-4ff2cdd3b3d9.herokuapp.com/
                </a>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Your Personal Org Credentials
              </h2>

              {loginInfo.contactName && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
                  <h3 className="text-sm font-semibold text-blue-900 mb-2">
                    Scott's Demo Site - Contact to Use
                  </h3>
                  <div className="space-y-1">
                    <div className="text-blue-800 font-medium">
                      {loginInfo.contactName}
                    </div>
                    <div className="text-blue-600 text-sm">
                      {loginInfo.contactEmail}
                    </div>
                  </div>
                </div>
              )}

              {!loginInfo.contactName && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
                  <h3 className="text-sm font-semibold text-yellow-900 mb-1">
                    No specific contact assigned
                  </h3>
                  <p className="text-yellow-700 text-xs">
                    You can use any contact for this demo login
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Login URL
                </label>
                <a
                  href={loginInfo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 underline break-all"
                >
                  {loginInfo.url}
                </a>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Username
                </label>
                <div className="bg-white px-3 py-2 rounded border border-gray-200 font-mono text-sm">
                  {loginInfo.username}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Password
                </label>
                <div className="bg-white px-3 py-2 rounded border border-gray-200 font-mono text-sm">
                  {loginInfo.password}
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setLoginInfo(null);
                setEmail('');
              }}
              className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
            >
              Check Another Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
