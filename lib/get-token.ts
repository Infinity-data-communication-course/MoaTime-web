import callAPI from "./call-api";

export default async function getToken() {
  const res = await callAPI({
    url: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`!,
    method: "POST",
    isPrivate: false,
  });
  const resData = await res.json();

  return resData.accessToken;
}
