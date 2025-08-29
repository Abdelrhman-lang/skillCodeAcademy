"use client";
import Image from "next/image";
import { useState } from "react";
import Swal from "sweetalert2";
export default function ContactClient({
  nameLabel,
  emailLabel,
  messageLabel,
  namePlaceholder,
  emailPlaceholder,
  messagePlaceholder,
  sendBtn,
  subTitle,
  title,
}) {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  return (
    <section className="container mx-auto py-12 px-4 flex flex-col md:flex-row items-center gap-10">
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
        <h2 className="section-header mb-4 text-center ">{subTitle}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          {title}
        </p>
        <form className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-semibold dark:text-blue-300"
            >
              {nameLabel}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-2 focus:ring-primary outline-none"
              placeholder={namePlaceholder}
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium dark:text-blue-300"
            >
              {emailLabel}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-2 focus:ring-primary outline-none"
              placeholder={emailPlaceholder}
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium  dark:text-blue-300"
            >
              {messageLabel}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-gray-900 dark:text-gray-100 focus:border-primary focus:ring-2 focus:ring-primary outline-none resize-none"
              placeholder={messagePlaceholder}
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              required
            />
          </div>
          <button
            onClick={() => {
              if (nameInput && emailInput && messageInput) {
                Swal.fire({
                  title: `Thank you ${nameInput}`,
                  text: "Your Message Has Been Sent To Us",
                  icon: "success",
                });
              }
            }}
            type="submit"
            className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold text-lg shadow-md hover:bg-primary/90 transition cursor-pointer"
          >
            {sendBtn}
          </button>
        </form>
      </div>
      <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
          alt="Contact Us"
          className="rounded-lg shadow-lg w-full h-72 object-cover md:h-96"
          width={600}
          height={384}
        />
      </div>
    </section>
  );
}
