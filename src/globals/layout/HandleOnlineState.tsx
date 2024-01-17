import { useEffect, useState } from "react";
import { wakeUpDB } from "../../apiFunctions/wakeUpDB";
import { Layout } from "./Layout";
import { LoadingModal } from "../../components/loadingModal/LoadingModal";
import OfflineWebsite from "../../_utils/OfflineWebsite/OfflineWebsite";

export function HandleOnlineState() {
  const [online, setOnline] = useState(false);
  const [databaseDown, setDatabaseDown] = useState(() => {
    if (sessionStorage.getItem("isHerokuServerAwake")) return false;
    return true;
  });

  useEffect(() => {
    setOnline(navigator.onLine);
  }, [localStorage]);

  useEffect(() => {
    const wakeUp = async () => {
      await wakeUpDB();
    };
    wakeUp();
  }, []);

  return (
    <>
      {online ? (
        !databaseDown ? (
          <Layout />
        ) : (
          <LoadingModal isOpen={databaseDown} setIsOpen={setDatabaseDown} />
        )
      ) : (
        <OfflineWebsite />
      )}
    </>
  );
}
