/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";

const RestContext = createContext();

const useRest = () => {
  return useContext(RestContext);
};

const RestProvider = ({ children }) => {
  const [query, setQuery] = useState("");
  const [bookList, setBookList] = useState([]);
  const [showBooks, setShowBooks] = useState(false);

  return (
    <RestContext.Provider
      value={{
        query,
        setQuery,
        bookList,
        setBookList,
        showBooks,
        setShowBooks,
      }}
    >
      {children}
    </RestContext.Provider>
  );
};
export { RestContext, RestProvider, useRest };
