import React from 'react';
import styled from 'styled-components';
import { Plus, MessageSquare, X } from 'lucide-react';

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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: ${({ $isActive }) => ($isActive ? '#ececec' : 'transparent')};

  &:hover {
    background-color: #ececec;
  }
`;

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  sessions: ChatSession[];
  currentSessionId: string;
  onSelectSession: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  onNewChat,
  sessions,
  currentSessionId,
  onSelectSession
}) => {
  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <SidebarContainer $isOpen={isOpen}>
        <HeaderRow>
          <NewChatBtn onClick={onNewChat}>
            <Plus size={18} />
            새로운 민원 접수
          </NewChatBtn>
          <CloseButton onClick={onClose}>
            <X size={20} />
          </CloseButton>
        </HeaderRow>
        
        <ChatHistory>
          {sessions.map((session) => (
            <HistoryItem 
              key={session.id} 
              $isActive={session.id === currentSessionId}
              onClick={() => onSelectSession(session.id)}
            >
              <MessageSquare size={14} style={{ display: 'inline', marginRight: '8px' }} />
              {session.title}
            </HistoryItem>
          ))}
        </ChatHistory>
      </SidebarContainer>
    </>
  );
};
