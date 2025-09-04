import React, { useState } from "react";
import { Lock, User, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [Email, SetEmail] = useState("");
  const [Password, Setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
const newUser = {
  email: "user@example.com",
  password: "User@2025",
  role: "user"
};

    // Get stored users (default: empty array)
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      storedUsers.push(newUser)
      localStorage.setItem("users", JSON.stringify(storedUsers));

       // Find user
    const user = storedUsers.find(
      (u) => u.email === Email && u.password === Password
    );

    if (!user) {
      toast.error(" Invalid Email or Password!");
      return;
    }

    if (user.role === "user") {
      toast.success(" User Login Successful!");
      localStorage.setItem("loggedInUser", JSON.stringify(user));
      navigate("/Dashboard");
    } else {
      toast.error(" Access Denied! Only User can login.");
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#d0f0ec] to-white w-full">
    <div className="flex items-center justify-center min-h-screen  px-4 max-[360px]:px-3 sm:px-4 md:px-8 lg:px-16">
      <div className="w-full max-w-md space-y-3">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="bg-[#009688] p-4 rounded-full">
            <Lock className="text-white text-2xl" />
          </div>
        </div>

        <div className="mb-5">
          <h2 className="text-center text-2xl font-bold text-gray-800">
            User Login
          </h2>
          <p className="text-center text-sm text-gray-500">
            Login in to Employee management system to manage your Employees
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Username
            </label>
            <div className="flex items-center border rounded p-2 border-gray-300 focus-within:border-[#009688]">
              <User className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Enter username"
                value={Email}
                onChange={(e) => SetEmail(e.target.value)}
                className="w-full h-7 text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>
            <div className="flex items-center border rounded p-2 border-gray-300 focus-within:border-[#009688]">
              <Lock className="text-gray-400 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={Password}
                onChange={(e) => Setpassword(e.target.value)}
                className="w-full h-7 text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="cursor-pointer w-full bg-[#009688] text-white py-2 px-4 rounded hover:bg-[#00796B] transition"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
