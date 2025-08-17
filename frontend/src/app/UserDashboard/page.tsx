"use client";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function PatientProfile() {
  const { user, loading } = useAuth("patient");
  const router = useRouter();

  // 🔹 If no user, redirect to login automatically
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return null; // prevent flashing "user not found"
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login"); // redirect after logout
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-200 px-4 py-10">
      <div className="bg-white border-2 border-green-300 shadow-lg rounded-xl p-8 w-full max-w-lg">
        {/* Avatar */}
        <div className="text-center">
          <div className="w-24 h-24 bg-green-100 border-2 border-green-400 rounded-full mx-auto flex items-center justify-center text-3xl font-bold text-green-700">
            {user.name?.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold mt-4 text-green-800">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {/* Info */}
        <div className="mt-6 space-y-3 text-gray-700">
          <p><strong>Role:</strong> Patient</p>
          <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
          <p><strong>Appointments Booked:</strong> {user.appointments?.length || 0}</p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => alert("Profile Updated!")}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
          >
            Update Profile
          </button>
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





