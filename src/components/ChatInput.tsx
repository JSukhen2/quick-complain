import React, { useRef } from 'react';
import styled from 'styled-components';
import { Send } from 'lucide-react';

const InputAreaContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, #ffffff 20%);

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const InputContainer = styled.div`
  max-width: 800px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: flex-end;
  background-color: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0,0,0,0.05);
  padding: 12px 16px;
`;

const TextArea = styled.textarea`
  flex: 1;
  border: none;
  outline: none;
  resize: none;
  max-height: 200px;
  min-height: 24px;
  font-size: 16px;
  line-height: 1.5;
  font-family: inherit;
  background: transparent;
  padding: 0;
`;

const SendBtn = styled.button`
  background: #10a37f;
  color: white;
  border: none;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.2s;

  &:hover {
    background: #0d8a6a;
  }
  
  &:disabled {
    background: #e5e5e5;
    cursor: not-allowed;
  }
`;

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ value, onChange, onSend }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleSendClick = () => {
    onSend();
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  return (
    <InputAreaContainer>
      <InputContainer>
        <TextArea
          ref={textareaRef}
          placeholder="민원 내용을 입력해주세요..."
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          rows={1}
        />
        <SendBtn 
          onClick={handleSendClick}
          disabled={!value.trim()}
        >
          <Send size={16} />
        </SendBtn>
      </InputContainer>
    </InputAreaContainer>
  );
};
