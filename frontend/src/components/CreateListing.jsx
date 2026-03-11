import { Button, TextField } from "@mui/material";
import { useState, useRef } from "react";
import { createLs, updateLs } from "../services/listingservices";
import { useNotification } from "../contexts/NotificationContext";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { uploadImage } from "../services/listingservices";

const CreateListing = ({ onListingCreated, type, data, setIsEdit }) => {
  const [form, setForm] = useState({
    title: data?.title || "",
    location: data?.location || "",
    image: data?.image || "",
    description: data?.description || "",
    price: data?.price || "",
    id: data?.id || "",
  });
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const handlefileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const fileInputRef = useRef(null);

  const { showNotification } = useNotification();
  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const createList = async () => {
    let response;
    if (type === "edit") {
      response = await updateLs(form);
    } else {
      const responseUrl = await uploadImage(image);
      const imageUrl = responseUrl?.data?.path;
      response = await createLs({ ...form, image: imageUrl });
    }

    if (response.status === 201 || response.status === 200) {
      showNotification(response.data.message, "success");
      if (onListingCreated) onListingCreated();
      if (setIsEdit) setIsEdit(false);

      // ✅ Reset only on success
      setForm({
        title: "",
        location: "",
        image: "",
        description: "",
        price: "",
        id: "",
      });
      setPreview(null);
      setImage(null);
    } else {
      showNotification(
        response?.data?.message || "Something went wrong",
        "error",
      );
    }
  };

  return (
    <div className=" w-[400px] bg-slate-50 p-6 rounded-sm shadow-md">
      <div>
        <div className=" text-xl font-semibold">List Your Experience</div>
        <div>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={form.title}
            onChange={handleChange("title")}
          />
          <TextField
            label="Location"
            variant="outlined"
            fullWidth
            margin="normal"
            required
            value={form.location}
            onChange={handleChange("location")}
          />
          <div className="flex-col flex items-center justify-center gap-3 h-full">
            <div
              className=" flex  items-center justify-center cursor-pointer"
              onClick={openFilePicker}
            >
              {preview && (
                <img
                  src={preview}
                  className=" w-[200px] h-[150px] rounded-2xl"
                />
              )}
              <div className=" flex flex-col justify-center items-center  ">
                {!preview && (
                  <>
                    <DriveFolderUploadOutlinedIcon />
                    <div>Upload Image</div>
                  </>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handlefileChange}
                />
              </div>
            </div>
          </div>
          <TextField
            label={"Description"}
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            required
            value={form.description}
            onChange={handleChange("description")}
          />
          <TextField
            label={"Price"}
            variant="outlined"
            fullWidth
            margin="normal"
            value={form.price}
            onChange={handleChange("price")}
          />
          <div className=" flex justify-end items-center mt-3">
            <Button variant="contained" color="primary" onClick={createList}>
              {type === "edit" ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
