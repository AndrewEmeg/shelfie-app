import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

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

  const handleSignUpWithEmailAndPassword = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          console.log(currentUser);
          console.log("Account has been created");
          await setDoc(doc(db, "users", currentUser.uid), {
            firstName,
            lastName,
            email: currentUser.email,
          });
        }
      });
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
      className="font-rubik overflow-hidden flex flex-col justify-around px-16   my-0 mx-auto max-w-screen-sm border-2 "
    >
      <div>
        <h1 className="font-bold max-w-full text-7xl text-teal-700 mb-6">
          Register-Lol-Firebase
        </h1>
        <p className="font-light max-w-full text-3xl text-slate-800	">
          Join Shelfie today! Create your free account and start discovering and
          reviewing books.
        </p>
      </div>
      <div>
        <label
          className="block mb-8 max-w-full text-2xl text-slate-800 font-normal "
          htmlFor="first-name"
        >
          First Name
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            className=" w-full rounded-lg p-4  font-light text-2xl border border-solid border-gray-400 text-gray-800"
            type="email"
            name="first-name"
            id="first-name"
          />
        </label>
        <label
          className="block mb-8 max-w-full text-2xl text-slate-800 font-normal "
          htmlFor="last-name"
        >
          Last Name
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter last name"
            className=" w-full rounded-lg p-4 font-light text-2xl border border-solid border-gray-400 text-gray-800"
            type="email"
            name="last-name"
            id="last-name"
          />
        </label>

        <label
          className="block mb-8 max-w-full text-2xl text-slate-800 font-normal "
          htmlFor="email"
        >
          Email Address
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            className="w-full rounded-lg p-4 block font-light text-2xl border border-solid border-gray-400 text-gray-800"
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
            className="w-full rounded-lg p-4 block font-light text-2xl border border-solid border-gray-400 text-gray-800"
            type="password"
            name="password"
            id="password"
          />
        </label>

        <label
          className="block mb-8 max-w-full text-2xl text-slate-800 font-normal "
          htmlFor="confirm-passoword"
        >
          Confirm Password
          <input
            placeholder="Enter your password"
            className="w-full rounded-lg p-4 block font-light text-2xl border border-solid border-gray-400 text-gray-800"
            type="password"
            name="confirm-passoword"
            id="confirm-passoword"
          />
        </label>
        <button
          onClick={handleSignUpWithEmailAndPassword}
          className="w-full rounded-lg mt-24 py-6 block font-medium text-3xl text-white bg-teal-700"
        >
          Create an account
        </button>
      </div>

      <div className="text-center">
        <span className="text-2xl mb-8 block">Or sign up with</span>
        <button
          onClick={handleSignUpWithGoogle}
          className="flex justify-center items-center gap-6 w-full rounded-lg py-4 block border border-solid border-gray-400 text-3xl text-slate-800 font-medium mb-8"
        >
          <img className="w-12" src="img/google-logo.png" alt="" />
          <span>Google</span>
        </button>
        <span className="text-2xl">Already have an account? </span>
        <Link className="text-blue-500 text-2xl font-medium" to="/signIn">
          Sign In?
        </Link>
      </div>
    </form>
  );
}
export default SignUp;
