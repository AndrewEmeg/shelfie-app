/* eslint-disable react/prop-types */

const BookList = ({ bookList, query }) => {
  return (
    <div className="flex flex-col gap-8">
      {bookList?.map((individualBook) => (
        <BookItem
          key={individualBook.id}
          individualBook={individualBook}
          query={query}
        />
      ))}
    </div>
  );
};

const BookItem = ({ individualBook }) => {
  return (
    <article className="grid grid-rows-2 sm:grid-cols-9 sm:grid-rows-none sm:gap-0 gap-y-8 bg-slate-100 rounded-2xl overflow-hidden">
      <div
        className="col-span-2"
        style={{
          backgroundImage: `url(${individualBook?.volumeInfo?.imageLinks?.thumbnail})`,
          backgroundRepeat: "repeat",
          backgroundSize: "100%",
        }}
      ></div>

      {/* <img
          src={individualBook?.volumeInfo?.imageLinks?.thumbnail}
          alt={`${query} book`}
        /> */}

      <div className="pt-0 sm:pt-8 p-8 sm:col-start-3 sm:col-end-10 flex flex-col justify-center">
        <h3 className="text-5xl pb-4 font-semibold ">
          {individualBook?.volumeInfo?.title}
        </h3>
        <div className="sm:flex sm:justify-between">
          <div>
            <div>
              <span className="text-2xl">Authors: </span>
              <span className="text-2xl font-light">
                {individualBook?.volumeInfo?.authors.join(" ")}
              </span>{" "}
            </div>
            {/* <div>
            <span className="text-2xl">Pages: </span>
            <span className="text-2xl font-light">
              {individualBook?.volumeInfo?.pageCount}
            </span>
          </div>
          <div>
            <span className="text-2xl">Average Rating: </span>
            <span className="text-2xl font-light">
              {individualBook?.volumeInfo?.averageRating}⭐️
            </span>
          </div> */}
            <div>
              <span className="text-2xl">Published Date: </span>
              <span className="text-2xl font-light">
                {individualBook?.volumeInfo?.publishedDate}
              </span>
            </div>
          </div>
          <button
            //   onClick={handleGetBooks}
            className="rounded-lg mt-4 py-4 px-12 font-medium text-2xl text-white bg-teal-700"
          >
            Review Book
          </button>
        </div>
      </div>
    </article>
  );
};
export default BookList;
