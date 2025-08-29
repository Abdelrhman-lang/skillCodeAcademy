import React from "react";

export default function AdminCard({ admin }) {
  return (
    <main className="block rounded-md border border-gray-300 p-4 shadow-sm sm:p-6 h-[fit-content]">
      <div className="sm:flex sm:justify-between sm:gap-4 lg:gap-6">
        <div className="sm:order-last sm:shrink-0">
          <img
            alt="admin-img"
            src={admin.image[0].url}
            className="size-16 rounded-full object-contain sm:size-[72px]"
          />
        </div>

        <div className="mt-4 sm:mt-0">
          <h3 className="text-lg font-medium text-pretty text-gray-900">
            {admin.name}
          </h3>

          <p className="mt-1 text-sm text-primary capitalize">{admin.job}</p>

          <p className="mt-4 line-clamp-2 text-sm text-pretty text-gray-700">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. At velit
            illum provident a, ipsa maiores deleniti consectetur nobis et eaque.
          </p>
        </div>
      </div>

      <dl className="mt-6 flex gap-4 lg:gap-6">
        <div>
          <dt className="text-sm font-medium text-gray-700">Start Job</dt>

          <dd className="text-xs text-gray-700">{admin.startjob}</dd>
        </div>
      </dl>
    </main>
  );
}
