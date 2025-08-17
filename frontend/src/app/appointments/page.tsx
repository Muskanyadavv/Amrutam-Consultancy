"use client";
import { useEffect, useState } from "react";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/availibility/appointments`)
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading appointments...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6e7] px-6 py-10">
      <h1 className="text-2xl font-bold text-yellow-900 mb-6">All Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <div className="bg-white border shadow rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-yellow-100">
              <tr>
                <th className="p-3 border">Date & Time</th>
                <th className="p-3 border">Doctor</th>
                <th className="p-3 border">Patient</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-gray-50">
                  <td className="p-3 border">
                    {new Date(appt.slotId?.startAt).toLocaleString()}
                  </td>
                  <td className="p-3 border">{appt.doctorId?.name}</td>
                  <td className="p-3 border">{appt.patientId?.name}</td>
                  <td
                    className={`p-3 border font-semibold ${
                      appt.status === "booked"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {appt.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
