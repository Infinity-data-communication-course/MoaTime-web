import { z } from "zod";
import { redirect } from "next/navigation";
import callAPI from "@/lib/client/call-api";

const formSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z.string({
    required_error: "Password is required",
  }),
});

export async function logIn(prevState: any, formData: FormData) {  //eslint-disable-line
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const res = await callAPI({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`!,
      method: "POST",
      body: {
        email: result.data.email,
        password: result.data.password,
      },
      isPrivate: false,
    });
    console.log("res", res);
    const resData = await res.json();
    console.log("resData", resData);

    if (resData.statusCode === 404) {
      return {
        fieldErrors: {
          password: [],
          email: ["An account with this email does not exist."],
        },
      };
    } else if (resData.statusCode === 409) {
      return {
        fieldErrors: {
          password: ["Wrong password."],
          email: [],
        },
      };
    } else if (resData.accessToken) {
      redirect("/board");
    }
  }
}
