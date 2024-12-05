"use client";

import callAPI from "@/lib/call-api";
import getToken from "@/lib/get-token";
import { EventDetailData } from "@/lib/type/event-detail-data.type";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Event() {
  const router = useRouter();
  const pathname = usePathname();

  const [token, setToken] = useState<string>("");
  const [eventDetail, setEventDetail] = useState<EventDetailData>();
  const [myId, setMyId] = useState<number>();
  const [times, setTimes] = useState<number[]>([]);
  const [email, setEmail] = useState<string>("");
  const [inviteError, setInviteError] = useState<string>("");
  

  type AvailableTime = {
    date: string; // ISO 문자열
    startTime: number;
    endTime: number;
  };
  
  

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await getToken();

      async function geteventDetail(accessToken: string, eventId: number) {
        return callAPI({
          url: `${process.env.NEXT_PUBLIC_SERVER_URL}/event/${eventId}/detail`!,
          method: "GET",
          isPrivate: true,
          accessToken,
        });
      }

      async function getMyId(accessToken: string) {
        return await (
          await callAPI({
            url: `${process.env.NEXT_PUBLIC_SERVER_URL}/user`!,
            method: "GET",
            isPrivate: true,
            accessToken,
          })
        ).json();
      }

      if (accessToken) {
        setToken(accessToken);

        const idRes = await getMyId(accessToken);
        setMyId(idRes.id);

        const pattern = /\/event\/(\d+)/;
        const match = pathname.match(pattern);
        if (match) {
          const eventId = +match[1];
          const res = await geteventDetail(accessToken, eventId);
          const data = await res.json();

          if (res.status === 404) {
            alert("The event does not exist.");
            router.push("/board");
          } else if (res.status === 403) {
            alert("Only participating users can check the event in detail.");
            router.push("/board");
          } else {
            for (let i = 0; i < data.dates.length - 1; i++) {
              data.dates[i] = new Date(data.dates[i]);
            }

            data.dates.sort((a: Date, b: Date) => a.valueOf() - b.valueOf());

            setEventDetail(data);
          }

          const timeArray = [];
          for (let i = data.startTime; i < data.endTime; i++) {
            timeArray.push(i);
          }
          setTimes(timeArray);
        } else {
          alert("Cannot found eventId");
          redirect("/board");
        }
      } else {
        redirect("/login");
      }
    };

    fetchToken();
  }, [pathname, router]);

  const [selectedSlots, setSelectedSlots] = useState<{ [key: string]: boolean }>({});
  const [isDragging, setIsDragging] = useState(false);
  
  const handleMouseDown = (date: Date, time: number) => {
    const slotKey = `${date}-${time}`; // key
    setIsDragging(true);
    setSelectedSlots((prev) => ({
      ...prev,
      [slotKey]: !prev[slotKey], // reverse current state
    }));
  };
  
  const handleMouseEnter = (date: Date, time: number) => {
    if (isDragging) {
      const slotKey = `${date}-${time}`;
      setSelectedSlots((prev) => ({
        ...prev,
        [slotKey]: !prev[slotKey],
      }));
    }
  };

  
  const transformSelectedSlotsToPayload = (slots: { [key: string]: boolean }): AvailableTime[] => {
    const groupedByDate: { [key: string]: number[] } = {};
  
    Object.entries(slots).forEach(([key, value]) => {
      if (value) {
        const [date, timeSlot] = key.split('-');
        if (!groupedByDate[date]) groupedByDate[date] = [];
        groupedByDate[date].push(Number(timeSlot));
      }
    });
  
    const availableTimes: AvailableTime[] = [];
    Object.entries(groupedByDate).forEach(([date, times]) => {
      times.sort((a, b) => a - b);
      let startTime = times[0];
      for (let i = 1; i <= times.length; i++) {
        if (i === times.length || times[i] !== times[i - 1] + 1) {
          availableTimes.push({
            date: new Date(date).toISOString(),
            startTime,
            endTime: times[i - 1] + 1,
          });
          startTime = times[i];
        }
      }
    });
  
    return availableTimes;
  };
  
  const handleMouseUp = async () => {
    setIsDragging(false);
  
    const transformedData = transformSelectedSlotsToPayload(selectedSlots);
  
    const accessToken = await getToken();
  
    try {
      const response = await callAPI({
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/event/${eventDetail!.id}/available-time`,
        method: "POST",
        body: { availableTimes: transformedData },
        isPrivate: true,
        accessToken,
      });
  
      console.log("가능 시간이 성공적으로 업데이트되었습니다:", response);
    } catch (error) {
      console.error("가능 시간 업데이트 중 오류 발생:", error);
    }
  };
  
  
  
  
  useEffect(() => {
    const handleDocumentMouseUp = () => {
      setIsDragging(false);
    };
  
    document.addEventListener("mouseup", handleDocumentMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleDocumentMouseUp);
    };
  }, []);
  
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
            router.push("/board");
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
        <div className="text-3xl font-semibold">{eventDetail?.title}</div>
      </div>
      <div className="flex flex-col w-full min-h-fit pb-12 pt-6 px-12 rounded-lg bg-neutral-100 gap-6">
        {eventDetail?.hostId === myId ? (
          <div className="space-y-2">
            <div className="text-xl font-semibold">Invite members</div>
            <div className="flex flex-row space-x-2">
              <input
                type="email"
                placeholder="Email"
                value={email}
                maxLength={30}
                className="w-60 py-1.5 px-2 rounded-lg"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="bg-green-500 px-3 rounded-lg text-white"
                onClick={async () => {
                  const emailRegex = /[A-Za-z0-9]+@([a-z]+\.){1,2}[a-z]{2,}/;
                  if (!emailRegex.test(email)) {
                    setInviteError("Please enter an email.");
                    return;
                  }

                  const res = await callAPI({
                    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/event/${
                      eventDetail!.id
                    }/invite`,
                    method: "POST",
                    body: {
                      email,
                    },
                    isPrivate: true,
                    accessToken: token,
                  });

                  if (res.status === 204) {
                    setEmail("");
                  } else if (res.status === 403)
                    setInviteError(
                      "Only host in the event can invite someone."
                    );
                  else if (res.status === 404)
                    setInviteError(
                      "Either the user or the event does not exist."
                    );
                  else if (res.status === 409)
                    setInviteError("The user was already invited.");
                }}
              >
                Invite
              </button>
            </div>
            <div className="text-red-600 pl-2">{inviteError}</div>
          </div>
        ) : null}
        <div className="flex flex-row space-x-4">
          <div className="flex-1 space-y-2 w-1/2">
            <div className="text-xl font-semibold">Your schedule</div>
            <div className="flex flex-row">
              <div className="flex flex-col text-right w-16 text-sm select-none">
                <div className="h-12" />
                {times.map((time, idx) => (
                  <div key={idx} className="h-10 pr-1">{`${time} ${
                    time < 12 ? "AM" : "PM"
                  }`}</div>
                ))}
              </div>
              <div className="flex flex-row overflow-x-scroll">
                {eventDetail?.dates.map((d, dateIdx) => {
                  const date = new Date(d); // 날짜를 'YYYY-MM-DD' 형식으로
                  return (
                    <div key={dateIdx} className="flex flex-col">
                      <div className="h-12 w-11 text-center select-none">
                        <div className="text-sm">
                          {new Date(d).toLocaleString("default", { month: "long" }).slice(0, 3)}
                        </div>
                        <div className="text-lg">{new Date(d).getDate()}</div>
                      </div>
                      {times.map((time, timeIdx) => {
                        const slotKey = `${date}-${time}`;
                        return (
                          <div
                            key={timeIdx}
                            className={`h-10 border-2 ${selectedSlots[slotKey] ? "bg-green-300" : ""}`}
                            onMouseDown={() => handleMouseDown(date, time)}
                            onMouseUp={handleMouseUp}
                            onMouseEnter={() => handleMouseEnter(date, time)}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-2 w-1/2">
            <div className="text-xl font-semibold">Team&apos;s schedule</div>
            <div className="flex flex-row">
              <div className="flex flex-col text-right w-16 text-sm">
                <div className="h-12" />
                {times.map((time, idx) => (
                  <div key={idx} className="h-10 pr-1">{`${time} ${
                    time < 12 ? "AM" : "PM"
                  }`}</div>
                ))}
              </div>
              <div className="flex flex-row overflow-x-scroll">
                {eventDetail?.dates.map((d, idx) => {
                  const date = new Date(d);

                  return (
                    <div key={idx} className="flex flex-col">
                      <div className="h-12 w-11 *:text-center">
                        <div className="text-sm">
                          {`${date
                            .toLocaleString("default", { month: "long" })
                            .slice(0, 3)}`}
                        </div>
                        <div className="text-lg">{`${date.getDate()}`}</div>
                      </div>
                      {times.map((time, idx) => (
                        <div key={idx} className="h-10 border-2" />
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
