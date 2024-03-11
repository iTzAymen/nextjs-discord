export type HexColor = `#${string}`;
export type UID = string;

export type ServerInfo = {
  id: UID;
  serverName: string;
  backgroundColor: HexColor;
  groups: UID[];
  members: UID[];
};

export type ChannelGroup = {
  id: UID;
  serverId: UID;
  name: string;
  channels: UID[];
};

export type ChannelInfo = {
  id: UID;
  serverId: UID;
  groupId: UID;
  name: string;
};

export type User = {
  id: UID;
  email: string;
  password: string;
  username: string;
  usertag: string;
  color: HexColor;
  status: "active" | "inactive";
};

interface BaseMessage {
  senderId: UID;
  time: string;
  message: string;
}

export interface ServerMessage extends BaseMessage {
  channelId: UID;
}

export interface DirectMessage extends BaseMessage {
  receiverId: UID;
}

export type Message = ServerMessage | DirectMessage;

export type InputMessage =
  | Omit<ServerMessage, "message" | "time">
  | Omit<DirectMessage, "message" | "time">;
