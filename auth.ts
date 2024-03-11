import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { ServerInfo, UID, User } from "./app/types/data";
import { UserInServer, fetchServer, fetchUserByEmail } from "./app/data/data";

async function getUser(email: string): Promise<User | undefined> {
  try {
    return await fetchUserByEmail(email);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = password === user.password;
          console.log("authenticating", user);
          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");

        return null;
      },
    }),
  ],
});
