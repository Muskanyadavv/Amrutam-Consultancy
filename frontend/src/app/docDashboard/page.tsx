"use client";
import useAuth from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function DoctorProfile() {
  const { user, loading } = useAuth("doctor");
  const router = useRouter();

  const [appointments, setAppointments] = useState<any[]>([]);
  const [date, setDate] = useState("");
  const [startHour, setStartHour] = useState<number | "">(9);
  const [endHour, setEndHour] = useState<number | "">(17);
  const [slotDuration, setSlotDuration] = useState<number | "">(30);
  const [slotLoading, setSlotLoading] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null); // track input focus

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && user === null) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Fetch upcoming slots
  useEffect(() => {
    if (user?._id) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/availability/doctor/upcoming`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setAppointments(data))
        .catch((err) => console.error(err));
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handleGenerateSlots = async () => {
    if (!date) {
      toast.warn("⚠️ Please select a date first!");
      return;
    }

    setSlotLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/availability/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ date, startHour, endHour, slotDuration }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("✅ Slots generated successfully!");
      } else {
        toast.error(data.message || "❌ Error generating slots");
      }
    } catch (err) {
      console.error(err);
      toast.error("❌ Server error generating slots");
    } finally {
      setSlotLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#e1ddb2] px-4 py-10">
      <div className="bg-white border-2 border-yellow-900 shadow-lg rounded-xl p-8 w-full max-w-4xl mx-auto">
        {/* Profile Info */}
        <div className="text-center">
          <div className="w-24 h-24 bg-blue-100 border-2 border-yellow-800 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-yellow-700">
            {user.name?.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold mt-4 text-yellow-800">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {/* Slot Generation */}
        <div className="mt-8">
          <h2 className="text-lg text-yellow-800 font-semibold mb-2">
            Generate Available Slots
          </h2>

          {/* Show active field */}
          {activeField && (
            <p className="mb-3 text-sm text-blue-700">
              ✏️ You are entering: <b>{activeField}</b>
            </p>
          )}

          <div className="grid grid-cols-2 gap-4 text-yellow-700">
            <input
              type="date"
              className="border p-2 rounded"
              value={date}
              onFocus={() => setActiveField("Date")}
              onBlur={() => setActiveField(null)}
              onChange={(e) => setDate(e.target.value)}
            />
            <input
              type="number"
              className="border p-2 rounded"
              value={startHour}
              onFocus={() => setActiveField("Start Hour")}
              onBlur={() => setActiveField(null)}
              onChange={(e) =>
                setStartHour(e.target.value === "" ? "" : parseInt(e.target.value))
              }
              placeholder="Start Hour"
            />
            <input
              type="number"
              className="border p-2 rounded"
              value={endHour}
              onFocus={() => setActiveField("End Hour")}
              onBlur={() => setActiveField(null)}
              onChange={(e) =>
                setEndHour(e.target.value === "" ? "" : parseInt(e.target.value))
              }
              placeholder="End Hour"
            />
            <input
              type="number"
              className="border p-2 rounded"
              value={slotDuration}
              onFocus={() => setActiveField("Slot Duration")}
              onBlur={() => setActiveField(null)}
              onChange={(e) =>
                setSlotDuration(e.target.value === "" ? "" : parseInt(e.target.value))
              }
              placeholder="Duration (Hours)"
            />
          </div>

          <button
            onClick={handleGenerateSlots}
            className="mt-4 bg-[#2E8B57] hover:bg-green-700 text-white px-4 py-2 rounded"
            disabled={slotLoading}
          >
            {slotLoading ? "Generating..." : "Generate Slots"}
          </button>
        </div>

        {/* Upcoming Appointments */}
        <div className="mt-8">
          <h2 className="text-lg text-yellow-800 font-semibold mb-2">
            Upcoming Appointments
          </h2>
          {appointments.length === 0 ? (
            <p className="text-yellow-800">No upcoming appointments.</p>
          ) : (
            <ul className="divide-y">
              {appointments.map((appt) => (
                <li key={appt._id} className="py-2 flex justify-between">
                  <span>
                    {new Date(appt.slotId.startAt).toLocaleString()} -{" "}
                    {appt.patientId?.name}
                  </span>
                  <span className="text-sm text-gray-500">{appt.status}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Logout */}
        <div className="mt-8">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
