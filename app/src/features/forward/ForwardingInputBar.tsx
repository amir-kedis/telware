import Icon from "@components/Icon";
import { getIcon } from "@data/icons";
import { getChatByID } from "@features/chats/utils/helpers";
import { useAppSelector } from "@hooks/useGlobalState";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useContext } from "react";
import { ChatInputContext } from "@features/chats/ChatBox";

const Wrapper = styled.div`
  background: var(--color-background);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  display: flex;
  flex: 2 2;
  justify-content: space-between;
  align-items: center;
  height: 3.5rem;
`;

const StyledHeader = styled.div`
  font-size: 1rem;
  color: var(--color-text-secondary);
  flex: 1;
  text-align: center;
`;

const IconButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

function ForwardingInputBar() {
  const { chatId } = useParams<{ chatId: string }>();

  const { setShowForwardUsers, handleClose } = useContext(ChatInputContext);

  const chats = useAppSelector((state) => state.chats.chats);
  const chat = chatId ? getChatByID({ chatID: chatId, chats }) : undefined;

  const selectedMessages = chat?.selectedMessages;

  return selectedMessages ? (
    <Wrapper>
      <IconButton>
        <Icon onClick={handleClose} test-id="close-icon">
          {getIcon("Close")}
        </Icon>
      </IconButton>
      <StyledHeader>{selectedMessages.length} messages selected</StyledHeader>
      <IconButton>
        <Icon onClick={() => setShowForwardUsers(true)} test-id="forward-icon">
          {getIcon("Forward")}
        </Icon>
      </IconButton>
    </Wrapper>
  ) : null;
}

export default ForwardingInputBar;
