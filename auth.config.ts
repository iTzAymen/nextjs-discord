import type { NextAuthConfig, User } from "next-auth";
import {
  UserInServer,
  fetchChannelGroupList,
  fetchServerList,
} from "./app/data/data";
import { NextURL } from "next/dist/server/web/next-url";

function RedirectHome(nextUrl: NextURL) {
  return Response.redirect(new URL("/server", nextUrl));
}

function AuthLogin(user: User, nextUrl: NextURL) {
  const isLoggedIn = !!user;
  const isInLogin = nextUrl.pathname.startsWith("/login");
  if (!isInLogin && !isLoggedIn) {
    // Redirect unauthenticated users to login page
    return false;
  } else if (isInLogin && isLoggedIn) {
    // Redirect authenticated users to server page
    return Response.redirect(new URL("/server", nextUrl));
  }
  return null;
}

async function AuthServer(user: User, nextUrl: NextURL) {
  const [_, serverId, channelId] = nextUrl.pathname
    .replace("/server", "")
    .split("/");

  console.log(`ServerId: ${serverId} | ChannelId: ${channelId}`);

  const userId = user?.id;
  if (!userId) {
    // redirect to login
    const redirectUrl = new URL("api/auth/signin", nextUrl.origin);
    redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
    console.log("no user active, redirecting to ", redirectUrl);
    return Response.redirect(redirectUrl);
  }

  if (!serverId) {
    // no server selected, redirect to default screen (where it shows friends), for now redirect to first found server
    const serverList = await fetchServerList(userId);
    const first_server = serverList[0]?.id;
    if (first_server) {
      const new_url = `/server/${first_server}`;
      console.log("no server selected, redirecting to ", new_url);
      return Response.redirect(new URL(new_url, nextUrl));
    }
  } else {
    // check server authorization
    const HasAccess = await UserInServer(userId, serverId);
    if (!HasAccess) {
      // Redirect unauthorized users to server page
      const new_url = `/server`;
      console.log("server unauthorized, redirecting to ", new_url);
      return Response.redirect(new URL(new_url, nextUrl));
    }
  }

  if (!channelId) {
    // no channel selected, redirect to first channel found

    const channelGroupList = await fetchChannelGroupList(serverId);
    const first_group = channelGroupList[0];
    const first_channel = first_group?.channels[0];
    if (first_channel) {
      const new_url = `/server/${serverId}/${first_channel}`;
      console.log("no channel selected, redirecting to ", new_url);
      return Response.redirect(new URL(new_url, nextUrl));
    }
  }

  return null;
}

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user;
      let res;

      // authorize login
      res = AuthLogin(user, nextUrl);
      if (res) return res;

      // authorize server
      const isInServer = nextUrl.pathname.startsWith("/server");
      if (user && isInServer) {
        res = await AuthServer(user, nextUrl);
        if (res) return res;
      }

      const isInHome = nextUrl.pathname == "/";
      if (user && isInHome) {
        return RedirectHome(nextUrl);
      }

      return true;
    },
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;

      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
