"use client";
import React, { useState, useEffect } from "react";
import { DoctorList } from "./doctorList";

export type Doctor = {
  _id?: string;
  id?: number;
  name: string;
  specialty: string;
  experience: number;
  createdAt?: string;
};

export default function DoctorDashboard() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchName, setSearchName] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [newDoctor, setNewDoctor] = useState<Doctor>({
    name: "",
    specialty: "",
    experience: 0,
  });

  // Fetch from backend when component mounts
  // useEffect(() => {
  //   fetch("http://localhost:8000/api/doctors")
  //     .then((res) => res.json())
  //     .then((data) => setDoctors(data))
  //     .catch((err) => console.error("Failed to fetch doctors:", err));
  // }, []);

  const specialties = Array.from(new Set(doctors.map((d) => d.specialty)));

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesName = doctor.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const matchesSpecialty = specialtyFilter
      ? doctor.specialty === specialtyFilter
      : true;
    return matchesName && matchesSpecialty;
  });

  useEffect(() => {
  fetch("http://localhost:8000/api/doctors")
    .then(async (res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setDoctors(data);
      } else {
        console.error("Unexpected API response:", data);
        setDoctors([]);
      }
    })
    .catch((err) => {
      console.error("Failed to fetch doctors:", err);
      setDoctors([]);
    });
}, []);


  const clearFilters = () => {
    setSearchName("");
    setSpecialtyFilter("");
  };

  const addDoctor = () => {
    if (!newDoctor.name || !newDoctor.specialty || newDoctor.experience <= 0) {
      alert("Please fill all fields correctly.");
      return;
    }

    // Send to backend instead of just adding to local state
    fetch("http://localhost:8000/api/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newDoctor),
    })
      .then((res) => res.json())
      .then((savedDoctor) => {
        setDoctors((prev) => [savedDoctor, ...prev]);
        setNewDoctor({ name: "", specialty: "", experience: 0 });
      })
      .catch((err) => console.error("Failed to add doctor:", err));
  };

  return (
    <div className="min-h-screen bg-[#e1ddb2] py-10 px-6">
      <h1 className="text-3xl text-yellow-900 font-bold text-center mb-8">
        Doctor Dashboard
      </h1>

      {/* Add Doctor Form */}
      {/* <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h2 className="text-lg text-black font-semibold mb-4">Add New Doctor</h2>
        <div className="flex text-black flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newDoctor.name}
            onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
            className="px-4 py-2 border rounded-lg flex-1"
          />
          <input
            type="text"
            placeholder="Specialty"
            value={newDoctor.specialty}
            onChange={(e) => setNewDoctor({ ...newDoctor, specialty: e.target.value })}
            className="px-4 py-2 border rounded-lg flex-1"
          />
          <input
            type="number"
            placeholder="Experience (years)"
            value={newDoctor.experience || ""}
            onChange={(e) =>
              setNewDoctor({ ...newDoctor, experience: Number(e.target.value) })
            }
            className="px-4 py-2 border rounded-lg w-40"
          />
          <button
            onClick={addDoctor}
            className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
          >
            Add Doctor
          </button>
        </div>
      </div> */}

      {/* Filters */}
      <div className="flex flex-col md:flex-row text-black gap-4 mb-8 justify-center">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="px-4 py-2 border text-black rounded-lg w-full md:w-64"
        />
        <select
          value={specialtyFilter}
          onChange={(e) => setSpecialtyFilter(e.target.value)}
          className="px-4 py-2 border text-black rounded-lg w-full md:w-64"
        >
          <option value="">All Specialties</option>
          {specialties.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {/* Filter Summary */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredDoctors.length} of {doctors.length} doctors
          {searchName && ` matching "${searchName}"`}
          {specialtyFilter && ` in ${specialtyFilter}`}
        </p>
        {(searchName || specialtyFilter) && (
          <button
            onClick={clearFilters}
            className="text-sm px-3 py-1 text-green-300 hover:text-green-800 hover:bg-green-50 rounded transition-colors duration-200"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Doctor List */}
      <DoctorList doctors={filteredDoctors} />
    </div>
  );
}
