import ExpCard from "./ExpCard";
import { useEffect, useState, useContext } from "react";
import { getExperiences } from "../services/listingservices";
import { AuthContext } from "../contexts/AuthContext";

const Experiences = ({
  showMyListing,
  refreshKey,
  searchQuery,
  onListingUpdated,
}) => {
  const { user } = useContext(AuthContext);
  const username = user ? user.firstname + " " + user.lastname : "";
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchExperiences = async () => {
      const response = await getExperiences();
      if (showMyListing) {
        const myListings = response.data.filter(
          (item) => item.creatername === username,
        );
        setItems(myListings);
      } else {
        setItems(response.data);
      }
    };
    fetchExperiences();
  }, [showMyListing, refreshKey, username]);

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
    <div className=" flex gap-5 flex-col">
      {filteredItems.map((item) => (
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
  );
};

export default Experiences;
