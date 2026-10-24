import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  UserPlus, 
  LayoutGrid, 
  List, 
  Table as TableIcon, 
  Mail, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  Search,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

// --- NAVBAR COMPONENT ---
function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isForm = location.pathname === '/employee-form';

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 text-decoration-none">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block leading-none text-white">EmpDash</span>
              <span className="text-xs text-slate-400">Assignment 2 Portal</span>
            </div>
          </Link>

          <nav className="flex items-center space-x-2 sm:space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isHome
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Home (Dashboard)</span>
            </Link>

            <Link
              to="/employee-form"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isForm
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <UserPlus className="h-4 w-4" />
              <span>Employee Form</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

// --- HOME / EMPLOYEE DASHBOARD COMPONENT ---
function EmployeeDashboard() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('table');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error('Failed to fetch employee data from API');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(emp.id).includes(searchQuery)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Employee Dashboard</h1>
          <p className="text-slate-600 text-sm mt-1">
            Directory fetched from <code className="bg-slate-200 px-1.5 py-0.5 rounded text-xs font-mono">jsonplaceholder.typicode.com/users</code>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="h-4 w-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search ID, name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-60"
            />
          </div>

          <div className="inline-flex bg-slate-200 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('table')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="h-3.5 w-3.5" />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode('card')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
                viewMode === 'card' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
                viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="h-3.5 w-3.5" />
              <span>List</span>
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
          <RefreshCw className="h-8 w-8 text-indigo-600 animate-spin mx-auto mb-3" />
          <p className="text-slate-600 font-medium">Loading employee data from API...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <div>
              <h3 className="text-red-800 font-semibold">Error Loading Data</h3>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
          <button
            onClick={fetchEmployees}
            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {viewMode === 'table' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3.5 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {filteredEmployees.map((emp) => (
                      <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                            #{emp.id}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-9 w-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-sm">
                              {emp.name.charAt(0)}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-semibold text-slate-900">{emp.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-slate-400" />
                            <span>{emp.email}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {viewMode === 'card' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((emp) => (
                <div
                  key={emp.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                      {emp.name.charAt(0)}
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                      ID: #{emp.id}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{emp.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-slate-600 mt-3 pt-3 border-t border-slate-100">
                    <Mail className="h-4 w-4 text-indigo-500 shrink-0" />
                    <span className="truncate">{emp.email}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'list' && (
            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-200 shadow-sm">
              {filteredEmployees.map((emp) => (
                <div
                  key={emp.id}
                  className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-xs font-bold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-md">
                      #{emp.id}
                    </span>
                    <span className="font-semibold text-slate-900">{emp.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-600">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <span>{emp.email}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// --- EMPLOYEE FORM COMPONENT ---
function EmployeeForm() {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    location: '',
    salary: ''
  });
  const [submittedEntries, setSubmittedEntries] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      ...formData
    };
    setSubmittedEntries((prev) => [newEntry, ...prev]);
    setShowSuccess(true);
    setFormData({ name: '', designation: '', location: '', salary: '' });
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 px-6 py-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2.5 rounded-xl">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Employee Registration Form</h1>
              <p className="text-slate-400 text-sm">Enter new employee details below</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {showSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center space-x-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span className="text-sm font-medium">
                Employee details recorded locally! (Frontend-only as required).
              </span>
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Employee Name *</label>
            <div className="relative">
              <Users className="h-5 w-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Rahul Nair"
                className="w-full pl-11 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Designation *</label>
            <div className="relative">
              <Briefcase className="h-5 w-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="designation"
                required
                value={formData.designation}
                onChange={handleChange}
                placeholder="e.g. Full Stack Developer"
                className="w-full pl-11 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Location *</label>
            <div className="relative">
              <MapPin className="h-5 w-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Kochi, Kerala"
                className="w-full pl-11 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Salary *</label>
            <div className="relative">
              <DollarSign className="h-5 w-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="number"
                name="salary"
                required
                min="0"
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g. 65000"
                className="w-full pl-11 pr-4 py-2.5 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-sm transition duration-150 flex items-center justify-center space-x-2"
            >
              <UserPlus className="h-5 w-5" />
              <span>Submit Employee Details</span>
            </button>
          </div>
        </form>
      </div>

      {submittedEntries.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold text-slate-800 mb-4">Recently Submitted (Frontend Preview)</h2>
          <div className="space-y-3">
            {submittedEntries.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4"
              >
                <div>
                  <h3 className="font-bold text-slate-900">{item.name}</h3>
                  <p className="text-sm text-slate-600">
                    {item.designation} • {item.location}
                  </p>
                </div>
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-semibold rounded-lg text-sm">
                  ₹{Number(item.salary).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// --- MAIN APP WITH ROUTING ---
export default function App() {
  useEffect(() => {
    if (!document.querySelector('script[src*="tailwindcss"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<EmployeeDashboard />} />
            <Route path="/employee-form" element={<EmployeeForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}