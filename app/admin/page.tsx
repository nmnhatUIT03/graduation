'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Guest {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  attending: boolean;
  numberOfGuests: number;
  message?: string;
  dietaryRestrictions?: string;
  createdAt: string;
}

interface Stats {
  total: number;
  attending: number;
  notAttending: number;
  totalPeople: number;
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'attending' | 'not-attending'>('all');

  const fetchGuests = async (pwd: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/guests?password=${encodeURIComponent(pwd)}`);
      const data = await response.json();

      if (data.success) {
        setGuests(data.guests);
        setStats(data.stats);
        setAuthenticated(true);
      } else {
        setError(data.message || 'Sai mật khẩu');
        setAuthenticated(false);
      }
    } catch (err) {
      setError('Không thể kết nối đến server');
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGuests(password);
  };

  const handleDelete = async (email: string) => {
    if (!confirm('Bạn có chắc muốn xóa guest này?')) {
      return;
    }

    try {
      const response = await fetch(
        `/api/guests?password=${encodeURIComponent(password)}&email=${encodeURIComponent(email)}`,
        { method: 'DELETE' }
      );
      
      const data = await response.json();
      
      if (data.success) {
        fetchGuests(password);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Đã xảy ra lỗi khi xóa');
    }
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Tên', 'Email', 'SĐT', 'Tham dự', 'Số người', 'Yêu cầu ăn uống', 'Lời nhắn', 'Ngày đăng ký'],
      ...guests.map((g) => [
        g.name,
        g.email,
        g.phone || '',
        g.attending ? 'Có' : 'Không',
        g.numberOfGuests,
        g.dietaryRestrictions || '',
        g.message || '',
        new Date(g.createdAt).toLocaleString('vi-VN'),
      ]),
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `guests_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const filteredGuests = guests.filter((g) => {
    if (filter === 'attending') return g.attending;
    if (filter === 'not-attending') return !g.attending;
    return true;
  });

  if (!authenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-elegant p-8 w-full max-w-md"
        >
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">🔐</div>
            <h1 className="text-3xl font-serif font-bold text-gray-800">
              Admin Panel
            </h1>
            <p className="text-gray-600 mt-2">
              Nhập mật khẩu để truy cập
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Mật khẩu"
              className="input-elegant mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          <Link
            href="/"
            className="block text-center mt-6 text-sm text-gray-500 hover:text-pink-500 transition-colors"
          >
            ← Quay lại trang chủ
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <h1 className="text-4xl font-serif font-bold text-gray-800">
              📊 Quản Lý Khách Mời
            </h1>
            <div className="flex gap-3">
              <button
                onClick={exportToCSV}
                className="btn-secondary text-sm py-2 px-6"
              >
                📥 Export CSV
              </button>
              <button
                onClick={() => fetchGuests(password)}
                className="btn-secondary text-sm py-2 px-6"
              >
                🔄 Refresh
              </button>
              <Link href="/" className="btn-secondary text-sm py-2 px-6">
                ← Trang chủ
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="card-elegant p-6 text-center">
                <div className="text-4xl font-bold text-gray-800">{stats.total}</div>
                <div className="text-sm text-gray-600 mt-1">Tổng phản hồi</div>
              </div>
              <div className="card-elegant p-6 text-center bg-gradient-to-br from-green-50 to-green-100">
                <div className="text-4xl font-bold text-green-600">{stats.attending}</div>
                <div className="text-sm text-gray-600 mt-1">Tham dự</div>
              </div>
              <div className="card-elegant p-6 text-center bg-gradient-to-br from-red-50 to-red-100">
                <div className="text-4xl font-bold text-red-600">{stats.notAttending}</div>
                <div className="text-sm text-gray-600 mt-1">Không tham dự</div>
              </div>
              <div className="card-elegant p-6 text-center bg-gradient-to-br from-purple-50 to-purple-100">
                <div className="text-4xl font-bold text-purple-600">{stats.totalPeople}</div>
                <div className="text-sm text-gray-600 mt-1">Tổng số người</div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Filter */}
        <div className="card-elegant p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tất cả ({guests.length})
            </button>
            <button
              onClick={() => setFilter('attending')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === 'attending'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ✓ Tham dự ({guests.filter((g) => g.attending).length})
            </button>
            <button
              onClick={() => setFilter('not-attending')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === 'not-attending'
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ✗ Không tham dự ({guests.filter((g) => !g.attending).length})
            </button>
          </div>
        </div>

        {/* Guest List */}
        <div className="space-y-4">
          {filteredGuests.length === 0 ? (
            <div className="card-elegant p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <p className="text-gray-600 text-lg">Chưa có khách mời nào</p>
            </div>
          ) : (
            filteredGuests.map((guest, index) => (
              <motion.div
                key={guest._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`card-elegant p-6 ${
                  guest.attending
                    ? 'border-l-4 border-green-500'
                    : 'border-l-4 border-red-500'
                }`}
              >
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-2xl">
                        {guest.attending ? '✅' : '❌'}
                      </span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {guest.name}
                        </h3>
                        <p className="text-gray-600">{guest.email}</p>
                        {guest.phone && (
                          <p className="text-gray-600">📱 {guest.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="ml-11 space-y-1 text-sm">
                      {guest.attending && (
                        <p className="text-gray-700">
                          <span className="font-semibold">Số người:</span>{' '}
                          {guest.numberOfGuests}
                        </p>
                      )}
                      {guest.dietaryRestrictions && (
                        <p className="text-gray-700">
                          <span className="font-semibold">Yêu cầu ăn uống:</span>{' '}
                          {guest.dietaryRestrictions}
                        </p>
                      )}
                      {guest.message && (
                        <p className="text-gray-700">
                          <span className="font-semibold">Lời nhắn:</span>{' '}
                          {guest.message}
                        </p>
                      )}
                      <p className="text-gray-500 text-xs">
                        Đăng ký: {new Date(guest.createdAt).toLocaleString('vi-VN')}
                      </p>
                    </div>
                  </div>

                  <div className="flex md:flex-col gap-2">
                    <button
                      onClick={() => handleDelete(guest.email)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
                    >
                      🗑️ Xóa
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}

