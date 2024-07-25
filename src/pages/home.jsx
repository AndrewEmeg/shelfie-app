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
    <div>
      <h1 className="text-5xl font-rubik">Welcome, {userData.email}</h1>
      <h2 className="text-4xl font-rubik">
        {userData.firstName}, I hope you enjoyed your stay
      </h2>
      <input type="text" />
      {/* <h1 className="text-5xl font-rubik">Welcome, {userData.firstName}</h1> */}

      <button
        onClick={handleSignOut}
        className="w-full rounded-lg mt-24 py-6 block font-medium text-3xl text-white bg-teal-700"
      >
        Sign Out
      </button>
    </div>
  ) : (
    <h1 className="text-5xl font-rubik">No user is logged in.</h1>
  );
}
export default Home;
