import React, { useState, useEffect } from "react";
import {
  EllipsisVertical,
  Edit2,
  Trash2,
  User,
  MoreVertical,
  Calendar,
  Droplet,
} from "lucide-react";
function Leaves() {
  const [formData, setFormData] = useState({
    employeeName: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    totalDays: "",
    reason: "",
    document: null,
    contact: "",
    backup: "",
  });

  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const storedLeaves = JSON.parse(localStorage.getItem("leaves")) || [];
    setLeaves(storedLeaves);
  }, []);

  const calculateDays = (start, end) => {
    if (start && end) {
      const s = new Date(start);
      const e = new Date(end);
      const diff = (e - s) / (1000 * 60 * 60 * 24) + 1;
      return diff > 0 ? diff : 0;
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "document") {
      setFormData({ ...formData, [name]: files[0]?.name || null });
    } else if (name === "startDate" || name === "endDate") {
      const newForm = { ...formData, [name]: value };
      newForm.totalDays = calculateDays(
        name === "startDate" ? value : formData.startDate,
        name === "endDate" ? value : formData.endDate
      );
      setFormData(newForm);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLeaves = [...leaves, formData];
    setLeaves(newLeaves);
    localStorage.setItem("leaves", JSON.stringify(newLeaves));
    alert("Leave Application Submitted ✅");

    setFormData({
      employeeName: "",
      leaveType: "",
      startDate: "",
      endDate: "",
      totalDays: "",
      reason: "",
      document: null,
      contact: "",
      backup: "",
    });
  };

  return (
    <div className="px-8 py-4  space-y-6  bg-gray-100 mb-8">
      <div>
        <div className="flex gap-2">
          <Calendar h-6 w-6 />
          <h1 className="text-xl  font-semibold">Employee Leave</h1>
        </div>
        <p className="text-xs sm:text-sm text-gray-500">
          Add, edit, and manage employee leave
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex justify-between mb-4 items-center">
          <h3 className="text-base sm:text-lg font-semibold">
            Apply For Leave
          </h3>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Employee Name */}
         

          {/* Leave Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Leave Type
            </label>
            <select
              name="leaveType"
              value={formData.leaveType}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
              required
            >
              <option value="">-- Select Leave Type --</option>
              <option value="Casual">Casual Leave</option>
              <option value="Sick">Sick Leave</option>
              <option value="Paid">Paid Leave</option>
              <option value="WFH">Work From Home</option>
            </select>
          </div>

          {/* Start Date / End Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Total Days */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Total Days
            </label>
            <input
              type="text"
              name="totalDays"
              value={formData.totalDays}
              readOnly
              className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-600"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Reason 
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Enter reason for leave"
              className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          {/* Document Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Supporting Document (optional)
            </label>
            <input
              type="file"
              name="document"
              onChange={handleChange}
              className="w-full"
            />
            {formData.document && (
              <p className="text-sm text-green-600 mt-1">
                Uploaded: {formData.document}
              </p>
            )}
          </div>

          {/* Contact / Backup */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Contact During Leave
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter contact number"
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Backup Employee
              </label>
              <input
                type="text"
                name="backup"
                value={formData.backup}
                onChange={handleChange}
                placeholder="Enter backup employee"
                className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-max-2lg bg-[#86d7d4] text-white py-2 px-4 rounded-lg hover:bg-[#76e7e3] transition cursor-pointer"
          >
            Apply Leave
          </button>
        </form>
      </div>
      <div className="bg-white shadow-md rounded-lg mt-2">
        <div className="flex flex-col justify-between items-left p-6 border-b border-gray-200 ">
          <h2 className="text-lg font-semibold mb-1 ">All Leaves</h2>
          <p className="text-sm text-gray-600">View your leaves</p>
        </div>
        <div className="overflow-x-auto overflow-y-visible scrollbar-hide  [&::-webkit-scrollbar]:hidden -ms-overflow-style-none scrollbar-none">
          {leaves.length === 0 ? (
          <p className="text-gray-500 px-5 py-5">No leaves applied yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border px-3 py-2">Employee</th>
                  <th className="border px-3 py-2">Type</th>
                  <th className="border px-3 py-2">Start Date</th>
                  <th className="border px-3 py-2">End Date</th>
                  <th className="border px-3 py-2">Days</th>
                  <th className="border px-3 py-2">Reason</th>
                  <th className="border px-3 py-2">Contact</th>
                  <th className="border px-3 py-2">Backup Employee</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{leave.employeeName}</td>
                    <td className="border px-3 py-2">{leave.leaveType}</td>
                    <td className="border px-3 py-2">{leave.startDate}</td>
                    <td className="border px-3 py-2">{leave.endDate}</td>
                    <td className="border px-3 py-2">{leave.totalDays}</td>
                    <td className="border px-3 py-2">{leave.reason || "-"}</td>
                    <td className="border px-3 py-2">{leave.contact || "-"}</td>
                    <td className="border px-3 py-2">{leave.backup || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        </div>
      </div>

     
    </div>
  );
}

export default Leaves;
