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

export function UpdateCourse({ product, editCourse }) {
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.discription); // Handle both spellings
  const [price, setPrice] = useState(product.price);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handelChanges = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await axiosInstance.put(`/products/${product.documentId}`, {
        data: {
          title: title,
          discription: description, // Fixed spelling
          price: parseFloat(price), // Ensure price is a number
        },
      });

      console.log("Course updated successfully:", res.data.data);
      alert("Course updated successfully!");

      // Close the dialog
      setIsOpen(false);

      // Reset form
      setTitle(product.title);
      setDescription(product.description || product.discription);
      setPrice(product.price);
    } catch (err) {
      console.error("Error updating course:", err);
      setError(err.response?.data?.error?.message || "Failed to update course");
      alert(
        "Error: " +
          (err.response?.data?.error?.message || "Failed to update course")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={" cursor-pointer"}>
          {editCourse}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={"text-2xl text-center"}>
            Course Details
          </DialogTitle>
        </DialogHeader>
        <form>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="title-1">Title</Label>
              <Input
                id="title-1"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description-1">Description</Label>
              <Input
                id="description-1"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price-1">Price</Label>
              <Input
                id="price-1"
                name="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
          </div>
          <DialogFooter className={"mt-10"}>
            <DialogClose asChild>
              <Button
                variant="outline"
                type="button"
                className={"cursor-pointer"}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              className={"cursor-pointer"}
              type="submit"
              disabled={isLoading}
              onClick={handelChanges}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
