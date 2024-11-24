"use client";
import Input from "@/components/input";
import Image from "next/image";
import Link from "next/link";
import { useActionState } from "react";
import { createAccount } from "./actions";
import Button from "@/components/button";

export default function SignUp() {
  const [state, dispatch] = useActionState(createAccount, null);

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
        <form action={dispatch} className="flex flex-col gap-3 w-full">
          <Input
            name="username"
            type="text"
            placeholder="Username"
            required
            errors={state?.fieldErrors.username}
            minLength={3}
            maxLength={10}
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            required
            errors={state?.fieldErrors.email}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            minLength={4}
            required
            errors={state?.fieldErrors.password}
          />
          <Input
            name="confirm_password"
            type="password"
            placeholder="Confirm Password"
            required
            minLength={4}
            errors={state?.fieldErrors.confirm_password}
          />
          <Button text="Create account" />
        </form>
        <div className="w-full text-center text-gray-500">
          Already have a MoaTime account?{" "}
          <Link
            href="/login"
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
