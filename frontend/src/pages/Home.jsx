import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState } from "react";
import { logOut } from "../services/userservices";
import NavBar from "../components/NavBar";
import CreateListing from "../components/CreateListing";
import Experiences from "../components/Experiences";

const Home = () => {
  const [showMyListing, setShowMyListing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { setUser, user, loading } = useContext(AuthContext);
  const handleLogout = async () => {
    await logOut();
    localStorage.removeItem("jwt");
    setUser(null);
    navigate("/auth");
  };

  const handleListingCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="fixed w-full z-10 bg-white shadow-sm">
        <NavBar
          handleLogout={handleLogout}
          user={user}
          showMyListing={showMyListing}
          setShowMyListing={setShowMyListing}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <div className="pt-24 pb-10 flex justify-between gap-10 px-5 max-w-[1200px] mx-auto">
        <div className="flex-1 max-w-[700px]">
          <Experiences
            showMyListing={showMyListing}
            refreshKey={refreshKey}
            searchQuery={searchQuery}
            onListingUpdated={handleListingCreated}
          />
        </div>
        <div className="sticky top-24 self-start">
          <CreateListing onListingCreated={handleListingCreated} />
        </div>
      </div>

      <div>
        <div className=" w-screen h-4 bg-white fixed bottom-0 shadow-lg"></div>
      </div>
    </div>
  );
};

export default Home;
