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
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Login Assignment Portal
        </h1>

        {!loginInfo ? (
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
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Processing...' : 'Get Login Credentials'}
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            {message && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
                {message}
              </div>
            )}

            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Your Login Credentials
              </h2>

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
