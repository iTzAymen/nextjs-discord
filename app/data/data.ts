"use server";

import {
  ChannelGroup,
  ChannelInfo,
  DirectMessage,
  Message,
  ServerInfo,
  ServerMessage,
  UID,
  User,
} from "@/app/types/data";

let serverList: ServerInfo[] = [
  {
    id: "1",
    serverName: "bois",
    backgroundColor: "#CC99FF",
    groups: ["1"],
    members: ["1", "2"],
  },
  {
    id: "2",
    serverName: "work",
    backgroundColor: "#99C8FF",
    groups: ["2"],
    members: ["2", "3"],
  },
  {
    id: "3",
    serverName: "fun",
    backgroundColor: "#99FFB6",
    groups: ["3", "4"],
    members: ["3", "1"],
  },
];

let channelGroupList: ChannelGroup[] = [
  { id: "1", serverId: "1", name: "TEXT CHANNELS", channels: ["1", "2", "3"] },
  { id: "2", serverId: "2", name: "TEXT CHANNELS", channels: ["4", "5", "6"] },
  { id: "3", serverId: "3", name: "TEXT CHANNELS", channels: ["7", "8", "9"] },
  { id: "4", serverId: "3", name: "FUN CHANNELS", channels: ["10"] },
];

let channelList: ChannelInfo[] = [
  { id: "1", serverId: "1", groupId: "1", name: "welcome" },
  { id: "2", serverId: "1", groupId: "1", name: "general" },
  { id: "3", serverId: "1", groupId: "1", name: "bois-chat" },

  { id: "4", serverId: "2", groupId: "2", name: "welcome" },
  { id: "5", serverId: "2", groupId: "2", name: "general" },
  { id: "6", serverId: "2", groupId: "2", name: "work-chat" },

  { id: "7", serverId: "3", groupId: "3", name: "welcome" },
  { id: "8", serverId: "3", groupId: "3", name: "general" },
  { id: "9", serverId: "3", groupId: "3", name: "fun-chat" },
  { id: "10", serverId: "3", groupId: "4", name: "games-chat" },
];

let userList: User[] = [
  {
    id: "1",
    email: "aymen@gmail.com",
    password: "aymen123",
    username: "Aymen",
    usertag: "8038",
    color: "#FFEF99",
    status: "active",
  },
  {
    id: "2",
    email: "nadir@gmail.com",
    password: "nadir123",
    username: "nadir",
    usertag: "4190",
    color: "#CC99FF",
    status: "inactive",
  },
  {
    id: "3",
    email: "mohomesad@gmail.com",
    password: "mohomesad123",
    username: "Mohomesad",
    usertag: "0388",
    color: "#99FFB6",
    status: "active",
  },
];

let messageList: ServerMessage[] = [
  {
    senderId: "1",
    channelId: "1",
    time: "Today at 3:28 PM",
    message: "hello",
  },
  {
    senderId: "2",
    channelId: "1",
    time: "Today at 3:30 PM",
    message: "heyy",
  },
  {
    senderId: "2",
    channelId: "4",
    time: "Today at 3:30 PM",
    message: "welcome",
  },
];

let directMessageList: DirectMessage[] = [
  {
    senderId: "1",
    receiverId: "2",
    time: "Today at 3:28 PM",
    message: "sup",
  },
  {
    senderId: "2",
    receiverId: "1",
    time: "Today at 3:30 PM",
    message: "yo",
  },
  {
    senderId: "2",
    receiverId: "1",
    time: "Today at 3:30 PM",
    message: "goofy",
  },
];
const DELAY = 100;

export async function fetchServerList(userId: UID) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * DELAY));

  const serverData = serverList.filter((server) => {
    return server.members.includes(userId);
  });

  return serverData;
}

export async function fetchServer(serverId: UID): Promise<ServerInfo> {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * DELAY));

  if (serverId == "dms") {
    return {
      id: "dms",
      serverName: "Direct Messages",
      backgroundColor: "#313338",
      groups: [],
      members: [],
    };
  }
  const serverData = serverList.find((server) => {
    return server.id == serverId;
  });

  if (!serverData) {
    throw "[404] Couldn't Find Server Data";
  }

  return serverData;
}

export async function fetchChannelGroupList(
  serverId: UID
): Promise<ChannelGroup[]> {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * DELAY));

  if (serverId == "dms") {
    return [];
  }

  const serverData = serverList.find((server) => {
    return server.id == serverId;
  });

  if (!serverData) {
    throw "[404] Couldn't Find Server Data";
  }

  const groupData = channelGroupList.filter((group) => {
    return serverData.groups.includes(group.id);
  });

  return groupData;
}

export async function fetchChannelList(groupId: UID): Promise<ChannelInfo[]> {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * DELAY));

  const groupData = channelGroupList.find((group) => {
    return group.id == groupId;
  });

  if (!groupData) {
    throw "[404] Couldn't Find Group Data";
  }

  const channelData = channelList.filter((channel) => {
    return groupData.channels.includes(channel.id);
  });

  return channelData;
}

export async function fetchChannel(channelId: UID): Promise<ChannelInfo> {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * DELAY));

  const channelData = channelList.find((channel) => {
    return channel.id == channelId;
  });

  if (!channelData) {
    throw "[404] Couldn't Find Channel Data";
  }

  return channelData;
}

export async function read_messages(channelId: UID) {
  const messagesData = messageList.filter((message) => {
    return message.channelId == channelId;
  });

  return messagesData;
}
export async function fetchMessageList(
  channelId: UID
): Promise<ServerMessage[]> {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * DELAY));

  const messagesData = messageList.filter((message) => {
    return message.channelId == channelId;
  });

  return messagesData;
}

export async function fetchUser(userId: UID): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * DELAY));

  const userData = userList.find((user) => {
    return user.id == userId;
  });

  if (!userData) {
    throw "[404] Couldn't Find User Data";
  }

  return userData;
}

export async function fetchUserByEmail(email: string): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * DELAY));

  const userData = userList.find((user) => {
    return user.email == email;
  });

  if (!userData) {
    throw "[404] Couldn't Find User Data";
  }

  return userData;
}

export async function fetchUserList(): Promise<User[]> {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * DELAY));

  return userList;
}

export async function fetchDirectMessageList(
  userId1: UID,
  userId2: UID
): Promise<DirectMessage[]> {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * DELAY));

  const messageData = directMessageList.filter((message) => {
    return (
      (message.senderId == userId1 && message.receiverId == userId2) ||
      (message.senderId == userId2 && message.receiverId == userId1)
    );
  });

  return messageData;
}

export async function sendDirectMessage(
  senderId: UID,
  receiverId: UID,
  message: string
) {
  const messageData = {
    senderId,
    receiverId,
    time: "Today at 3:28 PM",
    message,
  };
  directMessageList.push(messageData);
}

export async function sendMessage(
  senderId: UID,
  channelId: UID,
  message: string
) {
  const messageData = {
    senderId,
    channelId,
    time: "Today at 3:28 PM",
    message,
  };

  messageList.push(messageData);

  console.log("from data.ts:", await read_messages(channelId));
}

export async function UserInServer(userId: UID, serverId: UID) {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * DELAY));

  const serverData = await fetchServer(serverId);
  const id = serverData.members.find((id: UID) => id == userId);

  return !!id;
}
