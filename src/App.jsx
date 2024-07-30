import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./pages/welcome";
import SignUp from "./pages/sign-up";
import SignIn from "./pages/sign-in";
import Home from "./pages/home";
import PageNotFound from "./pages/page-not-found";
import { useRest } from "./context/RestContext";
import BookList from "./components/book-items";
import Search from "./components/search";
import Profile from "./pages/profile";
import Review from "./pages/review";
import Success from "./pages/success";

function App() {
  const { bookList } = useRest();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="signIn" element={<SignIn />} />
        <Route path="home" element={<Home />}>
          <Route index element={<Search />} />
          <Route path="books" element={<BookList bookList={bookList} />}>
            <Route path="review" element={<Review />} />
            <Route path="success" element={<Success />} />
          </Route>
          <Route path="search" element={<Search />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
