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
import Swal from "sweetalert2";

export function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/local", {
        identifier: email,
        password: password,
      });

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("jwt", response.data.jwt);
      // ✅ Reset form
      setEmail("");
      setPassword("");
      window.location.reload();
    } catch (err) {
      const errorMessage =
        err.response?.data?.error?.message || "An unexpected error occurred";
      if (errorMessage === "Invalid identifier or password") {
        Swal.fire({
          title: "Email Or Password are incorrect",
          icon: "error",
          iconHtml: "؟",
          confirmButtonText: "ok",
          showCloseButton: true,
        });
      } else {
        alert("Error " + errorMessage);
      }
      console.log(err);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={"w-full"}>
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={"text-2xl text-center"}>
            Admin Login
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handelLogin}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Email</Label>
              <Input
                type={"email"}
                id="name-1"
                name="name"
                value={email}
                placeholder={"Enter Your Email"}
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
                placeholder={"Enter your Password"}
                onChange={(e) => setPassword(e.target.value)}
              />
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
              Login
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
