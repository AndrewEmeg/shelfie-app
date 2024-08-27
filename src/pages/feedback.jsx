import { setDoc, doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

function Feedback() {
  const [feedback, setFeedbackText] = useState("");
  const navigate = useNavigate();
  const { currentUser, userData } = useAuth();

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    let userFeedback = [];
    try {
      const docR = doc(db, "feedbacks", currentUser.uid);
      const docSnapp = await getDoc(docR);
      if (docSnapp.data()?.feedbackk) {
        userFeedback = docSnapp.data().feedbackk;
      }
      await setDoc(
        doc(db, "feedbacks", currentUser.uid),
        {
          feedbackk: [...userFeedback, feedback],
          fullName: userData.fullName,
        },
        { merge: true }
      );
    } catch (error) {
      console.log(error);
    }
    alert("Thank you for leaving a feedback. We appreciate it!");
    setFeedbackText("");
  };

  const handleGoToBooks = () => {
    navigate("/home/books");
  };
  return (
    <div className="p-16 max-w-screen-lg my-0 mx-auto">
      <button
        onClick={handleGoToBooks}
        className="flex gap-4 items-center justify-center font-medium text-3xl text-teal-700 mb-8"
      >
        <ion-icon
          style={{ color: "#1f766e", width: "36px", height: "36px" }}
          name="arrow-back-circle-outline"
        ></ion-icon>
        Back to Search List
      </button>
      <h1 className="text-5xl font-bold mb-12">
        We’d Love Your Feedback on Shelfie!
      </h1>
      <p className="text-3xl mb-4">
        Hi <span className="font-bold">{userData.firstName}</span>{" "}
      </p>
      <div className="text-3xl font-light mb-4">
        Thank you for using Shelfie! We hope you&apos;re enjoying the app. To
        help us make Shelfie even better, we&apos;d love to hear your thoughts.
        Could you please share your feedback with us? Just reply to this message
        with your thoughts on:{" "}
        <ol className="pl-24 list-disc">
          <li>What you like about Shelfie</li>
          <li>Any improvements you&apos;d suggest</li>
          <li>Any issues you&apos;ve encountered</li>
        </ol>{" "}
        Your input is invaluable and helps us improve the app for everyone.
      </div>
      <p className="text-3xl font-light mb-4">Thanks a lot for your time!</p>
      <p className="text-3xl font-light mb-12">
        Best,<br></br>
        <span className="font-bold ">The Shelfie Team</span>
      </p>
      <form>
        <label
          className="block mb-8 max-w-full text-2xl text-slate-800 font-normal "
          htmlFor="review"
        >
          <textarea
            value={feedback}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Write your feedback..."
            rows={5}
            className="w-full rounded-lg p-4 block font-light text-2xl border border-solid border-gray-400 text-gray-800"
            type="email"
            name="review"
            id="review"
          >
            Write your feedback...
          </textarea>
        </label>
        <button
          to="success"
          onClick={handleSubmitFeedback}
          className="w-full rounded-lg mt-8 mb-24 py-6 block font-medium text-3xl text-white bg-teal-700"
        >
          Submit Your Feedback
        </button>
      </form>
    </div>
  );
}

export default Feedback;
