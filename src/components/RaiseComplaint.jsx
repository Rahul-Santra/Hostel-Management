import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RaiseComplaint() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    roll: "",
    room: "",
    type: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const complaints = JSON.parse(localStorage.getItem("complaints") || "[]");
    complaints.push({ ...form, submittedAt: new Date().toISOString() });
    localStorage.setItem("complaints", JSON.stringify(complaints));

    alert("✅ Complaint submitted successfully!");

    navigate("/raise-complaint");
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow-2xl rounded-2xl mt-10 border border-blue-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        📢 Raise a Complaint
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          name="roll"
          value={form.roll}
          onChange={handleChange}
          placeholder="University Roll Number"
          required
          className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="room"
          value={form.room}
          onChange={handleChange}
          placeholder="Hostel Room Number"
          required
          className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          required
          className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="" disabled hidden>
            Choose category
          </option>
          <option value="Mess">Mess</option>
          <option value="Room">Room</option>
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Others">Others</option>
        </select>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe your issue"
          required
          className="w-full p-3 border border-blue-200 rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
}
