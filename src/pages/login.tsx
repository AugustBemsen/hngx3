import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

const LogIn: FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  //log in function
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) => {
          // Signed in
          navigate("/showroom");
          toast.success(`Welcome ${email}`);
          setLoading(false);
        })
        .catch((error: any) => {
          const errorMessage = error.message;

          toast.error(errorMessage);
        });
    } else {
      toast.error("Kindly Fill out all fields");
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <section className="flex items-center justify-center p-2 font-poppins div-overlay">
      <div className="bg-white flex items-center justify-between flex-col p-5 sm:p-10 my-10 md:my-16 sm:my-12 md:w-[590px] sm:w-[60%] w-full rounded-[34px]">
        <h2 className="font-[600] p-1 text-[22px]">Welcome back!</h2>
        <p>Log in to continue</p>

        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between flex-col mt-12 w-full sm:w-[90%] px-1"
        >
          <div className="flex flex-col w-full mb-8">
            <input
              name="email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-12 p-2 placeholder:font-[200] bg-slate-50 rounded w-full border border-gray-600 outline-none"
            />
          </div>

          <div className="relative flex flex-col w-full mb-8">
            <input
              name="password"
              value={password}
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="h-12 p-2 placeholder:font-[200] bg-slate-50 rounded w-full border border-gray-600 outline-none"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute text-[18px] text-gray-900 cursor-pointer right-2 top-5"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>

          <button
            disabled={loading === true}
            type="submit"
            className={`w-full ${
              loading === true ? "bg-gray-300" : ""
            } p-2 mt-4 h-12 mb-6 text-lg font-bold text-center text-gray-100 rounded bg-gray-950 bg-opacity-95 hover:bg-opacity-100 `}
          >
            {loading ? "Signing in" : "Log In"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
