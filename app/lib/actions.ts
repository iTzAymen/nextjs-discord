"use server";

import { sendMessage, sendDirectMessage } from "@/app/data/data";
import { UID } from "../types/data";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export async function sendMessageAction(
  senderId: UID,
  channelId: UID,
  message: string
) {
  await sendMessage(senderId, channelId, message);
  revalidatePath("/server/[serverId]/[channelId]", "page");
  console.log("revalidated");
}

export async function sendDirectMessageAction(
  senderId: UID,
  receiverId: UID,
  message: string
) {
  await sendDirectMessage(senderId, receiverId, message);
  revalidatePath("/direct/[receiverId]/", "page");
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
