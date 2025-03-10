import UsersList from "@components/UsersList";
import { useGroupInfo } from "./hooks/useGroupInfo";
import AddMembersButton from "./AddMembersButton";
import SearchInput from "@components/side-bar/groups/SearchInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSideBarView } from "@state/side-bar/sideBar";
import { sideBarPages } from "types/sideBar";
import { useAppSelector } from "@hooks/useGlobalState";

function Admins() {
  const { isPending, admins } = useGroupInfo();
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const { backView } = useAppSelector(
    (state) => state.sideBarData.rightSideBar
  );

  if (isPending) return;

  const filteredAdmins = admins?.filter((admin) =>
    `${admin.screenFirstName} ${admin.screenLastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  function handleClick() {
    dispatch(
      updateSideBarView({
        redirect: sideBarPages.ADD_ADMINS,
        data: { type: "right", prevBackView: backView },
      })
    );
  }

  return (
    <>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <UsersList view="display" users={filteredAdmins} />
      <AddMembersButton
        data-testid="add-members-button"
        onClick={handleClick}
      />
    </>
  );
}
export default Admins;
