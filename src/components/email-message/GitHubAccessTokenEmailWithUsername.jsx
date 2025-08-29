"use client";
import React from "react";
import GithubAccessTokenEmail from "./GithubAccessTokenEmail";
import { useUser } from "@clerk/nextjs";
import Spinner from "../ui/Spinner";
export default function GitHubAccessTokenEmailWithUsername() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <Spinner />;
  }

  const username = user?.username || user?.firstName;
  return <GithubAccessTokenEmail username={username} />;
}
