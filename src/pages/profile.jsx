import { useAuth } from "../context/AuthContext";

function Profile() {
  const { userData } = useAuth();
  //   const { currentUser } = useAuth();
  return (
    <div className="font-rubik p-16 my-0 mx-auto max-w-screen-sm">
      <h1 className="text-5xl">This is your profile, {userData.firstName}</h1>
      <p className="text-3xl">
        Your full name is {userData.firstName} {userData.lastName}
      </p>
      <p className="text-3xl">Finally, your email is {userData.email}</p>
    </div>
  );
}

export default Profile;
