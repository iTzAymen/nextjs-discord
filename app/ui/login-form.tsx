"use client";

import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "../lib/actions";
import clsx from "clsx";
import { ThreeDotsLoader } from "./loaders";

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form
      action={dispatch}
      className="w-[785px] min-h-[409px] bg-[#313338] rounded-md py-[34px] px-[32px] flex flex-row justify-between gap-16"
    >
      <div className="">
        <h1 className="text-[25px] text-center">Welcome back!</h1>
        <h2 className="text-[16px] text-center text-[#949BA4]">
          We’re so excited to see you again!
        </h2>
        <div className="w-full mt-[19px] flex flex-col gap-[19px]">
          <div>
            <label
              className={clsx(
                "text-[12.7px]",
                errorMessage ? "text-[#FA777C]" : "text-[#B1B5BC]"
              )}
              htmlFor="email"
            >
              EMAIL OR PHONE NUMBER{" "}
              <p
                className={clsx(
                  "text-[#D83D41]",
                  errorMessage ? "hidden" : "inline"
                )}
              >
                *
              </p>
              <p className={clsx("italic", errorMessage ? "inline" : "hidden")}>
                - Login or password is invalid
              </p>
            </label>
            <div className="relative mt-2">
              <input
                className="bg-[#1E1F22] rounded-[4px] w-[415px] h-[41px] text-[16px] px-[10px] outline-none text-white placeholder:text-[#4D5156] autofill:bg-[#E8F0FE] autofill:text-black"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>
          <div>
            <label
              className={clsx(
                "text-[12.7px]",
                errorMessage ? "text-[#FA777C]" : "text-[#B1B5BC]"
              )}
              htmlFor="password"
            >
              PASSWORD{" "}
              <p
                className={clsx(
                  "text-[#D83D41]",
                  errorMessage ? "hidden" : "inline"
                )}
              >
                *
              </p>
              <p className={clsx("italic", errorMessage ? "inline" : "hidden")}>
                - Login or password is invalid
              </p>
            </label>
            <div className="relative mt-2">
              <input
                className="bg-[#1E1F22] rounded-[4px] w-[415px] h-[41px] text-[16px] px-[10px] outline-none text-white placeholder:text-[#4D5156] autofill:bg-[#E8F0FE] autofill:text-black"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
            </div>
            <button
              type="button"
              className="text-[#00A8FC] text-[14.5px] hover:underline mt-1"
            >
              Forgot your password?
            </button>
          </div>
        </div>
        <LoginButton />
        <div className="text-[14.5px] text-[#949BA4] mt-[9px]">
          Need an account?{" "}
          <button type="button" className="text-[#00A8FC] hover:underline">
            Register
          </button>
        </div>
      </div>
      <QrCode />
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="bg-[#5865F2] hover:bg-[#4752C4] text-[17px] w-full h-[44px] rounded-[4px] mt-[21px] flex align-middle"
      aria-disabled={pending}
    >
      {!pending ? (
        <div className="mx-auto my-auto">Log in</div>
      ) : (
        <ThreeDotsLoader />
      )}
    </button>
  );
}

function QrCode() {
  return (
    <div className="flex flex-col items-center justify-evenly">
      <div className="w-[177px] h-[177px] bg-white opacity-5 rounded-md"></div>
      <div>
        <h1 className="text-[25px] text-center">Log in with QR Code</h1>
        <h2 className="text-[16px] text-center text-[#949BA4]">
          Scan this with the <div className="inline">Discord mobile app</div> to
          log in instantly
        </h2>
      </div>
    </div>
  );
}
