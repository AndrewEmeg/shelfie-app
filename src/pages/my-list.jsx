import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function MyList() {
  const [reviewedList, setReviewedList] = useState([]);
  const { currentUser } = useAuth();
  const collectionName = "users";
  const documentID = currentUser.uid;
  const arrayFieldName = "booksReviewed";
  const navigate = useNavigate();
  useEffect(() => {
    const docRef = doc(db, collectionName, documentID);
    const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setReviewedList(data[arrayFieldName]);
      } else {
        console.log("Document does not exist.");
      }
    });
    return () => unsubscribe();
  }, [collectionName, documentID, arrayFieldName]);

  useEffect(() => {
    const getUserReviewedBooks = async () => {
      const userRef = await getDoc(doc(db, "users", currentUser.uid));

      if (userRef.exists()) {
        console.log(userRef.data().booksReviewed);
        const books = userRef.data().booksReviewed;
        setReviewedList(books);
      }
    };

    getUserReviewedBooks();
  }, [currentUser.uid]);

  const handleGoToBooks = () => {
    navigate("/home/books");
  };

  let newReviewValueV2 = "";

  const handleDeleteReviewIndividualBookList = async (
    collectionName,
    documentID,
    arrayFieldName,
    propertyName,
    propertyValue
  ) => {
    const docRef = doc(db, collectionName, documentID);
    const confirm = window.confirm(
      "Are you sure you want to delete this review? There's no going back. Also, note that all reviews that is the same with this one will be deleted also."
    );
    if (confirm) {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const array = data[arrayFieldName];
          const updatedArray = array.filter(
            (item) => item[propertyName] !== propertyValue
          );
          await updateDoc(docRef, {
            [arrayFieldName]: updatedArray,
          });
          console.log("item deleted successfully");
        } else {
          console.log("No such document");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDeleteReviewGeneralBookList = async (
    collectionName,
    documentID,
    arrayFieldName,
    propertyName,
    propertyValue
  ) => {
    const docRef = doc(db, collectionName, documentID);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const array = data[arrayFieldName];
        const updatedArray = array.filter(
          (item) => item[propertyName] !== propertyValue
        );
        await updateDoc(docRef, {
          [arrayFieldName]: updatedArray,
        });
        console.log("item deleted in general list successfully");
      } else {
        console.log("No such document in general list");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateReviewIndividualBookList = async (
    collectionName,
    documentID,
    arrayFieldName,
    propertyName,
    propertyValue
  ) => {
    const newReviewValue = prompt("Change review to:");
    newReviewValueV2 = newReviewValue;
    if (newReviewValueV2) {
      const docRef = doc(db, collectionName, documentID);
      const confirm = window.confirm(
        "Are you sure you want to update this review? Also, note that all reviews that is the same with this one will be updated also."
      );
      if (confirm) {
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const array = data[arrayFieldName];
            for (const item of array) {
              if (item[propertyName] === propertyValue) {
                item[propertyName] = newReviewValue;
              }
            }

            await updateDoc(docRef, {
              [arrayFieldName]: array,
            });
            console.log("item updated successfully");
          } else {
            console.log("No such document");
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  const handleUpdateReviewGeneralBookList = async (
    collectionName,
    documentID,
    arrayFieldName,
    propertyName,
    propertyValue
  ) => {
    if (newReviewValueV2) {
      const docRef = doc(db, collectionName, documentID);
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const array = data[arrayFieldName];
          for (const item of array) {
            if (item[propertyName] === propertyValue) {
              item[propertyName] = newReviewValueV2;
            }
          }

          await updateDoc(docRef, {
            [arrayFieldName]: array,
          });
          console.log("item deleted in general list successfully");
        } else {
          console.log("No such document in general list");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col gap-8 font-rubik p-16 mx-auto max-w-screen-lg">
      {reviewedList?.length ? (
        reviewedList.map((book) => (
          <article
            className="grid grid-rows-2 sm:grid-cols-9 sm:grid-rows-none sm:gap-0 gap-y-8 bg-slate-100 border border-teal-700 rounded-2xl overflow-hidden"
            key={book.reviewText}
          >
            <div
              className="col-span-2"
              style={{
                backgroundImage: `url(${book?.url})`,
                backgroundRepeat: "repeat",
                backgroundSize: "100%",
              }}
            ></div>
            <div className="relative sm:col-start-3 sm:col-end-10 p-8">
              <div className="">
                <h1 className="text-5xl pb-4 font-semibold pr-24">
                  {book?.title}
                </h1>

                <div>
                  <span className="text-3xl pb-4 font-medium">
                    Your Review:{" "}
                  </span>
                  <span className="text-3xl pb-4 font-light ">
                    {`"${book?.reviewText}"`}
                  </span>
                </div>
                <div>
                  <span className="text-3xl pb-4 font-medium">
                    Your Rating:{" "}
                  </span>
                  <span className="text-3xl pb-4 font-light ">
                    {book?.ratingNumber}⭐️
                  </span>
                </div>
              </div>
              <div
                onClick={() => {
                  handleDeleteReviewIndividualBookList(
                    "users",
                    currentUser?.uid,
                    "booksReviewed",
                    "reviewText",
                    book?.reviewText
                  );
                  handleDeleteReviewGeneralBookList(
                    "books",
                    book?.bookID,
                    "reviewsForBook",
                    "reviewText",
                    book?.reviewText
                  );
                }}
                className="absolute top-8 right-4 hover:cursor-pointer"
              >
                <ion-icon
                  style={{ color: "#1f766e", width: "28px", height: "28px" }}
                  name="trash-outline"
                ></ion-icon>
              </div>
              <div
                onClick={() => {
                  handleUpdateReviewIndividualBookList(
                    "users",
                    currentUser?.uid,
                    "booksReviewed",
                    "reviewText",
                    book?.reviewText
                  );
                  handleUpdateReviewGeneralBookList(
                    "books",
                    book?.bookID,
                    "reviewsForBook",
                    "reviewText",
                    book?.reviewText
                  );
                }}
                className="absolute top-8 right-20 hover:cursor-pointer"
              >
                <ion-icon
                  style={{ color: "#1f766e", width: "28px", height: "28px" }}
                  name="pencil-outline"
                ></ion-icon>
              </div>

              {/* <div>
                <span className="text-2xl">Authors: </span>
                <span className="text-2xl font-light">{book?.authors}</span>
              </div>

              <div>
                <span className="text-2xl">Average Rating: </span>
                <span className="text-2xl font-light">
                  {book?.averageRating}⭐️
                </span>
              </div>
              <div>
                <span className="text-2xl">Published Date: </span>
                <span className="text-2xl font-light">
                  {book?.publishedDate}
                </span>
              </div> */}
            </div>
          </article>
        ))
      ) : (
        <div className="grid grid-cols-1 grid-rows-2 my-4 mx-auto">
          <h1 className="text-center text-5xl">You are yet to review a book</h1>{" "}
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
        </div>
      )}
    </div>
  );
}

export default MyList;
