"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axiosInstance from "../../lib/axios";

export function AddCourse({ addCourse }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [category, setCategory] = useState("");
  const [instantDelivery, setInstantDelivery] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append("files", imageFile);

      const response = await axiosInstance.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data[0]; // Return the first uploaded file
    } catch (error) {
      console.error("Image upload error:", error);
      throw error;
    }
  };
  const handelAddCourse = async (e) => {
    e.preventDefault();
    try {
      let imageId = null;

      if (image) {
        const uploadedImage = await uploadImage(image);
        imageId = uploadedImage.id;
      }
      // ✅ إرسال بيانات الكورس وربط الصورة
      const res = await axiosInstance.post("/products", {
        data: {
          title: title,
          discription: description,
          price: price,
          category: category,
          instantDelivery: instantDelivery,
          ...(imageId && { image: [imageId] }), // Send as array for Strapi
        },
      });

      console.log("Course Added", res.data);

      // ✅ Reset form
      setTitle("");
      setDescription("");
      setPrice("");
      setImage(null);
      setCategory("");
      setPreview(null);
      setInstantDelivery("");
      alert("Course Added Successfully");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{addCourse}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={"text-2xl text-center"}>
            Course Details
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handelAddCourse}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">title</Label>
              <Input
                id="name-1"
                name="title"
                value={title}
                placeholder={"Enter Course Title"}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">description</Label>
              <Input
                id="username-1"
                name="description"
                value={description}
                placeholder={"Enter Course Description"}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Price</Label>
              <Input
                id="username-1"
                name="price"
                value={price}
                placeholder={"Enter Course Price"}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">image</Label>
              <Input
                type={"file"}
                id="image"
                name="image"
                placeholder={"Choose an image"}
                onChange={handleImageChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 w-full h-32 object-contain rounded"
                />
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Category</Label>
              <select
                className="py-2 text-sm border border-balck-100"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option>Select Category</option>
                <option>tech</option>
                <option>marketing</option>
                <option>general</option>
              </select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Instant Delivery</Label>
              <select
                className="py-2 text-sm border border-black-100"
                onChange={(e) => setInstantDelivery(e.target.value)}
                value={instantDelivery}
              >
                <option>Select Instant Delivery</option>
                <option>true</option>
                <option>false</option>
              </select>
            </div>
          </div>
          <DialogFooter className={"mt-10"}>
            <DialogClose asChild>
              <Button
                variant="outline"
                type="button"
                className={"cursor-pointer"}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button className={"cursor-pointer"} type="submit">
              Add
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
