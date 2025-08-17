// import React from 'react'
// import Link from 'next/link';
// export type  Doctor = {
//   id: number;
//   name: string;
//   specialty: string;
//   experience: number; // years
// };

// interface DoctorListProps {
//   doctors: Doctor[];
// }

// export function DoctorList({ doctors }: DoctorListProps) {
//   return (
//     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//       {doctors.length > 0 ? (
//         doctors.map((doctor) => (
//           <div
//             key={doctor.id}
//             className="bg-gray-200 shadow-md rounded-lg p-6 hover:shadow-lg transition"
//           >
//             <h2 className="text-xl text-black font-semibold">{doctor.name}</h2>
//             <p className="text-green-700">{doctor.specialty}</p>
//             <p className="text-black">{doctor.experience} years experience</p>
//              <Link href={`/doctors/${doctor.id}`} // 

//               className="mt-4 inline-block px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
//             >
//               View Profile
//             </Link>
//           </div>
//         ))
//       ) : (
//         <p className="text-center text-gray-500 col-span-full">
//           No doctors found
//         </p>
//       )}
//     </div>
//   );
// }

// export default DoctorList;



import React from 'react'
import Link from 'next/link'

export type Doctor = {
  _id: string;
  name: string;
  specialty: string;
  experience: number; // years
};

interface DoctorListProps {
  doctors: Doctor[];
}

export function DoctorList({ doctors }: DoctorListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {doctors.length > 0 ? (
        doctors.map((doctor) => (
          <div
            key={doctor._id} // ✅ Use MongoDB _id as unique key
            className="bg-gray-200 shadow-md rounded-lg p-6 hover:shadow-lg transition"
          >
            <h2 className="text-xl text-yellow-900 font-semibold">{doctor.name}</h2>
            <p className="text-yellow-900">{doctor.specialty}</p>
            <p className="text-yellow-900">{doctor.experience} years experience</p>
            <Link
              href={`/doctors/${doctor._id}`} // ✅ Use _id for dynamic route
              className="mt-4 inline-block px-4 py-2 bg-[#2E8B57] text-white rounded-lg hover:bg-green-800"
            >
              View Profile
            </Link>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          No doctors found
        </p>
      )}
    </div>
  )
}

export default DoctorList

