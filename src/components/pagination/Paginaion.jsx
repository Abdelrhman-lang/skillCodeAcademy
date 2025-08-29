import React from "react";

export default function Paginaion({ page, pageCount, setPage }) {
  return (
    <ul className="flex justify-center gap-3 text-gray-900 mt-10">
      <li>
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
          aria-label="Previous page"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>

      <li className="text-sm/8 font-medium tracking-widest">
        {page}/{pageCount}
      </li>

      <li>
        <button
          className="grid size-8 place-content-center rounded border border-gray-200 transition-colors hover:bg-gray-50 rtl:rotate-180"
          aria-label="Next page"
          onClick={() => setPage(page + 1)}
          disabled={page === pageCount}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </li>
    </ul>
  );
}
