"use client";

import { Message, UID, User } from "../../types/data";
import { MessageFormElement } from "../../types/forms";
import { sendDirectMessageAction, sendMessageAction } from "../../lib/actions";
import React, { useEffect, useRef, useState } from "react";

function CirclePlus({ className }: { className: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20ZM11 9V5H9V9H5V11H9V15H11V11H15V9H11Z"
        fill="current"
        stroke="current"
      />
    </svg>
  );
}

export function MessageInput(props: {
  data: { senderId: UID; channelId?: UID; receiverId?: UID };
}) {
  const { data } = props;

  const SendMessage = async (e: React.FormEvent<MessageFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const message = form.elements.messageInput.value;

    if (data.channelId) {
      sendMessageAction(data.senderId, data.channelId, message).then(() => {
        console.log("Message sent");
      });
    } else if (data.receiverId) {
      sendDirectMessageAction(data.senderId, data.receiverId, message).then(
        () => {
          console.log("Message sent");
        }
      );
    }
  };

  return (
    <form
      className="w-full h-[44px] relative"
      onSubmit={SendMessage}
      autoComplete="off"
    >
      <input
        id="messageInput"
        type="text"
        className="w-full h-full bg-[#383A40] rounded-[8px] pl-[56px] pr-[18px] py-[12px] flex outline-none placeholder:text-[#64666E] message-input-text"
        placeholder="Message #bois-chat"
      />
      <CirclePlus className="cursor-pointer fill-[#B5BAC1] hover:fill-[#DBDEE1] absolute top-1/2 -translate-y-1/2 left-[18px]" />
    </form>
  );
}

export function MessageSkeleton() {
  return (
    <div className="mt-[6px] flex gap-[4px]">
      {[1, 2, 3].map((_, index: number) => {
        const width = Math.ceil(30 + 0.5 * 60);
        return (
          <div
            key={index}
            className="bg-[#3B3D42] h-[17px] w-[56px] rounded-full animate-pulse"
            style={{ width }}
          ></div>
        );
      })}
    </div>
  );
}

function LoadingMessageBox() {
  const lines = [...new Array(Math.ceil(Math.random() * 4))];

  const ImageSkeleton = () => {
    const height = Math.ceil(150 + Math.random() * 200);
    const width = Math.ceil(150 + Math.random() * 200);
    return (
      <div
        className="mt-[6px] rounded-[8px] bg-[#36383C] animate-pulse"
        style={{ height, width }}
      />
    );
  };

  const TextSkeleton = () => {
    const words = [...new Array(Math.ceil(Math.random() * 8))];

    return (
      <div className="mt-[6px] flex gap-[4px]">
        {words.map((_, index2) => {
          const width = Math.ceil(30 + Math.random() * 60);
          return (
            <div
              key={index2}
              className="bg-[#3B3D42] h-[17px] w-[56px] rounded-full animate-pulse"
              style={{ width }}
            ></div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full flex py-[4px] px-[16px] first:mt-auto">
      <div
        id="profile-pic"
        className="relative h-[41px] w-[41px] aspect-square rounded-full cursor-pointer bg-[#3E4046] animate-pulse"
      ></div>
      <div className="ms-[15px]">
        <div className="flex">
          <div className="bg-[#3E4046] h-[17px] w-[106px] mt-[2px] mb-[1px] rounded-full animate-pulse"></div>
        </div>
        {lines.map((_, index) => {
          const isImage = Math.random() > 0.8;
          if (isImage) {
            return <ImageSkeleton key={index} />;
          }
          return <TextSkeleton key={index} />;
        })}
      </div>
    </div>
  );
}

export function ChatBoxSkeleton(props: { channelId: UID; userData: User }) {
  return (
    <div className="h-full bg-[#313338] flex-grow flex flex-col">
      <div className={`h-[47px] min-h-[47px] flex border-b border-[#26282C]`}>
        <div className="active-channel-hashtag ms-[18px] text-[#8E9297] select-none animate-pulse">
          #
        </div>
        <div className={`active-channel-name ms-[10.5px] select-none`}>
          <div className="bg-[#3B3D42] h-[17px] w-[80px] rounded-full animate-pulse"></div>
        </div>
      </div>
      <div className="chatbox w-full flex-grow flex flex-col-reverse pb-[22px] gap-[17px] overflow-y-hidden">
        <LoadingMessageBox />
        <LoadingMessageBox />
        <LoadingMessageBox />
        <LoadingMessageBox />
      </div>
      <div className="w-full h-[68px] min-h-[68px] px-[16px] pt-[0px]">
        <MessageInput
          data={{ senderId: props.userData.id, channelId: props.channelId }}
        ></MessageInput>
      </div>
    </div>
  );
}

export function ChatBox(props: {
  userData: User;
  channelId?: UID;
  receiverId?: UID;
  children: JSX.Element[];
}) {
  const chatBox = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    const el = chatBox.current;
    if (el) {
      el.scrollTo(0, 2 * el.clientHeight);
    }
  };

  useEffect(() => {
    // scroll the chat to the bottom when the element is rendered
    scrollToBottom();
  }, []);

  return (
    <>
      <div
        ref={chatBox}
        id="chatbox"
        className={`chatbox w-full flex-grow flex flex-col pb-[22px] gap-[17px] overflow-y-scroll`}
      >
        {props.children}
      </div>
      <div className="w-full h-[68px] min-h-[68px] px-[16px] pt-[0px]">
        <MessageInput
          data={{
            senderId: props.userData.id,
            channelId: props.channelId,
            receiverId: props.receiverId,
          }}
        ></MessageInput>
      </div>
    </>
  );
}

export function DirectMessageChatBoxSkeleton(props: {
  receiverId: UID;
  userData: User;
}) {
  return (
    <div className="h-full bg-[#313338] flex-grow flex flex-col">
      <div className={`h-[47px] min-h-[47px] flex border-b border-[#26282C]`}>
        <div
          id="profile-pic"
          className={`relative h-[26px] w-[26px] ms-[15px] mt-[10px] aspect-square rounded-full cursor-pointer animate-pulse`}
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
      <div className="chatbox w-full flex-grow flex flex-col-reverse pb-[22px] gap-[17px] overflow-y-hidden">
        <LoadingMessageBox />
        <LoadingMessageBox />
        <LoadingMessageBox />
        <LoadingMessageBox />
      </div>
      <div className="w-full h-[68px] min-h-[68px] px-[16px] pt-[0px]">
        <MessageInput
          data={{ senderId: props.userData.id, receiverId: props.receiverId }}
        ></MessageInput>
      </div>
    </div>
  );
}
