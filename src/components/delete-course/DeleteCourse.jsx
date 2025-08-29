"use client";

import { useState } from "react";
import axiosInstance from "../../lib/axios";
import { Button } from "../ui/button";
import Swal from "sweetalert2";

export default function DeleteCourse({ product, deleteCourse }) {
  const [loading, setLoading] = useState(false);
  const handelDeleteCourse = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.delete(`/products/${product.documentId}`);
      Swal.fire({
        title: "Course Deleted",
        icon: "success",
        confirmButtonText: "ok",
        showCloseButton: true,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Button className={"!bg-red-500"} onClick={handelDeleteCourse}>
      {deleteCourse}
    </Button>
  );
}
