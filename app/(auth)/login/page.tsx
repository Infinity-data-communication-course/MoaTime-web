"use client";

import Image from "next/image";
import Link from "next/link";
import { logIn } from "./actions";
import FormInput from "@/components/input";
import FormButton from "@/components/button";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { useActionState } from "react";

export default function LogIn() {
  const [state, dispatch] = useActionState(logIn, null);

  return (
    <div className="h-full w-full flex justify-center items-center flex-col gap-8">
      <div>
        <Image
          src="/logo.png"
          width={300}
          height={60}
          alt="logo"
          priority={true}
        />
      </div>
      <div className="flex justify-center items-center flex-col space-y-4">
        <form action={dispatch} className="flex flex-col gap-3 w-full px-4">
          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            required
            errors={state?.fieldErrors.email}
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            required
            minLength={PASSWORD_MIN_LENGTH}
            errors={state?.fieldErrors.password}
          />
          <FormButton text="Log in" />
        </form>
        <div className="w-full text-center text-gray-500">
          Don&apos;t have a MoaTime account?{" "}
          <Link
            href="/sign-up"
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}
