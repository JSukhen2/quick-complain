import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import MenuIcon from '@mui/icons-material/Menu';
import { Sidebar } from '../components/Sidebar';
import { ChatMessage } from '../components/ChatMessage';
import { ChatInput } from '../components/ChatInput';
import type { Message, ComplaintFormData, ChatSession } from '../types/chat';
import { generateChatTitle } from '../utils/gemini';

const PageContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #ffffff;
  width: 100%;
`;

const ChatHeader = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  font-weight: 600;
  font-size: 16px;
  border-bottom: 1px solid #e5e5e5;
`;

const HeaderTitle = styled.div`
  flex: 1;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  margin-right: 16px;
  color: #374151;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 0;
  scroll-behavior: smooth;
`;

export const ChatPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // 세션(채팅방) 상태 관리
  const initialSessionId = crypto.randomUUID();
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: initialSessionId,
      title: '새로운 민원',
      messages: [
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: '안녕하세요! AI 민원 도우미입니다. 어떤 도움이 필요하신가요?',
          type: 'text',
        }
      ]
    }
  ]);
  const [currentSessionId, setCurrentSessionId] = useState<string>(initialSessionId);
  
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 현재 선택된 세션 찾기
  const currentSession = sessions.find(s => s.id === currentSessionId) || sessions[0];
  const messages = currentSession.messages;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const updateSessionMessages = (sessionId: string, newMessages: Message[] | ((prev: Message[]) => Message[])) => {
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        const updatedMessages = typeof newMessages === 'function' ? newMessages(session.messages) : newMessages;
        return { ...session, messages: updatedMessages };
      }
      return session;
    }));
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: inputValue,
      type: 'text',
    };

    // 현재 세션에 메시지 추가
    updateSessionMessages(currentSessionId, (prev) => [...prev, newUserMsg]);
    setInputValue('');

    // 첫 번째 사용자 메시지인 경우 제목 생성
    if (messages.length === 1) {
      generateChatTitle(newUserMsg.content).then(newTitle => {
        setSessions(prev => prev.map(s => 
          s.id === currentSessionId ? { ...s, title: newTitle } : s
        ));
      });
    }

    // Mock AI Response
    setTimeout(() => {
      let aiResponse: Message;

      if (newUserMsg.content.includes('욕') || newUserMsg.content.includes('신고')) {
        aiResponse = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: `아 그렇군요.. 마음이 아프시겠습니다.\n개인정보와 스크린샷(선택)이 있다면 더 빠르게 처리가 가능합니다. 아래 양식을 작성해주세요.`,
          type: 'complaint_form',
          isFormSubmitted: false,
        };
      } else {
        aiResponse = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: `접수해 주셔서 감사합니다. 해당 내용을 확인 후 빠르게 처리해 드리겠습니다.`,
          type: 'text',
        };
      }
      updateSessionMessages(currentSessionId, (prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleFormSubmit = (messageId: string, formData: ComplaintFormData) => {
    updateSessionMessages(currentSessionId, (prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isFormSubmitted: true } : msg
      )
    );

    setTimeout(() => {
      const aiResponse: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `정보가 성공적으로 접수되었습니다. (접수자: ${formData.name})\n담당 부서로 전달되었으며, 추가로 필요한 사항이 있으시면 언제든 말씀해주세요.`,
        type: 'text',
      };
      updateSessionMessages(currentSessionId, (prev) => [...prev, aiResponse]);
    }, 800);
  };

  const handleNewChat = () => {
    const newSessionId = crypto.randomUUID();
    const newSession: ChatSession = {
      id: newSessionId,
      title: '새로운 민원',
      messages: [
        { 
          id: crypto.randomUUID(), 
          role: 'assistant', 
          content: '안녕하세요! AI 민원 도우미입니다. 어떤 도움이 필요하신가요?', 
          type: 'text' 
        }
      ]
    };
    
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSessionId);
    
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleDeleteSession = (id: string) => {
    setSessions(prev => {
      const newSessions = prev.filter(s => s.id !== id);
      
      if (newSessions.length === 0) {
        const newSessionId = crypto.randomUUID();
        setCurrentSessionId(newSessionId);
        return [{
          id: newSessionId,
          title: '새로운 민원',
          messages: [{ 
            id: crypto.randomUUID(), 
            role: 'assistant', 
            content: '안녕하세요! AI 민원 도우미입니다. 어떤 도움이 필요하신가요?', 
            type: 'text' 
          }]
        }];
      }
      
      if (currentSessionId === id) {
        setCurrentSessionId(newSessions[0].id);
      }
      
      return newSessions;
    });
  };

  return (
    <PageContainer>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNewChat={handleNewChat} 
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSelectSession={(id) => {
          setCurrentSessionId(id);
          if (window.innerWidth <= 768) setIsSidebarOpen(false);
        }}
        onDeleteSession={handleDeleteSession}
      />

      <MainContent>
        <ChatHeader>
          <MenuButton onClick={() => setIsSidebarOpen(true)}>
            <MenuIcon />
          </MenuButton>
          <HeaderTitle>{currentSession.title}</HeaderTitle>
          <div style={{ width: 24 }}></div>
        </ChatHeader>

        <MessagesContainer>
          {messages.map((msg) => (
            <ChatMessage 
              key={msg.id} 
              message={msg} 
              onFormSubmit={handleFormSubmit} 
            />
          ))}
          <div ref={messagesEndRef} />
        </MessagesContainer>

        <ChatInput 
          value={inputValue} 
          onChange={setInputValue} 
          onSend={handleSend} 
        />
      </MainContent>
    </PageContainer>
  );
};
