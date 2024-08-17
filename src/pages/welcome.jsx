import { useEffect } from "react";
import { Link } from "react-router-dom";

function Welcome() {
  useEffect(() => {
    const handleResize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      className="font-rubik overflow-hidden flex flex-col justify-around px-16  text-center my-0 mx-auto max-w-screen-sm"
    >
      <img
        className="w-3/5 block mx-auto"
        src="img/shelfie-logo.png"
        alt="Shelfie Logo"
      />
      <div>
        <h1 className="font-bold max-w-full text-7xl text-teal-700 mb-6">
          Welcome to Shelfie
        </h1>
        <p className="font-light max-w-full text-3xl text-slate-800	mb-4">
          Discover and review your favorite books
        </p>
        <p className="font-light max-w-full text-3xl text-slate-800	text-red-600">
          Click &apos;Sign Up&apos; if you&apos;re a new user and &apos;Sign
          In&apos; if you&apos;re a returning user
        </p>
      </div>
      <div>
        <Link
          to="/signUp"
          className="max-w-full rounded-lg mb-8 py-8 block font-medium text-2xl text-white bg-teal-700"
        >
          Sign Up
        </Link>
        <Link
          to="/signIn"
          className="max-w-full rounded-lg py-8 block font-medium text-2xl border border-solid border-teal-700 text-teal-800"
        >
          Sign In
        </Link>
      </div>
    </section>
  );
}
export default Welcome;
