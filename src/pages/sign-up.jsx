import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
// import { doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
// import { useAuth } from "../context/AuthContext";
// import { useAuth } from "../context/AuthContext";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [generalError, setGeneralError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const navigate = useNavigate();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleSignUpWithGoogle = async (e) => {
    console.log("ewooo");
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          console.log(currentUser);
          await setDoc(
            doc(db, "users", currentUser.uid),
            {
              firstName: currentUser.displayName.split(" ")[0],
              lastName: currentUser.displayName.split(" ")[1],
              email: currentUser.email,
              fullName:
                currentUser.displayName.split(" ")[0] +
                currentUser.displayName.split(" ")[1],
            },
            { merge: true }
          );
        }
      });
      navigate("/home");
    } catch (error) {
      console.error(error);
    }
  };

  const validateInputs = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError("You can't leave any field empty.");
      setGeneralError(true);
      setPasswordError(false);
      setEmailError(false);
      return true;
    } else if (password !== confirmPassword) {
      setError("Your passwords don't match!");
      setPasswordError(true);
      setGeneralError(false);
      setEmailError(false);
      return true;
    } else if (!emailPattern.test(email)) {
      setError("Please, enter a valid email.");
      setEmailError(true);
      setPasswordError(false);
      setGeneralError(false);
      return true;
    }
    return false;
  };

  const handleSignUpWithEmailAndPassword = async (e) => {
    console.log("ewooo");
    e.preventDefault();
    if (validateInputs() === true) {
      return;
    }
    setPasswordError(false);
    setGeneralError(false);
    setEmailError(false);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          console.log(currentUser);
          console.log("Account has been created");
          await setDoc(
            doc(db, "users", currentUser.uid),
            {
              firstName,
              lastName,
              email: currentUser.email,
              fullName: firstName + lastName,
            },
            { merge: true }
          );
        }
      });
    } catch (error) {
      console.error(error);
      return;
    }
    navigate("/home");
  };

  return (
    <form
      action=""
      className="font-rubik overflow-hidden flex flex-col justify-around px-16 my-0 mx-auto max-w-screen-sm border-4 py-16"
    >
      <div>
        <h1 className="font-bold max-w-full text-6xl text-teal-700 mb-6">
          Register
        </h1>
        <p className="font-light max-w-full text-2xl text-slate-800	">
          Join Shelfie today! Create your free account and start discovering and
          reviewing books.
        </p>
      </div>
      <div>
        <Error error={error} />
        <label
          className="block mb-8 max-w-full text-2xl text-slate-800 font-normal "
          htmlFor="first-name"
        >
          First Name
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter first name"
            className={`${
              generalError && firstName === ""
                ? "border-red-700 border-2"
                : "border-gray-400 border"
            } w-full rounded-lg p-4 font-light text-2xl border-solid text-gray-800`}
            type="text"
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
            className={`${
              generalError && lastName === ""
                ? "border-red-700 border-2"
                : "border-gray-400 border"
            } w-full rounded-lg p-4 font-light text-2xl border-solid text-gray-800`}
            type="text"
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
              (generalError && password === "") || passwordError
                ? "border-red-700 border-2"
                : "border-gray-400 border"
            } w-full rounded-lg p-4 block font-light text-2xl border border-solid text-gray-800`}
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Enter your password"
            className={`${
              (generalError && confirmPassword === "") || passwordError
                ? "border-red-700 border-2"
                : "border-gray-400 border"
            } w-full rounded-lg p-4 block font-light text-2xl border-solid text-gray-800`}
            type="password"
            name="confirm-passoword"
            id="confirm-passoword"
          />
        </label>
        <button
          onClick={handleSignUpWithEmailAndPassword}
          className="w-full rounded-lg my-24 py-6 block font-medium text-3xl text-white bg-teal-700"
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
        <Link className="text-blue-700 text-2xl font-medium" to="/signIn">
          Sign In?
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
export default SignUp;
