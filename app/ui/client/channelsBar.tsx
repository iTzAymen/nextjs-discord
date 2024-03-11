"use client";

import chevronDown from "@/public/chevron-down.svg";
import Image from "next/image";
import { ChannelGroup, ChannelInfo, UID, User } from "@/app/types/data";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

export function ChannelButton(props: {
  channelData: ChannelInfo;
  selectedChannel: UID;
  key: any;
}) {
  const selectedChannel = props.selectedChannel;
  const { id, serverId, name } = props.channelData;

  return (
    <Link
      key={props.key}
      href={`/server/${serverId}/${id}`}
      className={`h-[32px] bg-[#404249] rounded-[5px] flex hover:text-[#D7DADD] ${selectedChannel == id ? "!bg-opacity-100 !text-white" : "bg-opacity-0 text-[#8E9297] hover:bg-[#36373D]"} cursor-pointer transition-all`}
    >
      <div className="channel-hashtag ms-[10px] text-[#8E9297] select-none">
        #
      </div>
      <div className={`channel-name ms-[8px] select-none`}>{name}</div>
    </Link>
  );
}

export function LoadingChannelButton() {
  return (
    <div
      className={`h-[32px] bg-[#404249] rounded-[5px] flex bg-opacity-0 text-[#8E9297] transition-all`}
    >
      <div className="channel-hashtag ms-[10px] text-[#8E9297] select-none">
        #
      </div>
      <div className={`channel-name ms-[8px] select-none`}>
        <div className="bg-[#3B3D42] h-[16px] w-[120px] rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}

export function GroupButton(props: {
  name: string;
  closed: boolean;
  setClosed: Dispatch<SetStateAction<boolean>>;
}) {
  const { name, closed, setClosed } = props;
  const toggleClosed = () => {
    setClosed(!closed);
  };
  return (
    <div
      className="flex px-[5px] gap-[5px] text-[#8E9297] hover:text-[#D1D4D7] cursor-pointer transition-all"
      onClick={toggleClosed}
    >
      <Image
        className={`${closed ? "-rotate-90" : "rotate-0"} transition-all`}
        src={chevronDown}
        alt="dropdown"
      />
      <div className="w-full channels-bar-text select-none">{name}</div>
    </div>
  );
}

export function ChannelGroupSkeleton() {
  return (
    <div>
      <div className="w-full channels-bar-text select-none">
        <div className="bg-[#3B3D42] ml-[14px] h-[12px] w-[120px] rounded-full animate-pulse"></div>
      </div>
      <div className={`w-full p-[6px] pl-[8px] pr-0 gap-[3px] flex flex-col`}>
        <LoadingChannelButton></LoadingChannelButton>
        <LoadingChannelButton></LoadingChannelButton>
      </div>
    </div>
  );
}

export function ChannelGroupComponent(props: {
  groupData: ChannelGroup;
  children: JSX.Element[];
}) {
  const [closed, setClosed] = useState(false);

  return (
    <div>
      <GroupButton
        name={props.groupData.name}
        closed={closed}
        setClosed={setClosed}
      ></GroupButton>
      <div
        className={`w-full p-[6px] pl-[8px] pr-0 gap-[3px] ${closed ? "hidden" : "flex flex-col"}`}
      >
        {props.children}
      </div>
    </div>
  );
}

export function UserInfo({ userData }: { userData: User }) {
  return (
    <div className="h-[53px] w-full bg-[#232428] mt-auto py-[10px] px-[8px] flex gap-[8px]">
      <div
        id="profile-pic"
        className="relative h-[32px] w-[32px] aspect-square rounded-full cursor-pointer"
        style={{ backgroundColor: userData.color }}
      >
        <div
          id="status"
          className="absolute bottom-0 right-0 translate-x-[3px] translate-y-[3px] h-[16px] w-[16px] aspect-square rounded-full border-[3px] border-[#232428]"
          style={{
            backgroundColor:
              userData.status == "active" ? "#23A55A" : "#80848E",
          }}
        ></div>
      </div>
      <div className="flex-grow h-full">
        <div className="text-white user-info-name hover:underline cursor-pointer">
          {userData.username}
        </div>
        <div className="text-[#C7C9CB] user-info-tag">
          {userData.username + "#" + userData.usertag}
        </div>
      </div>
    </div>
  );
}
