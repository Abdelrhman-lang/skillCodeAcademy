import Link from "next/link";

export default function BreadCrumb({ product }) {
  return (
    <nav aria-label="Breadcrumb" className="pt-10">
      <ol className="flex items-center justify-center gap-1 text-xl text-gray-700">
        <li>
          <Link
            href="/"
            className="block transition-colors hover:text-gray-900"
          >
            {" "}
            Home{" "}
          </Link>
        </li>

        <li className="rtl:rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 20.247 6-16.5"
            />
          </svg>
        </li>

        <li className="block transition-colors hover:text-gray-900 capitalize">
          {product.category}
        </li>

        <li className="rtl:rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m9 20.247 6-16.5"
            />
          </svg>
        </li>

        <li className="block text-primary transition-color">{product.title}</li>
      </ol>
    </nav>
  );
}
