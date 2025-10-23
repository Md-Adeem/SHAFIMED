import TopNavbar from "./TopNavbar";
import Navbar from "./Navbar";

const AppNavbar = () => {
  return (
    <header className="sticky top-0 z-50">
      <TopNavbar />
      <Navbar />
    </header>
  );
};

export default AppNavbar;
