import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

const LogIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  //log in function
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          navigate("/showroom");
          toast.success("Welcome to the show!");
          setLoading(false);
        }
      );
    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
      setLoading(false);
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <section className="flex items-center justify-center p-2 font-poppins div-overlay">
      <div className="bg-white flex items-center justify-between flex-col p-5 sm:p-10 my-10 md:my-16 sm:my-12 md:w-[590px] sm:w-[60%] w-full rounded-[34px]">
        <h2 className="font-[600] p-1 text-[22px]">Welcome to Showroom!</h2>
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
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="h-12 p-2 outline-none placeholder:font-[200] bg-slate-50 rounded w-full border border-gray-700"
            />
          </div>

          <div className="relative flex flex-col w-full mb-8">
            <input
              name="password"
              value={password}
              required
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="h-12 p-2 outline-none placeholder:font-[200] bg-slate-50 rounded w-full border border-gray-700"
            />
            <span
              onClick={togglePasswordVisibility}
              className="absolute text-[18px] text-gray-900 cursor-pointer right-2 top-4"
            >
              {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
            </span>
          </div>

          <button
            disabled={loading === true}
            type="submit"
            className={`w-full ${
              loading === true ? "bg-gray-300" : ""
            } p-2 mt-6 h-12 mb-6 text-lg font-bold text-center text-gray-100 rounded bg-gray-950 bg-opacity-95 hover:bg-opacity-100 `}
          >
            {loading ? "Signing in" : "Log In"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default LogIn;
