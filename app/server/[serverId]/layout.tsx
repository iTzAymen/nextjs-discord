import { Suspense } from "react";
import SideNav, { SideNavSkeleton } from "../../ui/sidenav";
import { fetchServerList } from "@/app/data/data";
import { UID } from "../../types/data";

export default async function Layout({
  params,
  children,
}: {
  params: { serverId: UID };
  children: React.ReactNode;
}) {
  const serverId = params.serverId || "dms";

  return (
    <div className="h-screen max-h-[100vh] w-full flex flex-col">
      <div className="w-full h-[22px] min-h-[22px] bg-[#1E1F22]"></div>
      <div
        className="flex-grow w-full flex"
        style={{ maxHeight: "calc(100vh - 22px)" }}
      >
        <Suspense fallback={<SideNavSkeleton />}>
          <SideNav selectedServer={serverId} />
        </Suspense>
        {children}
      </div>
    </div>
  );
}
