import { useNavigate } from "react-router-dom";

const Review = () => {
  const navigate = useNavigate();
  const handleGoToBooks = () => {
    navigate("/home/books");
  };
  return (
    <div>
      <button
        to="books"
        onClick={handleGoToBooks}
        className=" rounded-lg p-6 font-medium text-3xl text-white bg-teal-700"
      >
        Books
      </button>
      <span className="text-7xl ">This is the Review page.</span>
    </div>
  );
};
export default Review;
