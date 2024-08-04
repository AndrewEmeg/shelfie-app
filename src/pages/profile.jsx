import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

function Profile() {
  const [numberOfBooksReviewed, setNumberOfBooksReviewed] = useState(0);
  const { userData } = useAuth();
  const { currentUser } = useAuth();

  useEffect(() => {
    const docRef = doc(db, "users", currentUser.uid);
    const getNumberOfBooksReviewed = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const numOfBooks = data["booksReviewed"].length;
          setNumberOfBooksReviewed(numOfBooks);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getNumberOfBooksReviewed();
  }, [currentUser.uid]);
  return (
    <div className="font-rubik p-16 my-0 mx-auto max-w-screen-sm">
      <h1 className="text-5xl mb-16">
        This is your profile, {userData.firstName}
      </h1>
      <div className="flex gap-4 items-center">
        <div className="h-24 w-24 bg-gray-400 rounded-full mb-4 hover:cursor-pointer"></div>
        <p className="text-3xl mb-4 text-gray-400">
          Profile photo coming soon...
        </p>
      </div>
      <p className="text-3xl  mb-4">
        First name: <span className="text-gray-400">{userData.firstName}</span>
      </p>
      <p className="text-3xl  mb-4">
        Last name: <span className="text-gray-400">{userData.lastName}</span>
      </p>
      <p className="text-3xl  mb-4">
        Email: <span className="text-gray-400">{userData.email}</span>
      </p>
      <p className="text-3xl  mb-4">
        Number of books you&apos;ve reviewed:{" "}
        <span className="text-gray-400">{numberOfBooksReviewed}</span>
      </p>
    </div>
  );
}

export default Profile;
