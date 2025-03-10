import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import Main from "./Main";
import SideBar from "./side-bar/SideBar";
import { DESKTOP_VIEW, MOBILE_VIEW } from "@constants";
import { useRightSideBarContext } from "@features/groups/contexts/RightSideBarProvider";
import { useEffect, useState } from "react";
import { useSocket } from "@hooks/useSocket";
import { callStatusEmitter } from "@features/calls/context/callStatusEmitter";
import CallLayout from "@features/calls/CallLayout";

const StyledApp = styled.div<{
  $isChatOpen: boolean;
  $isRightSideBarOpen: boolean;
}>`
  @media ${MOBILE_VIEW} {
    & > main {
      display: ${({ $isChatOpen }) => ($isChatOpen ? "contents" : "none")};
    }

    & > aside {
      display: ${({ $isChatOpen }) => ($isChatOpen ? "none" : "contents")};
    }
  }

  @media ${DESKTOP_VIEW} {
    display: grid;
    grid-template-columns: ${({ $isRightSideBarOpen }) =>
      $isRightSideBarOpen ? "1.5fr 3fr 1.5fr" : "1.5fr 4.5fr"};

    overflow-x: hidden;

    & > main {
      display: block;
    }

    & > aside {
      display: block;
    }
  }
`;

function AppLayout() {
  const { chatId } = useParams();
  const isChatOpen = !!chatId;
  const { isRightSideBarOpen } = useRightSideBarContext();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [callStatus, setCallStatus] = useState<
    "inactive" | "active" | "calling" | "incoming" | "ended"
  >("inactive");

  useEffect(() => {
    const handler = (status: typeof callStatus) => setCallStatus(status);
    callStatusEmitter.on("update", handler);

    return () => callStatusEmitter.off("update", handler);
  }, []);
  return (
    <StyledApp
      $isChatOpen={isChatOpen}
      data-testid="app-layout"
      $isRightSideBarOpen={isRightSideBarOpen}
    >
      <SideBar type="left" />
      <Main>
        <Outlet />
        {callStatus != "inactive" && (
          <CallLayout
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
            callStatus={callStatus}
          />
        )}
      </Main>
      {isRightSideBarOpen && <SideBar type="right" />}
    </StyledApp>
  );
}

export default AppLayout;
