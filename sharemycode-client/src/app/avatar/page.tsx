"use client";

import { RoomProvider } from "../../../liveblocks.config";
import { useSearchParams } from "next/navigation";
import LiveAvatars from "@/components/avatar/LiveAvatars";
import { useMemo } from "react";

export default function Avatar() {
  const roomId = useOverrideRoomId("avatar");

  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <main className="
        flex overflow-hidden absolute top-0 left-0 right-0 bottom-0
        justify-center items-center
      ">
        <LiveAvatars />
      </main>
    </RoomProvider>
  )
}

/**
 * This function is used when deploying an example on liveblocks.io.
 * You can ignore it completely if you run the example locally.
 */
function useOverrideRoomId(roomId: string) {
  const searchParams = useSearchParams();
  const search = searchParams.get(roomId);
  const overrideRoomId = useMemo(() => {
    return search ? `${roomId}-${search}` : roomId;
  }, [searchParams, roomId, search]);

  return overrideRoomId;
}
