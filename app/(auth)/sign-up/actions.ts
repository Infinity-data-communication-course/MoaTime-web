import {
  PASSWORD_MIN_LENGTH,
  // PASSWORD_REGEX,
  // PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { z } from "zod";
import { redirect } from "next/navigation";
import callAPI from "@/lib/call-api";

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "Username doesn't exist!",
      })
      .toLowerCase()
      .trim(),
    email: z.string().email().toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    //.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ email }, ctx) => {
    const res = await callAPI({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/user/check-email`!,
      method: "POST",
      body: { email },
      isPrivate: false,
    });
    const data = await res.json();

    if (data) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) { //eslint-disable-line
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {

    return result.error.flatten();
  } else {
    const res = await callAPI({
      url: `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/sign-up`!,
      method: "POST",
      body: {
        email: result.data.email,
        password: result.data.password,
        name: result.data.username,
      },
      isPrivate: false,
    });
    const data = await res.json();

    if (data.accessToken) {
      redirect("/login");
    }
  }
}
