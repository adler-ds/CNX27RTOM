'use client';

import { useState, useEffect } from 'react';

interface Login {
  id: number;
  url: string;
  username: string;
  password: string;
  assigned: boolean;
  assignedTo: string | null;
  contactName: string;
  contactEmail: string;
}

interface Stats {
  total: number;
  assigned: number;
  available: number;
}

export default function AdminPage() {
  const [logins, setLogins] = useState<Login[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAssigned, setFilterAssigned] = useState<'all' | 'assigned' | 'available'>('all');

  const fetchLogins = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/logins');
      const data = await response.json();

      if (response.ok) {
        setLogins(data.logins);
        setStats(data.stats);
      } else {
        setError(data.error || 'Failed to fetch logins');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogins();
  }, []);

  const handleReset = async (loginId: number) => {
    if (!confirm('Are you sure you want to reset this login assignment?')) {
      return;
    }

    try {
      const response = await fetch('/api/admin/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ loginId }),
      });

      if (response.ok) {
        fetchLogins();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to reset login');
      }
    } catch (err) {
      alert('An error occurred while resetting the login');
    }
  };

  const filteredLogins = logins.filter((login) => {
    const matchesSearch =
      searchTerm === '' ||
      login.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      login.assignedTo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      login.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
      login.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      login.contactEmail.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterAssigned === 'all' ||
      (filterAssigned === 'assigned' && login.assigned) ||
      (filterAssigned === 'available' && !login.assigned);

    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Admin Panel - Login Management
          </h1>
          <p className="text-sm text-gray-500 mb-4">
            Secret URL: /secret-admin-panel-x9k2m
          </p>

          {stats && (
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">
                  {stats.total}
                </div>
                <div className="text-sm text-blue-600">Total Logins</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-700">
                  {stats.assigned}
                </div>
                <div className="text-sm text-green-600">Assigned</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-yellow-700">
                  {stats.available}
                </div>
                <div className="text-sm text-yellow-600">Available</div>
              </div>
            </div>
          )}

          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by email, username, or URL..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <select
              value={filterAssigned}
              onChange={(e) =>
                setFilterAssigned(e.target.value as 'all' | 'assigned' | 'available')
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All</option>
              <option value="assigned">Assigned Only</option>
              <option value="available">Available Only</option>
            </select>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact (Demo)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    URL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Password
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogins.map((login) => (
                  <tr
                    key={login.id}
                    className={login.assigned ? 'bg-gray-50' : ''}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {login.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="font-medium text-gray-900">{login.contactName}</div>
                      <div className="text-xs text-gray-500">{login.contactEmail}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <a
                        href={login.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 underline"
                      >
                        {login.url}
                      </a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      {login.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                      {login.password}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {login.assigned ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Assigned
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Available
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {login.assignedTo || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {login.assigned && (
                        <button
                          onClick={() => handleReset(login.id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Reset
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredLogins.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No logins found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
