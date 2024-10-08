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
import Feedback from "./pages/feedback";
import MyList from "./pages/my-list";
import General from "./pages/general";
import ProtectedRoutes from "./components/protected-routes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const { bookList } = useRest();
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="signUp" element={<SignUp />} />
          <Route path="signIn" element={<SignIn />} />

          <Route
            path="home"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          >
            <Route index element={<Search />} />
            <Route path="books" element={<BookList bookList={bookList} />}>
              <Route index element={<MyList />} />
              <Route path="review" element={<Review />} />
              <Route path="my-list" element={<MyList />} />
              <Route path="general" element={<General />} />
            </Route>
            <Route path="search" element={<Search />} />
            <Route path="profile" element={<Profile />} />
            <Route path="feedback" element={<Feedback />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
