"use client";
import { useContext } from "react";
import { Button } from "../ui/button";
import { ProductContext } from "../../context/ProductContext";
export default function CategoryBtns({ all, tech, markiting, general }) {
  const btns = [
    { id: 1, title: all, category: "all" },
    { id: 2, title: tech, category: "tech" },
    { id: 3, title: markiting, category: "markiting" },
    { id: 4, title: general, category: "general" },
  ];
  const { selectedCategory, setSelectedCategory } = useContext(ProductContext);
  // useEffect(()=> )
  return (
    <ul className="flex items-center gap-5">
      {btns.map((btn) => {
        return (
          <li key={btn.id}>
            <Button
              variant={"outline"}
              className={`cursor-pointer hover:bg-primary hover:text-white ${
                selectedCategory === btn.category ? "bg-primary text-white" : ""
              }`}
              onClick={() => {
                setSelectedCategory(btn.category);
              }}
            >
              {btn.title}
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
