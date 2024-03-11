import {
  fetchChannel,
  fetchUser,
  fetchMessageList,
  fetchDirectMessageList,
} from "@/app/data/data";
import { ChannelInfo, Message, UID, User } from "../../types/data";
import {
  MessageSkeleton,
  MessageInput,
  ChatBox as ClientChatBox,
} from "../client/chatbox";
import { Suspense } from "react";

async function MessageBox({ data }: { data: Message }) {
  const { senderId, time, message } = data;

  const senderData = await fetchUser(senderId);

  return (
    <div className="w-full bg-[#2E3035] bg-opacity-0 hover:bg-[#2E3035] flex py-[4px] px-[16px] first:mt-auto">
      <div
        id="profile-pic"
        className={`relative h-[41px] w-[41px] aspect-square rounded-full cursor-pointer`}
        style={{ backgroundColor: senderData.color || "#3E4046" }}
      ></div>
      <div className="ms-[15px]">
        <div className="flex">
          {senderData.username && (
            <h1
              className="message-text hover:underline select-none cursor-pointer"
              style={{ color: senderData.color }}
            >
              {senderData.username}
            </h1>
          )}
          {senderData.username == null && (
            <div className="flex">
              <div className="bg-[#3E4046] h-[17px] w-[106px] mt-[2px] mb-[1px] rounded-full animate-pulse"></div>
            </div>
          )}
          <p className="message-time text-[#949BA4] ms-[7px] cursor-default">
            {time}
          </p>
        </div>
        {message && <p className="message-text">{message}</p>}
        {message == null && <MessageSkeleton />}
      </div>
    </div>
  );
}

async function ChatBoxWrapper(props: {
  userData: User;
  channelId?: UID;
  receiverId?: UID;
}) {
  const { userData, channelId, receiverId } = props;

  const messages: Message[] = channelId
    ? await fetchMessageList(channelId)
    : receiverId
      ? await fetchDirectMessageList(userData.id, receiverId)
      : [];

  console.log("from component:", messages);

  return (
    <ClientChatBox userData={userData} channelId={channelId}>
      {messages.map((messageData: Message, index: number) => (
        <MessageBox key={index} data={messageData} />
      ))}
    </ClientChatBox>
  );
}

function ChannelNameSkeleton() {
  return (
    <div className={`h-[47px] min-h-[47px] flex border-b border-[#26282C]`}>
      <div className="active-channel-hashtag ms-[18px] text-[#8E9297] select-none">
        #
      </div>
      <div className={`active-channel-name ms-[10.5px] select-none`}>
        <div className="bg-[#3B3D42] h-[17px] w-[80px] rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}

async function ChannelName(props: { channelId: UID }) {
  const { channelId } = props;

  const channelData: ChannelInfo = await fetchChannel(channelId);

  return (
    <div className={`h-[47px] min-h-[47px] flex border-b border-[#26282C]`}>
      <div className="active-channel-hashtag ms-[18px] text-[#8E9297] select-none">
        #
      </div>
      <div className={`active-channel-name ms-[10.5px] select-none`}>
        {channelData.name}
      </div>
    </div>
  );
}

async function DirectMessageNameSkeleton() {
  return (
    <div className={`h-[47px] min-h-[47px] flex border-b border-[#26282C]`}>
      <div
        id="profile-pic"
        className={`relative h-[26px] w-[26px] ms-[15px] mt-[10px] aspect-square rounded-full cursor-pointer`}
        style={{ backgroundColor: "#3B3D42" }}
      >
        <div
          id="status"
          className="absolute bottom-0 right-0 translate-x-[2px] translate-y-[2px] h-[14px] w-[14px] aspect-square rounded-full border-[3px] border-[#313338]"
          style={{ backgroundColor: "#80848E" }}
        ></div>
      </div>
      <div className={`active-channel-name ms-[10.5px] select-none`}>
        <div className="bg-[#3B3D42] h-[17px] w-[80px] rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}

async function DirectMessageName(props: { receiverId: UID }) {
  const { receiverId } = props;

  const receiverData = await fetchUser(receiverId);

  return (
    <div className={`h-[47px] min-h-[47px] flex border-b border-[#26282C]`}>
      <div
        id="profile-pic"
        className={`relative h-[26px] w-[26px] ms-[15px] mt-[10px] aspect-square rounded-full cursor-pointer`}
        style={{ backgroundColor: receiverData.color }}
      >
        <div
          id="status"
          className="absolute bottom-0 right-0 translate-x-[2px] translate-y-[2px] h-[14px] w-[14px] aspect-square rounded-full border-[3px] border-[#313338]"
          style={{
            backgroundColor:
              receiverData.status == "active" ? "#23A55A" : "#80848E",
          }}
        ></div>
      </div>
      <div className={`active-channel-name ms-[10.5px] select-none`}>
        {receiverData.username}
      </div>
    </div>
  );
}

export async function ChatBox(props: { channelId: UID; userData: User }) {
  const { channelId, userData } = props;

  return (
    <div className="h-full bg-[#313338] flex-grow flex flex-col">
      <Suspense fallback={<ChannelNameSkeleton />}>
        <ChannelName channelId={channelId} />
      </Suspense>
      <ChatBoxWrapper userData={userData} channelId={channelId} />
    </div>
  );
}

export async function DirectMessageChatBox(props: {
  receiverId: UID;
  userData: User;
}) {
  const { receiverId, userData } = props;

  return (
    <div className="h-full bg-[#313338] flex-grow flex flex-col">
      <Suspense fallback={<DirectMessageNameSkeleton />}>
        <DirectMessageName receiverId={receiverId} />
      </Suspense>
      <ChatBoxWrapper userData={userData} receiverId={receiverId} />
    </div>
  );
}
