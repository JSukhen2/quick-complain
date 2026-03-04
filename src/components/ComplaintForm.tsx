import React, { useState } from 'react';
import styled from 'styled-components';
import type { ComplaintFormData } from '../types/chat';

const FormContainer = styled.div<{ $isSubmitted?: boolean }>`
  margin-top: 16px;
  padding: 20px;
  border: 1px solid ${({ $isSubmitted }) => ($isSubmitted ? '#bbf7d0' : '#e5e5e5')};
  border-radius: 8px;
  background-color: ${({ $isSubmitted }) => ($isSubmitted ? '#f0fdf4' : '#ffffff')};
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 500px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const SuccessMessage = styled.p`
  color: #166534;
  font-weight: 600;
  margin: 0;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: #10a37f;
  }
`;

const SubmitBtn = styled.button`
  background-color: #10a37f;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  align-self: flex-start;

  &:hover {
    background-color: #0d8a6a;
  }
`;

interface ComplaintFormProps {
  messageId: string;
  isSubmitted?: boolean;
  onSubmit: (id: string, data: ComplaintFormData) => void;
}

export const ComplaintForm: React.FC<ComplaintFormProps> = ({ messageId, isSubmitted, onSubmit }) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [file, setFile] = useState<File | null>(null);

  if (isSubmitted) {
    return (
      <FormContainer $isSubmitted={true}>
        <SuccessMessage>✓ 양식 제출이 완료되었습니다.</SuccessMessage>
      </FormContainer>
    );
  }

  return (
    <FormContainer>
      <FormGroup>
        <Label>이름 (필수)</Label>
        <Input 
          type="text" 
          placeholder="홍길동" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </FormGroup>
      <FormGroup>
        <Label>연락처 (필수)</Label>
        <Input 
          type="text" 
          placeholder="010-0000-0000" 
          value={contact} 
          onChange={(e) => setContact(e.target.value)} 
        />
      </FormGroup>
      <FormGroup>
        <Label>스크린샷 첨부 (선택)</Label>
        <Input 
          type="file" 
          accept="image/*" 
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              setFile(e.target.files[0]);
            }
          }}
        />
      </FormGroup>
      <SubmitBtn 
        onClick={() => {
          if (!name || !contact) {
            alert('이름과 연락처를 입력해주세요.');
            return;
          }
          onSubmit(messageId, { name, contact, file });
        }}
      >
        제출하기
      </SubmitBtn>
    </FormContainer>
  );
};
