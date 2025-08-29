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

export function AddAdmin({ addAdmin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [job, setJob] = useState("");
  const [startJob, setStartJob] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

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
  const handelAddAdmin = async (e) => {
    e.preventDefault();
    try {
      let imageId = null;

      if (image) {
        const uploadedImage = await uploadImage(image);
        imageId = uploadedImage.id;
      }
      const response = await axiosInstance.post("/auth/local/register", {
        username: name,
        email: email,
        password: password,
      });

      // ✅ إرسال بيانات الكورس وربط الصورة
      const res = await axiosInstance.post("/admins", {
        data: {
          name: name,
          email: email,
          job: job,
          startjob: startJob,
          ...(imageId && { image: [imageId] }), // Send as array for Strapi
        },
      });

      console.log("Admin Add To Admins", res.data);
      console.log("Admin Add To User", response.data);

      // ✅ Reset form
      setName("");
      setEmail("");
      setJob("");
      setStartJob("");
      setImage(null);
      alert("Admin Added Successfully");
      alert("Admin Added Successfully to user");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{addAdmin}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={"text-2xl text-center"}>
            Admin Details
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handelAddAdmin}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                value={name}
                placeholder={"Enter Admin Name"}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Email</Label>
              <Input
                id="email-1"
                name="email"
                value={email}
                placeholder={"Enter Admin Email"}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="pass-1">Password</Label>
              <Input
                type={"password"}
                id="pass-1"
                name="password"
                value={password}
                placeholder={"Enter Admin Email"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Job</Label>
              <Input
                id="job-1"
                name="job"
                value={job}
                placeholder={"Enter Admin Job"}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Start Job</Label>
              <Input
                type={"date"}
                id="startJob-1"
                name="startJob"
                value={startJob}
                placeholder={"Enter Admin Start Job"}
                onChange={(e) => setStartJob(e.target.value)}
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
