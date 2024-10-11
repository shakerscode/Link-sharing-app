import React, { useState } from "react";
import toast from "react-hot-toast";
import Apple from "~/assets/icons/Apple";
import Eye from "~/assets/icons/Eye";
import Facebook from "~/assets/icons/Facebook";
import Google from "~/assets/icons/Google";
import { LinkLogo } from "~/assets/icons/LinkLogo";
import User from "~/assets/icons/User";
import { useUserStore } from "~/zustand/store/useUserStore";

function SignUp() {
  const { setUserDetails, first_name, last_name, email, password } =
    useUserStore();
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle form submission
  const handleSubmit = async () => {
    // Basic form validation
    if (!first_name || !last_name || !email || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    // Proceed with backend API call (handled later)
    // try {
    //   const response = await fetch("http://localhost:5000/api/register", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ first_name, last_name, email, password }),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     toast.success("User registered successfully!");
    //     // You can navigate the user or store token if needed
    //   } else {
    //     const errorData = await response.json();
    //     toast.error(errorData.message || "Failed to register.");
    //   }
    // } catch (error) {
    //   console.error("Error registering user:", error);
    //   toast.error("An error occurred while registering. Please try again.");
    // }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl sm:px-6 px-4 py-8 max-w-md w-full h-max shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] max-lg:mx-auto">
        <div className="flex items-center justify-center gap-2 py-2">
          <div className="text-violet-600">
            <LinkLogo size={52} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800">devLinks</h1>
        </div>
        <div className="h-[1.5px] w-full bg-gray-200"></div>
        <form>
          <div className="sm:flex items-center justify-center sm:items-start space-x-4 max-sm:space-y-4 my-8">
            <button
              type="button"
              className="py-2.5 px-4 text-sm font-semibold rounded-md text-violet-500 bg-violet-100 hover:bg-violet-200 focus:outline-none"
            >
              <Google size={20} />
              Sign in with Google
            </button>
            <button
              type="button"
              className="py-2.5 px-4 text-sm font-semibold rounded-md text-violet-500 bg-violet-100 hover:bg-violet-200 focus:outline-none"
            >
              <Facebook size={20} />
            </button>
            <button
              type="button"
              className="py-2.5 px-4 text-sm font-semibold rounded-md text-violet-500 bg-violet-100 hover:bg-violet-200 focus:outline-none"
            >
              <Apple size={20} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-2 mb-2">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                First Name*
              </label>
              <div className="relative flex items-center">
                <input
                  name=""
                  type="text"
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-violet-600 hover:shadow hover:shadow-violet-200 transition-all duration-300"
                  placeholder="Jhon"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Last Name*
              </label>
              <div className="relative flex items-center">
                <input
                  name=""
                  type="text"
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-violet-600 hover:shadow hover:shadow-violet-200 transition-all duration-300"
                  placeholder="Doe"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Email</label>
            <div className="relative flex items-center">
              <input
                name="email"
                type="text"
                required
                className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-violet-600 hover:shadow hover:shadow-violet-200 transition-all duration-300"
                placeholder="example@email.com"
              />
              <User />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-gray-800 text-sm mb-2 block">Password</label>
            <div className="relative flex items-center">
              <input
                name="password"
                type="password"
                required
                className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-violet-600 hover:shadow hover:shadow-violet-200 transition-all duration-300"
                placeholder="********"
              />
              <Eye />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-gray-800 text-sm mb-2 block">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <input
                name="password"
                type="password"
                required
                className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-violet-600 hover:shadow hover:shadow-violet-200 transition-all duration-300"
                placeholder="********"
              />
              <Eye />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="button"
              className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none"
            >
              Sign in
            </button>
          </div>
          <p className="text-sm mt-8 text-center text-gray-800">
            Already have an account?
            <a
              href="/sign-in"
              className="text-violet-600 font-semibold hover:underline ml-1 whitespace-nowrap"
            >
              Sign in here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
