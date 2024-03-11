import { UID } from "@/app/types/data";
import ChannelsBar from "@/app/ui/server/channelsBar";
import { fetchServer, fetchUser } from "@/app/data/data";

export default async function Server({
  params,
  children,
}: {
  params: { serverId: UID; channelId: UID };
  children: React.ReactNode;
}) {
  const serverId = params.serverId;
  const serverData = await fetchServer(serverId);

  const userData = await fetchUser("1"); // to be replaced with a real user id

  const channelId = params.channelId;
  return (
    <>
      <ChannelsBar
        serverData={serverData}
        selectedChannel={channelId}
        userData={userData}
      ></ChannelsBar>
      {children}
    </>
  );
}
