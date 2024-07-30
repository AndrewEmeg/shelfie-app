import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

function MyList() {
  const [reviewedList, setReviewedList] = useState([]);
  const { currentUser } = useAuth();
  useEffect(() => {
    const getUserReviewedBooks = async () => {
      const userRef = await getDoc(doc(db, "users", currentUser.uid));

      if (userRef.exists()) {
        console.log(userRef.data().booksReviewed);
        const books = userRef.data().booksReviewed;
        setReviewedList(books);
      }
      try {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${volumeId}`
        );
        const data = await response.json();
        //   console.log(data);
        setBookReviewed(data);
      } catch (error) {
        console.error(error);
      }
    };

    getUserReviewedBooks();
  }, []);
  return (
    <div className="font-rubik px-16 my-0 mx-auto max-w-screen-sm border-2 ">
      {reviewedList.map((book) => (
        <article key={book.id}>
          <div
            className="col-span-2"
            style={{
              backgroundImage: `url(${book?.url})`,
              backgroundRepeat: "repeat",
              backgroundSize: "100%",
            }}
          ></div>
          <div className="sm:col-start-3 sm:col-end-10">
            <h1 className="text-5xl pb-4 font-semibold ">{book?.title}</h1>

            <div>
              <span className="text-3xl pb-4 font-medium">Your Review: </span>
              <span className="text-3xl pb-4 font-medium ">
                {book?.reviewText}
              </span>
            </div>
            <div>
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
              <span className="text-2xl font-light">{book?.publishedDate}</span>
            </div>
            {/* <div>
              <span className="text-2xl">Your Review: </span>
              <span className="text-2xl font-light">{book?.reviewText}</span>
            </div> */}
          </div>
        </article>
      ))}
    </div>
  );
}

export default MyList;
("http://books.google.com/books/publisher/content?id=lFhbDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72vq2ldIX895NaTRe9xJjIg7G-gxVLOgwLwhWTA2zXXH05ji2KdT5Fqit4fHg0qxRqlpOmykTnae4UpE47CFLPX3jHCeW0_nmHx6dZG2bxfyQp02Z9cxw5jCVHZK5_21KiIsX_F&source=gbs_api");

("http://books.google.com/books/content?id=lFhbDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api");
