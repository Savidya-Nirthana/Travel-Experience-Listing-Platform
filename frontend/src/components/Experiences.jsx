import ExpCard from "./ExpCard";
import { useEffect, useState, useContext } from "react";
import { getExperiences } from "../services/listingservices";
import { AuthContext } from "../contexts/AuthContext";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const Experiences = ({
  showMyListing,
  refreshKey,
  searchQuery,
  onListingUpdated,
}) => {
  const { user } = useContext(AuthContext);
  const username = user ? user.firstname + " " + user.lastname : "";
  const [items, setItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  useEffect(() => {
    const fetchExperiences = async () => {
      const response = await getExperiences();
      const data = response?.data;
      if (!Array.isArray(data)) {
        setItems([]);
        return;
      }
      if (showMyListing) {
        const myListings = data.filter((item) => item.creatername === username);
        setItems(myListings);
      } else {
        setItems(data);
      }
    };
    fetchExperiences();
  }, [showMyListing, refreshKey, username]);

  const nextPage = () => {
    if (startIndex + itemsPerPage < filteredItems.length) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const prevPage = () => {
    if (startIndex - itemsPerPage >= 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const filteredItems = searchQuery
    ? items.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : items;

  if (filteredItems.length === 0) {
    return (
      <div className=" text-center text-xl font-semibold pt-50">
        No listings found
      </div>
    );
  }

  return (
    <div>
      <div className=" flex gap-5 flex-col">
        {filteredItems
          .slice(startIndex, startIndex + itemsPerPage)
          .map((item) => (
            <ExpCard
              key={item._id}
              id={item._id}
              image={item.image}
              title={item.title}
              location={item.location}
              description={item.description}
              price={item.price}
              creatername={item.creatername}
              fullName={username}
              onListingUpdated={onListingUpdated}
            />
          ))}
      </div>
      <div className=" flex gap-5 flex-row justify-center mt-5">
        <ArrowCircleLeftIcon
          sx={{ fontSize: "40px", cursor: "pointer", color: "#219ebc" }}
          onClick={prevPage}
        />
        <ArrowCircleRightIcon
          sx={{ fontSize: "40px", cursor: "pointer", color: "#219ebc" }}
          onClick={nextPage}
        />
      </div>
    </div>
  );
};

export default Experiences;
