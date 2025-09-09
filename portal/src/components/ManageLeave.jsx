import React, { useState, useEffect } from "react";

function ManageLeave() {
  const [formData, setFormData] = useState({
    employeeName: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    totalDays: "",
    reason: "",
  });

  const [leaves, setLeaves] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const storedLeaves = JSON.parse(localStorage.getItem("leaves")) || [];
    setLeaves(storedLeaves);
  }, []);

  // Save to localStorage whenever leaves change
  useEffect(() => {
    localStorage.setItem("leaves", JSON.stringify(leaves));
  }, [leaves]);

  // Calculate total days
  const calculateDays = (start, end) => {
    if (start && end) {
      const s = new Date(start);
      const e = new Date(end);
      const diff = (e - s) / (1000 * 60 * 60 * 24) + 1;
      return diff > 0 ? diff : 0;
    }
    return "";
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "startDate" || name === "endDate") {
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

  // Submit leave form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.employeeName || !formData.leaveType) {
      alert("Please fill all required fields");
      return;
    }

    const newLeave = {
      id: Date.now(),
      ...formData,
      status: "Pending",
    };

    setLeaves([...leaves, newLeave]);

    setFormData({
      employeeName: "",
      leaveType: "",
      startDate: "",
      endDate: "",
      totalDays: "",
      reason: "",
    });
  };

  // Approve / Reject / Delete handlers
  const handleStatus = (id, status) => {
    const updated = leaves.map((leave) =>
      leave.id === id ? { ...leave, status } : leave
    );
    setLeaves(updated);
  };

  const handleDelete = (id) => {
    const updated = leaves.filter((leave) => leave.id !== id);
    setLeaves(updated);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Leave Apply Form */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-center">
          Manage Leave Application
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            placeholder="Employee Name"
            className="w-full border rounded p-2"
            required
          />

          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">-- Select Leave Type --</option>
            <option value="Casual">Casual Leave</option>
            <option value="Sick">Sick Leave</option>
            <option value="Paid">Paid Leave</option>
            <option value="WFH">Work From Home</option>
          </select>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="border rounded p-2"
              required
            />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="border rounded p-2"
              required
            />
          </div>

          <input
            type="text"
            name="totalDays"
            value={formData.totalDays}
            readOnly
            placeholder="Total Days"
            className="w-full border rounded p-2 bg-gray-100"
          />

          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Reason (optional)"
            className="w-full border rounded p-2"
          />

          <button
            type="submit"
            className=" bg-[#86d7d4] p-5 text-white py-2 rounded hover:bg-[#2dcac5] cursor-pointer"
          >
            Apply Leave
          </button>
        </form>
      </div>

      {/* Leave Requests Table */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Leave Requests</h2>
        {leaves.length === 0 ? (
          <p className="text-gray-500 text-center">No leave requests yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr className="bg-gray-100 text-center">
                  <th className="border p-2">Employee</th>
                  <th className="border p-2">Type</th>
                  <th className="border p-2">Start</th>
                  <th className="border p-2">End</th>
                  <th className="border p-2">Days</th>
                  <th className="border p-2">Reason</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave.id} className="text-center hover:bg-gray-50">
                    <td className="border p-2">{leave.employeeName}</td>
                    <td className="border p-2">{leave.leaveType}</td>
                    <td className="border p-2">{leave.startDate}</td>
                    <td className="border p-2">{leave.endDate}</td>
                    <td className="border p-2">{leave.totalDays}</td>
                    <td className="border p-2">{leave.reason || "-"}</td>
                    <td
                      className={`border p-2 font-semibold ${
                        leave.status === "Approved"
                          ? "text-green-600"
                          : leave.status === "Rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {leave.status}
                    </td>
                    <td className="border p-2 space-x-2">
                      {leave.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleStatus(leave.id, "Approved")}
                            className="bg-green-500 text-white px-2 py-1 rounded"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleStatus(leave.id, "Rejected")}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(leave.id)}
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
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

export default ManageLeave;
