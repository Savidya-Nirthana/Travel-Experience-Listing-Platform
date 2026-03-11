import { Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

const NavBar = ({
  handleLogout,
  user,
  showMyListing,
  setShowMyListing,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className=" flex gap-10 justify-between items-center p-5 shadow-md h-20">
      <div className=" flex gap-10 flex-direction-column font-semibold text-sm sm:text-xl">
        Travel Experience Listing Platform
      </div>
      <div className=" flex flex-row gap-10 items-center">
        <div className="flex flex-row gap-10 items-center">
          <div
            className="flex items-center"
            style={{
              backgroundColor: "#ffffff",
              border: "1.5px solid #e0e0e0",
              borderRadius: "12px",
              padding: "4px 12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              minWidth: "280px",
            }}
          >
            <IconButton type="button" sx={{ p: "6px" }} aria-label="search">
              <SearchIcon sx={{ color: "#9e9e9e", fontSize: 20 }} />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: "0.95rem", color: "#212121" }}
              placeholder="Search list items..."
              inputProps={{ "aria-label": "search list items" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div
          className=" cursor-pointer hover:text-black"
          onClick={() => setShowMyListing(!showMyListing)}
        >
          {showMyListing ? "All Listings" : "My Listings"}
        </div>
        <h1 className=" hidden sm:block text-md">
          {user.firstname} {user.lastname}
        </h1>
        <div className=" block sm:hidden">
          <AccountCircleIcon
            sx={{
              fontSize: "30px",
            }}
          />
        </div>

        <Button variant="contained" color="primary" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
