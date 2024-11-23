"use client";

import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  return (
    <div className="h-full w-full flex items-center flex-col gap-8">
      <div className="w-full">
        <svg
          data-slot="icon"
          fill="none"
          strokeWidth={1.5}
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="mr-auto cursor-pointer size-12"
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
        <div className="text-3xl font-semibold">Event Title</div>
      </div>
      <div className="flex flex-col w-full h-4/5 pb-12 pt-6 px-12 rounded-lg bg-neutral-100 gap-6"></div>
    </div>
  );
}
