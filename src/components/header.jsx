const Header = () => {
  return (
    <div className="flex justify-between bg-teal-700 p-16 items-center">
      <div className="flex gap-6 items-center">
        <img src="img/shelfie-favicon-02.png" alt="Shelfie Logo" />
        <p className="text-5xl text-white font-rubik">Shelfie</p>
      </div>
      <ion-icon
        className="text-white"
        style={{ color: "white", width: "44px", height: "44px" }}
        name="menu-outline"
        size="large"
      ></ion-icon>
    </div>
  );
};
export default Header;
