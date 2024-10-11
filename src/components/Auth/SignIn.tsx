import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Apple from "~/assets/icons/Apple";
import Eye from "~/assets/icons/Eye";
import Facebook from "~/assets/icons/Facebook";
import Google from "~/assets/icons/Google";
import { LinkLogo } from "~/assets/icons/LinkLogo";
import User from "~/assets/icons/User";
import { fetcher } from "~/zustand/api";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation(
    async (userData: { email: string; password: string }) =>
      fetcher("/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include",
      }),
    {
      onSuccess: () => {
        toast.success("Sign in successful!");

        setPassword("");
        setEmail("");
        navigate("/links");
      },
      onError: (error: Error) => {
        toast.error(error.message || "Failed to register");
      },
    }
  );

  const handleSignIn = async () => {
    if (!email || !password) {
      toast.error("Email and password are required.");
      return;
    }

    mutation?.mutate({ email, password });
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

          <div>
            <label className="text-gray-800 text-sm mb-2 block">Email</label>
            <div className="relative flex items-center">
              <input
                name="example@email.com"
                type="text"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-violet-600 hover:shadow hover:shadow-violet-200 transition-all duration-300"
                placeholder="Enter user name"
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
                value={password || ""}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-md outline-violet-600 hover:shadow hover:shadow-violet-200 transition-all duration-300"
                placeholder="********"
              />
              <Eye />
            </div>
          </div>
          <div className="mt-4 text-right">
            <a
              href="/"
              className="text-violet-600 text-sm font-semibold hover:underline"
            >
              Forgot your password?
            </a>
          </div>

          <div className="mt-8">
            <button
              onClick={handleSignIn}
              type="button"
              className="w-full shadow-xl py-3 px-6 text-sm font-semibold rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none"
            >
              Sign in
            </button>
          </div>
          <p className="text-sm mt-8 text-center text-gray-800">
            Don't have an account{" "}
            <a
              href="/sign-up"
              className="text-violet-600 font-semibold hover:underline ml-1 whitespace-nowrap"
            >
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;