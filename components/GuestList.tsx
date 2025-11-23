'use client';

import { motion } from 'framer-motion';

interface Guest {
  _id: string;
  name: string;
  email: string;
  attending: boolean;
  message?: string;
  createdAt: string;
}

interface GuestListProps {
  guests: Guest[];
}

export default function GuestList({ guests }: GuestListProps) {
  const attendingGuests = guests.filter((g) => g.attending);
  const notAttendingGuests = guests.filter((g) => !g.attending);

  return (
    <div className="space-y-6">
      {/* Attending Guests */}
      <div>
        <h3 className="text-2xl font-bold text-green-600 mb-4">
          ✅ Tham dự ({attendingGuests.length})
        </h3>
        <div className="space-y-3">
          {attendingGuests.map((guest, index) => (
            <motion.div
              key={guest._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="card-elegant p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-800">{guest.name}</h4>
                  <p className="text-sm text-gray-600">{guest.email}</p>
                  {guest.message && (
                    <p className="text-sm text-gray-600 mt-2 italic">
                      "{guest.message}"
                    </p>
                  )}
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(guest.createdAt).toLocaleDateString('vi-VN')}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Not Attending Guests */}
      {notAttendingGuests.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-red-600 mb-4">
            ❌ Không tham dự ({notAttendingGuests.length})
          </h3>
          <div className="space-y-3">
            {notAttendingGuests.map((guest, index) => (
              <motion.div
                key={guest._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="card-elegant p-4 opacity-60"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-800">{guest.name}</h4>
                    <p className="text-sm text-gray-600">{guest.email}</p>
                    {guest.message && (
                      <p className="text-sm text-gray-600 mt-2 italic">
                        "{guest.message}"
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(guest.createdAt).toLocaleDateString('vi-VN')}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

