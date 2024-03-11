import Link from "next/link";
import { HexColor, ServerInfo, UID } from "../types/data";
import { fetchServerList } from "../data/data";

function ServerButton(props: {
  id: UID;
  selectedServer: UID;
  backgroundColor: HexColor;
}) {
  const id = props.id;
  const selectedServer = props.selectedServer;
  const backgroundColor = props.backgroundColor;

  return (
    <div className="w-full relative">
      <Link
        id={id}
        className={`${
          selectedServer == id ? "rounded-[18px]" : "rounded-[25px]"
        } block hover:rounded-[18px] w-[50px] h-[50px] mx-auto aspect-square cursor-pointer transition-all peer `}
        style={{ backgroundColor }}
        href={id == "dms" ? "/direct" : `/server/${id}`}
      ></Link>
      <div
        className={`bg-[#F2F3F5]  absolute flex top-1/2 -translate-y-1/2 transition-all  ${
          selectedServer == id
            ? "!h-[40px] w-1 !opacity-100"
            : "h-[0px] w-0 opacity-0"
        } peer-hover:h-[25px] peer-hover:w-1 peer-hover:opacity-75 rounded-r-[10px]`}
      ></div>
    </div>
  );
}

function ServerButtonSkeleton() {
  return (
    <div className="w-full relative">
      <div className="bg-[] rounded-[25px] hover:rounded-[18px] w-[50px] h-[50px] mx-auto aspect-square cursor-pointer transition-all peer animate-pulse"></div>
      <div className="bg-[#313338]  absolute flex top-1/2 -translate-y-1/2 transition-all h-[0px] w-0 opacity-0 peer-hover:h-[25px] peer-hover:w-1 peer-hover:opacity-75 rounded-r-[10px]"></div>
    </div>
  );
}

export function SideNavSkeleton() {
  return (
    <div className="h-full w-[72px] min-w-[72px] bg-[#1E1F22] flex flex-col gap-[7px] items-center">
      <ServerButtonSkeleton></ServerButtonSkeleton>
      <div className="h-[2px] w-8 bg-[#313338] rounded-full"></div>
      <ServerButtonSkeleton></ServerButtonSkeleton>
      <ServerButtonSkeleton></ServerButtonSkeleton>
      <ServerButtonSkeleton></ServerButtonSkeleton>
    </div>
  );
}

export default async function SideNav(props: { selectedServer: UID }) {
  const selectedServer = props.selectedServer;
  const serverList = await fetchServerList("1"); // to be replaced with a real user id

  return (
    <div className="h-full w-[72px] min-w-[72px] bg-[#1E1F22] flex flex-col gap-[7px] items-center">
      <ServerButton
        id="dms"
        selectedServer={selectedServer}
        backgroundColor="#313338"
      ></ServerButton>
      <div className="h-[2px] w-8 bg-[#313338] rounded-full"></div>
      {serverList.map((serverInfo: ServerInfo) => {
        return (
          <ServerButton
            key={serverInfo.serverName}
            id={serverInfo.id}
            selectedServer={selectedServer}
            backgroundColor={serverInfo.backgroundColor}
          ></ServerButton>
        );
      })}
    </div>
  );
}
