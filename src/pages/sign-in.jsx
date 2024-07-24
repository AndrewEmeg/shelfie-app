import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log(auth);
      const user = auth.currentUser;
      console.log(user);
      console.log("Sign In successful");
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <form
      action=""
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      className="font-rubik overflow-hidden flex flex-col justify-around px-16 my-0 mx-auto max-w-screen-sm border-2 "
    >
      <div>
        <h1 className="font-bold max-w-full text-7xl text-teal-700 mb-6">
          Sign In
        </h1>
        <p className="font-light max-w-full text-3xl text-slate-800	">
          Welcome back to Shelfie! Sign in to continue discovering and reviewing
          books.
        </p>
      </div>
      <div>
        <label
          className="block mb-8 max-w-full text-2xl text-slate-800 font-normal "
          htmlFor=""
        >
          Email Address
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            className="w-full rounded-lg p-4 block font-light text-2xl border border-solid border-gray-400 text-gray-800"
            type="email"
            name=""
            id=""
          />
        </label>

        <label
          className=" block mb-8 max-w-full text-2xl text-slate-800 font-normal "
          htmlFor=""
        >
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full rounded-lg p-4 block font-light text-2xl border border-solid border-gray-400 text-gray-800"
            type="password"
            name=""
            id=""
          />
        </label>

        <button
          onClick={handleSignIn}
          className="w-full rounded-lg mt-24 py-6 block font-medium text-3xl text-white bg-teal-700"
        >
          Sign In
        </button>
      </div>

      <div className="text-center">
        <span className="text-2xl mb-8 block">Or sign in with</span>
        <button
          // onClick={}
          className="flex justify-center items-center gap-6 w-full rounded-lg py-4 block border border-solid border-gray-400 text-3xl text-slate-800 font-medium mb-20"
        >
          <img className="w-12" src="img/google-logo.png" alt="" />
          <span>Google</span>
        </button>

        <span className="block text-center mb-8 text-2xl">
          Don&apos;t have an account yet?{" "}
        </span>
        <Link
          // onClick={}
          to="/signup"
          className="flex justify-center items-center gap-6 w-full rounded-lg py-4 block border border-solid border-gray-400 text-3xl text-slate-800 font-medium mb-8"
        >
          <span>Register</span>
        </Link>
      </div>
    </form>
  );
}
export default SignIn;
