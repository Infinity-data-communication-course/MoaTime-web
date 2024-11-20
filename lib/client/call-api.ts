export default async function callAPI({
  url,
  method,
  body,
  isPrivate,
  accessToken,
}: {
  url: string;
  method: string;
  body?: object;
  isPrivate: boolean;
  accessToken?: string;
}) {
  const res = await fetch(url, {
    credentials: "include",
    method: method,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: isPrivate ? `Bearer: ${accessToken}` : "",
    },
  });
  return res;
}
