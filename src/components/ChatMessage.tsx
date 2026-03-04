import React from 'react';
import styled from 'styled-components';
import { User, Bot } from 'lucide-react';
import type { Message, ComplaintFormData } from '../types/chat';
import { ComplaintForm } from './ComplaintForm';

const MessageWrapper = styled.div<{ $role: 'user' | 'assistant' }>`
  padding: 24px 20px;
  display: flex;
  justify-content: center;
  background-color: transparent;

  @media (max-width: 768px) {
    padding: 16px 12px;
  }
`;

const MessageContent = styled.div`
  max-width: 800px;
  width: 100%;
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const Avatar = styled.div<{ $role: 'user' | 'assistant' }>`
  width: 30px;
  height: 30px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
  background-color: ${({ $role }) => ($role === 'user' ? '#10a37f' : '#ab68ff')};
  color: white;
`;

const TextContent = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #374151;
  white-space: pre-wrap;
  flex: 1;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

interface ChatMessageProps {
  message: Message;
  onFormSubmit: (id: string, data: ComplaintFormData) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onFormSubmit }) => {
  return (
    <MessageWrapper $role={message.role}>
      <MessageContent>
        <Avatar $role={message.role}>
          {message.role === 'user' ? <User size={18} /> : <Bot size={18} />}
        </Avatar>
        <TextContent>
          {message.content}
          
          {message.type === 'complaint_form' && (
            <ComplaintForm 
              messageId={message.id} 
              isSubmitted={message.isFormSubmitted} 
              onSubmit={onFormSubmit} 
            />
          )}
        </TextContent>
      </MessageContent>
    </MessageWrapper>
  );
};
