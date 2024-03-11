import { UID } from "@/app/types/data";
import ChannelsBar from "@/app/ui/server/channelsBar";
import { ChatBox } from "@/app/ui/server/chatBox";
import { ChatBoxSkeleton } from "@/app/ui/client/chatbox";
import { fetchServer, fetchUser, read_messages } from "@/app/data/data";
import { Suspense } from "react";

export default async function Server({
  params,
}: {
  params: { serverId: UID; channelId: UID };
}) {
  const channelId = params.channelId;
  const userData = await fetchUser("1"); // to be replaced with a real user id

  // console.log(await read_messages(channelId));

  return (
    <Suspense
      fallback={<ChatBoxSkeleton channelId={channelId} userData={userData} />}
    >
      <ChatBox channelId={channelId} userData={userData} />
    </Suspense>
  );
}
