import { useState } from 'react';
import styled from 'styled-components';
import AddIcon from '@mui/icons-material/Add';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CloseIcon from '@mui/icons-material/Close';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

import type { ChatSession } from '../types/chat';

const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  width: 260px;
  background-color: #f9f9f9;
  border-right: 1px solid #e5e5e5;
  display: flex;
  flex-direction: column;
  padding: 12px;
  flex-shrink: 0;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 1000;
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(-100%)')};
    box-shadow: ${({ $isOpen }) => ($isOpen ? '4px 0 15px rgba(0,0,0,0.1)' : 'none')};
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: #374151;
  padding: 4px;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const NewChatBtn = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background-color: transparent;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #0d0d0d;
  transition: background-color 0.2s;

  &:hover {
    background-color: #ececec;
  }
`;

const ChatHistory = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-top: 20px;
`;

const HistoryItem = styled.div<{ $isActive?: boolean }>`
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #0d0d0d;
  background-color: ${({ $isActive }) => ($isActive ? '#ececec' : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: #ececec;
  }

  &:hover .delete-btn {
    display: flex;
  }
`;

const HistoryTitle = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;

const DeleteButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  color: #ef4444;
  padding: 2px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #fee2e2;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 320px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  text-align: center;
`;

const ModalTitle = styled.h3`
  margin: 0 0 16px 0;
  font-size: 18px;
  color: #111827;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
`;

const ModalButton = styled.button<{ $variant?: 'danger' }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  background-color: ${({ $variant }) => ($variant === 'danger' ? '#ef4444' : '#e5e7eb')};
  color: ${({ $variant }) => ($variant === 'danger' ? 'white' : '#374151')};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ $variant }) => ($variant === 'danger' ? '#dc2626' : '#d1d5db')};
  }
`;

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  sessions: ChatSession[];
  currentSessionId: string;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  onNewChat,
  sessions,
  currentSessionId,
  onSelectSession,
  onDeleteSession
}) => {
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (sessionToDelete) {
      onDeleteSession(sessionToDelete);
      setSessionToDelete(null);
    }
  };

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <SidebarContainer $isOpen={isOpen}>
        <HeaderRow>
          <NewChatBtn onClick={onNewChat}>
            <AddIcon sx={{ fontSize: 18 }} />
            새로운 민원 접수
          </NewChatBtn>
          <CloseButton onClick={onClose}>
            <CloseIcon sx={{ fontSize: 20 }} />
          </CloseButton>
        </HeaderRow>
        
        <ChatHistory>
          {sessions.map((session) => (
            <HistoryItem 
              key={session.id} 
              $isActive={session.id === currentSessionId}
              onClick={() => onSelectSession(session.id)}
            >
              <HistoryTitle>
                <ChatBubbleOutlineIcon sx={{ fontSize: 16, marginRight: '8px' }} />
                {session.title}
              </HistoryTitle>
              <DeleteButton 
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setSessionToDelete(session.id);
                }}
              >
                <DeleteOutlineIcon sx={{ fontSize: 16 }} />
              </DeleteButton>
            </HistoryItem>
          ))}
        </ChatHistory>
      </SidebarContainer>

      {sessionToDelete && (
        <ModalOverlay>
          <ModalContent>
            <ModalTitle>정말 삭제하시겠습니까?</ModalTitle>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
              삭제된 민원 내역은 복구할 수 없습니다.
            </p>
            <ModalActions>
              <ModalButton onClick={() => setSessionToDelete(null)}>
                취소
              </ModalButton>
              <ModalButton $variant="danger" onClick={handleDeleteConfirm}>
                삭제
              </ModalButton>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};
