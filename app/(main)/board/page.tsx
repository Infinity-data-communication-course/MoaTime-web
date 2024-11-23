"use client";

import callAPI from "@/lib/call-api";
import getToken from "@/lib/get-token";
import Image from "next/image";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Board() {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await getToken();

      if (accessToken) {
        setAccessToken(accessToken);
        console.log("토큰!!", accessToken);
      } else {
        redirect("/login");
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    async function getMyEvents(accessToken: string) {
      console.log("accessToken", accessToken);
      const res = await callAPI({
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/event/my`!,
        method: "GET",
        isPrivate: true,
        accessToken,
      });

      console.log("res", res);

      const resData = await res.json();

      console.log("resData", resData);
    }

    getMyEvents(accessToken);
  });

  return (
    <div className="h-full w-full flex items-center flex-col gap-8">
      <div className="w-full flex justify-center h-12">
        <Image
          src="/logo.png"
          width={240}
          height={64}
          alt="logo"
          priority={true}
          className="mr-auto"
        />
      </div>
      <div className="w-full flex flex-row justify-between px-12">
        <div className="text-3xl font-semibold">My Events</div>
        <div className="flex flex-row justify-between items-center gap-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-9 cursor-pointer"
            onClick={() => {
              router.push("/create-event");
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-9 cursor-pointer"
            onClick={() => {
              router.push("/mailbox");
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-9 cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5a5.49 5.49 0 0 0 4.294-2.063A4.997 4.997 0 0 0 8 9Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <div className="flex flex-col w-full h-4/5 py-12 px-12 rounded-lg bg-neutral-100">
        <div className="space-y-5 overflow-y-scroll">
          {[1, 1, 1, 1, 1, 1, 1, 1].map((item, idx) => (
            <div
              key={idx}
              className="w-full bg-neutral-200 cursor-pointer rounded-lg h-20 px-6 flex flex-row justify-between items-center"
              onClick={() => {
                router.push(`/event/${idx}`);
              }}
            >
              <div className="flex flex-col ">
                <span className="text-2xl font-semibold">Event title</span>
                <span>host: lalallala</span>
              </div>
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
          ))}
        </div>
      </div>
    </div>
  );
}
