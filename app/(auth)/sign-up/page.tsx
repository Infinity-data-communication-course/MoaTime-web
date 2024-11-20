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
        <Image src="/logo.png" width={300} height={60} alt="logo" />
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

        {/* <form className="flex flex-col justify-center items-center w-full gap-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full outline-none border-black border-4 rounded-xl px-2 py-1.5"
          />
          <input
            type="password"
            placeholder="Password"
            minLength={4}
            className="w-full border-black outline-none border-4 rounded-xl px-2 py-1.5"
          />
          <button className="bg-black w-full text-white rounded-xl py-2.5 mt-3">
            {pending ? "Loading..." : "Login"}
          </button>
        </form> */}
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

// "use client";
// import { useFormStatus } from "react-dom";

// export default function Home() {
//   const { pending } = useFormStatus();
//   return (
//     <div className="w-full h-full flex flex-col justify-center items-center gap-6">
//       <div className="font-semibold text-2xl">SignUp</div>
//       <form className="flex flex-col justify-center items-center w-full gap-3">
//         <input
//           type="email"
//           placeholder="Email"
//           className="bg-yellow-100 px-2 py-1"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="bg-yellow-100 px-2 py-1"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="bg-yellow-100 px-2 py-1"
//         />
//         <input
//           type="text"
//           placeholder="Name"
//           className="bg-yellow-100 px-2 py-1"
//         />
//         <button className="bg-gray-400 px-6 py-1">
//           {pending ? "Loading..." : "Sign Up"}
//         </button>
//       </form>
//     </div>
//   );
// }
