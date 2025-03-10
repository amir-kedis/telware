import SideBarMenuItem from "@components/side-bar/chats/SideBarMenuItem";
import { getIcon } from "@data/icons";
import { useAppDispatch, useAppSelector } from "@hooks/useGlobalState";
import { useMouseLeave } from "@hooks/useMouseLeave";
import { setView, View } from "@state/admin/adminView";
import { useState } from "react";
import styled from "styled-components";

const ToolsIcon = styled.div`
  > svg {
    color: var(--color-icon-secondary);
    border-radius: var(--border-radius-modal);
    padding: 0.3rem;
    &:hover {
      cursor: pointer;
      background-color: var(--color-background-compact-menu-hover);
    }
  }
  margin: 0 1rem 0 -1rem;
`;
const StyledList = styled.ul<{ $isOpened?: boolean }>`
  width: 13rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: space-between;
  list-style: none;
  padding: 0.5rem 0.2rem;
  background-color: var(--color-background);
  box-shadow: 0 0.25rem 0.5rem 0.125rem var(--color-default-shadow);
  border-radius: var(--border-radius-default);
  visibility: ${({ $isOpened }) => ($isOpened ? "visible" : "hidden")};

  z-index: 2;
`;

function AdminNavMenu() {
  const [isOpened, setIsOpened] = useState(false);
  const ref = useMouseLeave(() => setIsOpened(false), false);
  const handleOpenSettings = () => {
    setIsOpened((prevState) => !prevState);
  };
  const activeView = useAppSelector((state) => state.adminView.value);
  const dispatch = useAppDispatch();
  const handleViewChange = (view: View) => {
    if (activeView !== view) {
      dispatch(
        setView({
          value: view,
        })
      );
    }
    setIsOpened(false);
  };
  return (
    <>
      <ToolsIcon onClick={handleOpenSettings} data-testid="menu-items-icon">
        {getIcon("Menu")}
      </ToolsIcon>
      {isOpened && (
        <StyledList
          $isOpened={isOpened}
          ref={ref as React.RefObject<HTMLUListElement>}
        >
          <SideBarMenuItem
            data-testid="menu-item-users"
            title="Users"
            iconMapValue="Contacts"
            onClick={() => {
              handleViewChange(View.USERS);
            }}
          />
          <SideBarMenuItem
            data-testid="menu-item-groups"
            title="Groups"
            iconMapValue="NewGroup"
            onClick={() => {
              handleViewChange(View.GROUPS);
            }}
          />
        </StyledList>
      )}
    </>
  );
}

export default AdminNavMenu;
