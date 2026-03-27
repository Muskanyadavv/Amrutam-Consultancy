"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
    specialty: "",
    experience: "",
    college: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("error");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (message) setMessage("");
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("error");
      return false;
    }
    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters long");
      setMessageType("error");
      return false;
    }
    if (formData.role === "doctor") {
      if (!formData.specialty.trim()) {
        setMessage("Specialty is required for doctors");
        setMessageType("error");
        return false;
      }
      if (!formData.experience || parseInt(formData.experience) < 0) {
        setMessage("Please enter valid years of experience");
        setMessageType("error");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage("");

    try {
      let endpoint = "";
      let payload: Record<string, any> = {};

      if (formData.role === "doctor") {
        endpoint = `${API_URL}/api/doctors`;
        payload = {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          specialty: formData.specialty.trim(),
          experience: parseInt(formData.experience),
          college: formData.college.trim(),
          bio: formData.bio.trim(),
        };
      } else {
        endpoint = `${API_URL}/api/auth/signup`;
        payload = {
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        };
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.message || `Error ${res.status}`);

      setMessage(
        `${formData.role === "doctor" ? "Doctor" : "Patient"} registered successfully! You can now login.`
      );
      setMessageType("success");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "patient",
        specialty: "",
        experience: "",
        college: "",
        bio: "",
      });
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#e1ddb2]">
      {/* Left side image */}
      <div className="hidden md:flex w-3/4 items-center justify-center bg-[#e1ddb2]">
        <img
          src="/img4.png" // replace with your image path
          alt="Amrutam Wellness"
          className="max-w-md w-full object-contain"
        />
      </div>

      {/* Right side form */}
      <div className="flex w-full md:w-3/4 items-center justify-center p-6">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm flex flex-col"
        >
          <h2 className="text-xl font-bold text-amber-700 mb-4 text-center">
            Create an Account
          </h2>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-black font-medium mb-2">
              Sign up as:
            </label>
            <div className="flex text-black gap-6">
              {["patient", "doctor"].map((role) => (
                <label
                  key={role}
                  className="flex items-center text-black gap-2"
                >
                  <input
                    type="radio"
                    name="role"
                    value={role}
                    checked={formData.role === role}
                    onChange={handleChange}
                  />
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Common Fields */}
          {[
            { name: "name", type: "text", label: "Full Name *" },
            { name: "email", type: "email", label: "Email *" },
            { name: "password", type: "password", label: "Password *" },
            {
              name: "confirmPassword",
              type: "password",
              label: "Confirm Password *",
            },
          ].map(({ name, type, label }) => (
            <div className="mb-3 text-black " key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                name={name}
                type={type}
                required
                value={(formData as any)[name]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          ))}

          {/* Doctor-only fields (scrollable) */}
          {formData.role === "doctor" && (
            <div className="mt-2 text-yellow-900 max-h-48 overflow-y-auto pr-2 space-y-3 border-t pt-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Specialty *
                </label>
                <input
                  name="specialty"
                  type="text"
                  placeholder="Cardiology"
                  required
                  value={formData.specialty}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Experience (years) *
                </label>
                <input
                  name="experience"
                  type="number"
                  min={0}
                  max={50}
                  required
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">College</label>
                <input
                  name="college"
                  type="text"
                  value={formData.college}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  rows={2}
                />
              </div>
            </div>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            className="mt-4 w-full bg-amber-700 text-white font-semibold py-2 rounded-lg shadow-md hover:bg-amber-800 disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </motion.button>

          {message && (
            <p
              className={`mt-3 text-center text-sm ${
                messageType === "success" ? "text-amber-700" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}

          <p className="mt-3 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-amber-700 hover:underline">
              Login
            </Link>
          </p>
        </motion.form>
      </div>
    </div>
  );
}
