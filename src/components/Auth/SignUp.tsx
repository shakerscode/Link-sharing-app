import React, { useState } from "react";
import toast from "react-hot-toast";
import { GoEyeClosed } from "react-icons/go";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import Apple from "~/assets/icons/Apple";
import Eye from "~/assets/icons/Eye";
import Facebook from "~/assets/icons/Facebook";
import Google from "~/assets/icons/Google";
import { LinkLogo } from "~/assets/icons/LinkLogo";
import User from "~/assets/icons/User";
import { IUserInfoWithoutProfileUrl } from "~/interface/user.info";
import { fetcher } from "~/zustand/api";
import { useUserStore } from "~/zustand/store/useUserStore";
import Spinner from "../ui/Spinner";
import Cookies from "js-cookie";

function SignUp() {
  const { setUserDetails, first_name, last_name, email, password } =
    useUserStore();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [eyeOpen, setEyeOpen] = useState<boolean>(false);
  const [eyeOpenConf, setEyeOpenConf] = useState<boolean>(false);
  const navigate = useNavigate();

  // Form validation with return statements

  const formValidation = () => {
    if (!first_name || !last_name || !email || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (password.length < 8) {
      // Change to < 8 instead of <= 8
      toast.error("Password must be at least 8 characters long.");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    return true;
  };

  //React query mutation for signing up. useMutation works for POST req.
  const mutation = useMutation(
    async (userData: IUserInfoWithoutProfileUrl) =>
      fetcher("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
      }),
    {
      onSuccess: (data) => {
        // Update Zustand state and refetch data upon successful mutation
        toast.success("Registration successful!");
        Cookies.set("frontendToken", data?.token, {
          secure: true,
          sameSite: "Lax",
        });
        setUserDetails({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        });
        setConfirmPassword("");
        navigate("/");
      },

      onError: (error: Error) => {
        console.log(error?.message);

        toast.error(error.message || "Failed to register");
      },
    }
  );

  // Handle form submission
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (formValidation()) {
      mutation.mutate({ first_name, last_name, email, password });
    }
  };

  const { isLoading } = mutation;

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl sm:px-6 px-4 py-8 max-w-md w-[90%] md:w-full h-max shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] max-lg:mx-auto">
        {/* Header for sign up  */}
        <Link to={"/"}>
          <div className="flex items-center justify-center gap-2 py-2">
            <div className="text-violet-600">
              <LinkLogo size={52} />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-800">devLinks</h1>
          </div>
        </Link>
        <div className="h-[1.5px] w-full bg-gray-200"></div>

        {/* Form for sign up  */}
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center gap-3 my-8">
            <button
              type="button"
              className="py-2.5 px-4 text-sm font-semibold rounded-md text-violet-500 bg-violet-100 hover:bg-violet-200 focus:outline-none w-full flex items-center justify-center"
            >
              <Google size={20} />
              <p className="hidden lg:flex">Sign in with Google </p>
            </button>
            <button
              type="button"
              className="py-2.5 px-4 text-sm font-semibold rounded-md text-violet-500 bg-violet-100 hover:bg-violet-200 focus:outline-none w-full flex items-center justify-center"
            >
              <Facebook size={20} />
            </button>
            <button
              type="button"
              className="py-2.5 px-4 text-sm font-semibold rounded-md text-violet-500 bg-violet-100 hover:bg-violet-200 focus:outline-none w-full flex items-center justify-center"
            >
              <Apple size={20} />
            </button>
          </div>

          <div className="flex items-center justify-between gap-2 mb-2">
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                First Name
              </label>
              <div className="relative flex items-center">
                <input
                  name=""
                  type="text"
                  value={first_name || ""}
                  onChange={(e) =>
                    setUserDetails({ first_name: e.target.value })
                  }
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-violet-600 hover:shadow hover:shadow-violet-200 transition-all duration-300"
                  placeholder="Jhon"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Last Name
              </label>
              <div className="relative flex items-center">
                <input
                  name=""
                  type="text"
                  value={last_name || ""}
                  onChange={(e) =>
                    setUserDetails({ last_name: e.target.value })
                  }
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
                value={email || ""}
                onChange={(e) => setUserDetails({ email: e.target.value })}
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
                type={eyeOpen ? "text" : "password"}
                value={password || ""}
                onChange={(e) => setUserDetails({ password: e.target.value })}
                required
                className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-violet-600 hover:shadow hover:shadow-violet-200 transition-all duration-300"
                placeholder="********"
              />
              <button
                className="flex items-center justify-center"
                onClick={() => setEyeOpen(!eyeOpen)}
              >
                {eyeOpen ? (
                  <Eye />
                ) : (
                  <GoEyeClosed className="w-[18px] h-[18px] absolute right-4 cursor-pointer text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div className="mt-4">
            <label className="text-gray-800 text-sm mb-2 block">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <input
                name="password"
                type={eyeOpenConf ? "text" : "password"}
                value={confirmPassword || ""}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-violet-600 hover:shadow hover:shadow-violet-200 transition-all duration-300"
                placeholder="********"
              />
              <button
                className="flex items-center justify-center"
                onClick={() => setEyeOpenConf(!eyeOpenConf)}
              >
                {eyeOpenConf ? (
                  <Eye />
                ) : (
                  <GoEyeClosed className="w-[18px] h-[18px] absolute right-4 cursor-pointer text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none"
            >
              {isLoading ? <Spinner /> : "Sign up"}
            </button>
          </div>
          <p className="text-sm mt-8 text-center text-gray-800">
            Already have an account?
            <Link
              to="/sign-in"
              className="text-violet-600 font-semibold hover:underline ml-1 whitespace-nowrap"
            >
              Sign in here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
