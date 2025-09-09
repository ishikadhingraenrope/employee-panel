import React, { useState, useEffect } from "react";

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
    <div className="max-w-6xl mx-auto bg-white mt-6 shadow-md rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Leave Application Form
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Employee Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Employee Name
          </label>
          <input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 focus:outline-none"
            required
          />
        </div>

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
            Reason (optional)
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
            Supporting Document
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

      {/* Show stored leaves */}
      <div className="bg-white shadow-md rounded-lg mt-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          My Applied Leaves
        </h2>
        {leaves.length === 0 ? (
          <p className="text-gray-500">No leaves applied yet.</p>
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
  );
}

export default Leaves;
