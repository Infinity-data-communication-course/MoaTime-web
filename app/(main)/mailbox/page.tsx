"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MailBox() {
  const router = useRouter();
  const [filter, setFilter] = useState<"PENDING" | "JOINED" | "REFUSED">(
    "PENDING"
  );

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
        <div className="text-4xl font-semibold">Mail Box</div>
      </div>
      <div className="flex flex-col w-full h-2/3 pb-12 pt-6 px-12 rounded-lg bg-neutral-100 gap-6">
        <div className="flex flex-row space-x-4 *:rounded-lg *:cursor-pointer *:px-3 *:py-1 *:text-gray-700">
          <div
            className={`${
              filter === "PENDING" ? "bg-yellow-300 " : "bg-neutral-300"
            }`}
            onClick={() => {
              setFilter("PENDING");
            }}
          >
            Pending
          </div>
          <div
            className={`${
              filter === "JOINED" ? "bg-green-300" : "bg-neutral-300"
            }`}
            onClick={() => {
              setFilter("JOINED");
            }}
          >
            Joined
          </div>
          <div
            className={`${
              filter === "REFUSED" ? "bg-red-300" : "bg-neutral-300"
            }`}
            onClick={() => {
              setFilter("REFUSED");
            }}
          >
            Refused
          </div>
        </div>
        <div className="space-y-8 overflow-y-scroll">
          {[1, 1, 1, 1, 1, 1, 1, 1].map((item, idx) => (
            <div
              key={idx}
              className="w-full bg-neutral-200 rounded-lg h-24 px-6 flex flex-row justify-between items-center"
            >
              <div className="flex flex-col ">
                <span className="text-2xl font-semibold">Event title</span>
                <span>host: lalallala</span>
              </div>
              <div className="flex fle-row gap-3">
                {filter === "PENDING" ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-8 cursor-pointer hover:text-green-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-8 cursor-pointer hover:text-red-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </>
                ) : null}
                <svg
                  data-slot="icon"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="size-8 cursor-pointer hover:text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  ></path>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
