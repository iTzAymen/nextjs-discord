import { Suspense } from "react";
import { fetchChannelGroupList, fetchChannelList } from "@/app/data/data";
import {
  ChannelGroup,
  ChannelInfo,
  ServerInfo,
  UID,
  User,
} from "../../types/data";
import {
  ChannelButton,
  ChannelGroupSkeleton,
  ChannelGroupComponent as ClientChannelGroupComponent,
  UserInfo,
} from "../client/channelsBar";
import { redirect } from "next/navigation";

async function ChannelGroupComponent(props: {
  groupData: ChannelGroup;
  selectedChannel: UID;
  key: any;
}) {
  const selectedChannel = props.selectedChannel;

  const channelsList = await fetchChannelList(props.groupData.id);

  return (
    <ClientChannelGroupComponent groupData={props.groupData} key={props.key}>
      {channelsList.map((channelData: ChannelInfo) => {
        return (
          <ChannelButton
            key={channelData.id}
            channelData={channelData}
            selectedChannel={selectedChannel}
          ></ChannelButton>
        );
      })}
    </ClientChannelGroupComponent>
  );
}

export default async function ChannelsBar(props: {
  serverData: ServerInfo;
  userData: User;
  selectedChannel: UID;
}) {
  const { serverData, userData, selectedChannel } = props;

  const channelGroupList = await fetchChannelGroupList(serverData.id);

  return (
    <div className="h-full w-[240px] min-w-[240px] flex flex-col bg-[#2B2D31] rounded-tl-[7px]">
      <div className="w-full h-[50px] py-[14px] px-[16px] border-b border-[#1F2124] server-name">
        {serverData ? (
          serverData.serverName
        ) : (
          <div className="bg-[#3B3D42] h-[16px] w-[80px] rounded-full animate-pulse"></div>
        )}
      </div>
      <div className="channel-bar w-full h-full overflow-y-scroll scroll flex flex-col pt-[16px] gap-[10px]">
        {channelGroupList &&
          channelGroupList.map((groupData: ChannelGroup) => {
            return (
              <Suspense fallback={<ChannelGroupSkeleton />} key={groupData.id}>
                <ChannelGroupComponent
                  key={groupData.id}
                  groupData={groupData}
                  selectedChannel={selectedChannel}
                ></ChannelGroupComponent>
              </Suspense>
            );
          })}
      </div>
      <UserInfo userData={userData}></UserInfo>
    </div>
  );
}
