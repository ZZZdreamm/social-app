import LeftBar from "components/MainComponents/Bars/LeftBar";
import Menu from "components/MainComponents/Menu";
import { OpenedChatsComponent } from "components/openedChatsComponent/OpenedChatsComponent";
import { SocketCallModal } from "components/socketCallModal/SocketCallModal";
import Authorized from "globals/Auth/Authorized";
import { RoutesProvider } from "globals/routes";



export function Layout() {
  return (
    <>
      <div className="navbar-placeholder"></div>
      <Menu />
      <Authorized isAuthorized={<LeftBar />} />
      <OpenedChatsComponent />
      <SocketCallModal />
      <section className="landing-page">
        <RoutesProvider />
      </section>
    </>
  );
}
