import { useNavigate } from "react-router-dom";
import { useRest } from "../context/RestContext";

const Review = () => {
  const navigate = useNavigate();
  const { bookReviewed } = useRest();
  const handleGoToBooks = () => {
    navigate("/home/books");
  };

  return (
    <div className="p-16 max-w-screen-lg my-0 mx-auto">
      <button
        to="books"
        onClick={handleGoToBooks}
        className=" rounded-lg p-6 font-medium text-3xl text-white bg-teal-700"
      >
        Books
      </button>
      <span className="text-7xl ">This is the Review page.</span>
      <article className="grid sm:gap-8 grid-rows-2 sm:grid-cols-9 sm:grid-rows-none sm:gap-0 gap-y-8 rounded-2xl overflow-hidden">
        {/* <img
          src={bookReviewed?.volumeInfo?.imageLinks?.thumbnail}
          alt={`${bookReviewed?.volumeInfo?.title} book`}
          className="col-auto"
        /> */}
        <div
          className="col-span-2"
          style={{
            backgroundImage: `url(${bookReviewed?.volumeInfo?.imageLinks?.thumbnail})`,
            backgroundRepeat: "repeat",
            backgroundSize: "100%",
          }}
        ></div>
        <div className="sm:col-start-3 sm:col-end-10">
          <h1 className="text-5xl pb-4 font-semibold ">
            {bookReviewed?.volumeInfo?.title}
          </h1>
          <h3 className="text-3xl pb-4 font-medium ">
            {bookReviewed?.volumeInfo?.subtitle}
          </h3>

          <div>
            <span className="text-2xl">Authors: </span>
            <span className="text-2xl font-light">
              {bookReviewed?.volumeInfo?.authors.join(" ")}
            </span>{" "}
          </div>
          <div>
            <span className="text-2xl">Pages: </span>
            <span className="text-2xl font-light">
              {bookReviewed?.volumeInfo?.pageCount}
            </span>
          </div>
          <div>
            <span className="text-2xl">Average Rating: </span>
            <span className="text-2xl font-light">
              {bookReviewed?.volumeInfo?.averageRating}⭐️
            </span>
          </div>
          <div>
            <span className="text-2xl">Published Date: </span>
            <span className="text-2xl font-light">
              {bookReviewed?.volumeInfo?.publishedDate}
            </span>
          </div>
        </div>
      </article>
      <p>{bookReviewed?.volumeInfo?.description}</p>
    </div>
  );
};
export default Review;
