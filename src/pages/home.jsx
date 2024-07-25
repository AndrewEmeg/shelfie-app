import { auth, db } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";

function Home() {
  const [userData, setUserData] = useState({});
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // const { currentUser } = useContext(AuthProvider);
  // console.log(currentUser);

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      console.log("You have been signed out successfully");
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
        // console.log("passed first one");
        // console.log(userDoc.data().firstName);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserData();
  }, [currentUser]);

  return currentUser ? (
    <div className="font-rubik overflow-hidden flex flex-col justify-around p-16 my-0 mx-auto max-w-screen-sm border-2">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-rubik">
          Welcome, <span className="font-semibold">{userData.firstName}</span>
        </h1>
        <button
          onClick={handleSignOut}
          className="rounded-lg py-6 px-12 font-medium text-3xl text-white bg-teal-700"
        >
          Sign Out
        </button>
      </div>

      <p className="text-4xl font-rubik mb-4">
        Have a book in mind? Begin your search.
      </p>
      <label
        className="block mb-8 max-w-full text-2xl text-slate-800 font-normal "
        htmlFor="email"
      >
        <input
          placeholder="Atomic Habits"
          className="w-full rounded-lg p-4 block font-light text-2xl border border-solid border-gray-400 text-gray-800"
          type="email"
          name="email"
          id="email"
        />
      </label>
      {/* <h1 className="text-5xl font-rubik">Welcome, {userData.firstName}</h1> */}

      <input></input>
    </div>
  ) : (
    <h1 className="text-5xl font-rubik">No user is logged in.</h1>
  );
}
export default Home;
