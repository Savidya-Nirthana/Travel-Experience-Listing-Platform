import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import CreateListing from "./CreateListing";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@mui/material";
import { deleteList } from "../services/listingservices";

const ExpCard = ({
  id,
  image,
  title,
  location,
  description,
  price,
  creatername,
  fullName,
  onListingUpdated,
}) => {
  const [selectId, setSelectId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const deleteHandle = async() => {
    const response = await deleteList(id);
    if(response.status === 200){
      setDeleteConfirm(false);
      onListingUpdated();
    }
  }
  return (
    <div
      className=" flex gap-5 bg-slate-50 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer relative"
      onClick={() =>
        setSelectId({ image, title, location, description, price, creatername })
      }
    >
      {fullName === creatername && (
        <div
          className=" absolute top-[0px] right-[10px] z-100 bg-white rounded-full hover:bg-slate-100 hover:text-white transition-colors duration-300"
          onClick={(e) => {
            e.stopPropagation();
            setEditData({
              id,
              image,
              title,
              location,
              description,
              price,
              creatername,
            });
            setIsEdit(true);
          }}
        >
          <EditIcon
            sx={{ fontSize: "20px", cursor: "pointer", color: "green" }}
          />
        </div>
      )}

      {fullName === creatername && (
        <div
          className=" absolute top-[40px] right-[10px] z-100 bg-white rounded-full  hover:bg-slate-100 hover:text-white transition-colors duration-300"
          onClick={(e) => {
            e.stopPropagation();
            setDeleteConfirm(true);
          }}
        >
          <DeleteForeverIcon
            sx={{ fontSize: "20px", cursor: "pointer", color: "red" }}
          />
        </div>
      )}

      <img
        className=" w-[300px] h-[200px] rounded-l-lg"
        src={image}
        alt={title}
      />
      <div>
        <div>
          <div className=" text-2xl pt-2 font-semibold">{title}</div>
          <p className=" text-slate-600 ">{location}</p>
        </div>
        <div>
          <p className=" text-justify mr-4 my-2">
            {description.slice(0, 70)}{" "}
            {description.length > description.slice(0, 70).length
              ? "......"
              : ""}
          </p>
        </div>
        <div className="">
          <p>{price}</p>
          <p className=" float-end mr-3">- {creatername}</p>
        </div>
      </div>
      <AnimatePresence>
        {selectId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-0 z-222 bg-[#00000065] overflow-y-auto flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 15,
              }}
              className=""
            >
              <div className=" bg-white w-[700px] text-center rounded-md py-5 px-10 relative">
                <div
                  className=" absolute top-[-10px] right-[-10px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectId(null);
                  }}
                >
                  <CancelIcon
                    sx={{
                      fontSize: "40px",
                      cursor: "pointer",
                      color: "red",
                    }}
                  />
                </div>
                <div className=" text-2xl font-semibold">{selectId.title}</div>
                <p className=" text-slate-600 ">{selectId.location}</p>
                <img
                  className=" w-full object-cover rounded-md"
                  src={selectId.image}
                  alt={selectId.title}
                />
                <p className=" text-justify mr-4 my-2">
                  {selectId.description}
                </p>
                <div className="flex">
                  <p>Price: </p>
                  <p>{selectId.price}</p>
                </div>
                <p className=" ">- {selectId.creatername} -</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {isEdit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-0 z-222 bg-[#00000065] overflow-y-auto flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 15,
              }}
              className=""
            >
              <div className=" bg-white text-center rounded-md relative">
                <div
                  className=" absolute top-[-10px] right-[-10px]"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEdit(false);
                  }}
                >
                  <CancelIcon
                    sx={{
                      fontSize: "40px",
                      cursor: "pointer",
                      color: "red",
                    }}
                  />
                </div>
                <CreateListing
                  type="edit"
                  data={editData}
                  setIsEdit={setIsEdit}
                  onListingCreated={onListingUpdated}
                />
              </div>
            </motion.div>
          </motion.div>
        )}

        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-0 z-222 bg-[#00000065] overflow-y-auto flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 15,
              }}
              className=""
            >
              <div className=" bg-white text-center rounded-md relative w-[300px] h-[150px] flex flex-col justify-center items-center gap-5">
                <p className=" w-[200px] text-center">
                  Are you sure you wan't to delete this?
                </p>
                <div className=" flex justify-center gap-5">
                  <Button sx={{
                    backgroundColor: "red",
                    color: "white"
                  }}
                  onClick={deleteHandle}
                  >Yes</Button>
                  <Button sx={{
                    backgroundColor: "gray",
                    color: "white"
                  }} onClick={() => setDeleteConfirm(false)}>No</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpCard;
