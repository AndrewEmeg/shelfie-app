import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  //   const navigate = useNavigate();
  // console.log("auth is about to start running.");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          // console.log("has not set the Userdoc in auth context yet");
          const userDoc = await getDoc(doc(db, "users", currentUser?.uid));

          if (userDoc.exists()) {
            setUserData(userDoc.data());
            // console.log("has now set the Userdoc in auth context yet");
          }

          // console.log("passed first one");
          // console.log(userDoc.data().firstName);
        } catch (error) {
          // console.error(error);
        }
        // navigate("/protected-routes");
      } else {
        // navigate("/signIn");
      }
    };
    fetchUserData();
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, userData, loading, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export { AuthContext, AuthProvider, useAuth };
