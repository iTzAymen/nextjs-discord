import NextAuth from "next-auth";
import { UID } from "./app/types/data";

declare module "next-auth" {
  interface Session {
    user: {
      id: UID;
    } & DefaultSession["user"];
  }
}
