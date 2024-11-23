"use client";

import { DateCalendar } from "@mui/x-date-pickers";
import { useRouter } from "next/navigation";

export default function CreateEvent() {
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
        <div className="text-3xl font-semibold">Create Event</div>
      </div>
      <div className="flex flex-col w-full h-4/5 pb-12 pt-6 px-12 rounded-lg bg-neutral-100 gap-6">
        <div className="space-y-3">
          <div className="text-xl font-semibold">Title</div>
          <input type="text" className="w-1/2 py-1.5 px-2 rounded-lg" />
        </div>
        <div className="flex-row flex justify-between gap-3">
          <div className="space-y-3 flex-1">
            <div className="text-xl font-semibold">Select dates</div>
            <div className="h-72 bg-white rounded-lg">
            </div>
          </div>
          <div className="space-y-3 flex-1">
            <div className="text-xl font-semibold">Select times</div>
            <div className="h-44 bg-white rounded-lg"></div>
          </div>
        </div>
        <div className="w-full flex flex-row justify-end">
          <button className="px-3 py-1 rounded-lg bg-neutral-300 font-semibold">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
