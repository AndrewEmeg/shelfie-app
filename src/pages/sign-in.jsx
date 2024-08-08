import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { db } from "../config/firebase";
import { setDoc, doc } from "firebase/firestore";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [generalError, setGeneralError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const navigate = useNavigate();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleSignUpWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          // const userName = currentUser.displayName;
          console.log(currentUser);

          await setDoc(doc(db, "users", currentUser.uid), {
            firstName: currentUser.displayName.split(" ")[0],
            lastName: currentUser.displayName.split(" ")[1],
            email: currentUser.email,
          });
        }
      });
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };
  const validateInputs = () => {
    if (email === "" || password === "") {
      setError("You can't leave any field empty.");
      setGeneralError(true);
      setEmailError(false);
      return true;
    } else if (!emailPattern.test(email)) {
      setError("Please, enter a valid email.");
      setEmailError(true);
      setGeneralError(false);
      return true;
    }
  };
  const handleSignInWithEmailAndPassword = async (e) => {
    e.preventDefault();
    if (validateInputs() === true) {
      return;
    }
    setGeneralError(false);
    setEmailError(false);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Sign In successful");
      navigate("/home");
    } catch (error) {
      // console.error(error);

      setError("Your email or password is incorrect.");
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
        <h1 className="font-bold max-w-full text-6xl text-teal-700 mb-6">
          Sign In
        </h1>
        <p className="font-light max-w-full text-2xl text-slate-800	">
          Welcome back to Shelfie! Sign in to continue discovering and reviewing
          books.
        </p>
      </div>
      <div>
        <Error error={error} />
        <label
          className="block mb-8 max-w-full text-2xl text-slate-800 font-normal "
          htmlFor="email"
        >
          Email Address
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            className={`${
              (generalError && email === "") || emailError
                ? "border-red-700 border-2"
                : "border-gray-400 border"
            } w-full rounded-lg p-4 block font-light text-2xl border-solid text-gray-800`}
            type="email"
            name="email"
            id="email"
          />
        </label>

        <label
          className=" block mb-8 max-w-full text-2xl text-slate-800 font-normal "
          htmlFor="password"
        >
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className={`${
              generalError && password === ""
                ? "border-red-700 border-2"
                : "border-gray-400 border"
            } w-full rounded-lg p-4 block font-light text-2xl border border-solid text-gray-800`}
            type="password"
            name="password"
            id="password"
          />
        </label>

        <button
          onClick={handleSignInWithEmailAndPassword}
          className="w-full rounded-lg mt-24 py-6 block font-medium text-3xl text-white bg-teal-700"
        >
          Sign In
        </button>
      </div>

      <div className="text-center">
        <span className="text-2xl mb-8 block">Or sign in with</span>
        <button
          onClick={handleSignUpWithGoogle}
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
// eslint-disable-next-line react/prop-types
function Error({ error }) {
  return (
    <span className="text-red-700 text-3xl font-light pb-4 block">{error}</span>
  );
}
export default SignIn;
