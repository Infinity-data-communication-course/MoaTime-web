"use client";

import { useRouter } from "next/navigation";

export default function Event() {
  const router = useRouter();

  return (
    <div className="h-full w-full px-32 py-16 flex items-center flex-col gap-12">
      <div className="h-16 w-full">
        <svg
          data-slot="icon"
          fill="none"
          strokeWidth={1.5}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="mr-auto cursor-pointer size-10"
          onClick={() => {
            router.back();
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </div>
      <div className="w-full px-12">
        <div className="text-4xl font-semibold">Create Event</div>
      </div>
      <div className="flex flex-col w-full h-2/3 pb-12 pt-6 px-12 rounded-lg bg-neutral-100 gap-6">
        <div className="space-y-3">
          <div className="text-xl font-semibold">Title</div>
          <input type="text" className="w-1/2 py-1.5 px-2 rounded-lg" />
        </div>
        <div className="space-y-3">
          <div className="text-xl font-semibold">Select dates</div>
          <div className="w-2/5 bg-white"></div>
        </div>
      </div>
    </div>
  );
}
