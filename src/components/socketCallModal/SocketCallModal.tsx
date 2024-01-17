import { ReactElement, useEffect, useState } from "react";
import { useProfilesRelationsContext } from "../../services/Contexts/ProfileDataContext";
import { axiosBase } from "../../globals/apiPaths";
import { profileDTO } from "../../models/profiles.models";
import CallModal from "../WebRTC/CallModal";
import { openCallWindow } from "../WebRTC/CallFunctions";
import { useAuthenticationContext } from "../../services/Contexts/AuthenticationContext";
import { socket } from "../../globals/constants";

export function SocketCallModal() {
  const { profile } = useAuthenticationContext();
  const [call, setCall] = useState<ReactElement>(<></>);

  useEffect(() => {
    if (!profile) return;
    if (!profile.Id) return;
    socket.on(`calling/${profile.Id}`, async (data) => {
      const caller = (
        await axiosBase.get<profileDTO>(`profiles/one/${data.userId}`)
      ).data;
      setCall(
        <CallModal
          onSubmit={() =>
            openCallWindow(profile, caller, data.roomId, "receiver")
          }
          friend={caller}
          setCall={setCall}
          onClose={() => {
            socket.emit("leave-call", { friendId: caller.Id });
          }}
        />
      );
    });
  }, [profile]);
  return <>{call}</>;
}
