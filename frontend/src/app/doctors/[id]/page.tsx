import Link from "next/link";
import { cookies } from "next/headers";

type Params = {
  params: { id: string };
};

type Doctor = {
  _id: string;
  name: string;
  specialty: string;
  experience: number;
  college?: string;
  bio?: string;
  contact?: string;
};

type Slot = {
  _id: string;
  startAt: string;
  endAt: string;
};

export default async function DoctorDetailsPage({ params }: Params) {
  const { id } = params;

  const doctorRes = await fetch(`http://localhost:8000/api/doctors/${id}`, {
    cache: "no-store",
  });

  if (!doctorRes.ok) {
    return (
      <div className="p-6">
        <p className="text-red-500">Doctor not found.</p>
        <Link href="/doctors" className="text-blue-500 underline">
          Back to Doctors List
        </Link>
      </div>
    );
  }

  const doctor: Doctor = await doctorRes.json();

  // Fetch available slots for this doctor
  const slotsRes = await fetch(
    `http://localhost:8000/api/availability/${id}`,
    { cache: "no-store" }
  );

  const slots: Slot[] = slotsRes.ok ? await slotsRes.json() : [];

  async function bookSlot(slotId: string) {
    "use server"; // server action in Next 13+
    const token = cookies().get("token")?.value;

    await fetch(`http://localhost:8000/api/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify({
        doctorId: id,
        slotId,
      }),
    });
  }

  return (
    <div className="p-6 bg-[#e1ddb2] mx-auto">
      <Link href="/doctors" className="text-yellow-900 underline mb-4 block">
        ← Back to Doctors
      </Link>

      <div className="bg-white shadow-lg  rounded-lg p-6">
        <h1 className="text-3xl text-yellow-900 font-bold">{doctor.name}</h1>
        <p className="text-yellow-900">{doctor.specialty}</p>
        <p className="text-yellow-900">{doctor.experience} years experience</p>

        {doctor.college && (
          <p className="mt-2 text-yellow-900">
            <strong>College:</strong> {doctor.college}
          </p>
        )}

        {doctor.bio && <p className="mt-4 text-gray-800">{doctor.bio}</p>}

        {doctor.contact && (
          <p className="mt-4">
            <strong>Contact:</strong> {doctor.contact}
          </p>
        )}
      </div>

      <div className="mt-6 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl text-yellow-900 font-bold mb-4">Available Slots</h2>

        {slots.length === 0 ? (
          <p className="text-yellow-700">No available slots</p>
        ) : (
          <ul className="space-y-3">
            {slots.map((slot) => (
              <li
                key={slot._id}
                className="flex justify-between items-center border p-3 rounded-lg"
              >
                <span>
                  {new Date(slot.startAt).toLocaleString()} -{" "}
                  {new Date(slot.endAt).toLocaleString()}
                </span>
                <form action={async () => bookSlot(slot._id)}>
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  >
                    Book
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


