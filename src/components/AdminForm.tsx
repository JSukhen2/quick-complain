import { useState } from 'react';
import styled from 'styled-components';
import type { AdminFormData } from '../types/chat';

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

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  resize: vertical;
  min-height: 80px;

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

interface AdminFormProps {
  messageId: string;
  isSubmitted?: boolean;
  onSubmit: (id: string, data: AdminFormData) => void;
}

export const AdminForm: React.FC<AdminFormProps> = ({ messageId, isSubmitted, onSubmit }) => {
  const [formData, setFormData] = useState<AdminFormData>({
    name: '',
    contact: '',
    department: '',
    requestDetails: ''
  });

  if (isSubmitted) {
    return (
      <FormContainer $isSubmitted={true}>
        <SuccessMessage>✓ 행정 민원 신청이 완료되었습니다.</SuccessMessage>
      </FormContainer>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <FormContainer>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#111827' }}>일반 행정 민원 신청</h3>
      <FormGroup>
        <Label>신청인 이름 (필수)</Label>
        <Input name="name" type="text" placeholder="홍길동" value={formData.name} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label>연락처 (필수)</Label>
        <Input name="contact" type="text" placeholder="010-0000-0000" value={formData.contact} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label>관련 부서 (선택)</Label>
        <Input name="department" type="text" placeholder="예: 교통과, 환경과 등 (모르면 비워두세요)" value={formData.department} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label>민원 상세 내용 (필수)</Label>
        <TextArea name="requestDetails" placeholder="요청하시고자 하는 행정 처리 내용을 상세히 적어주세요." value={formData.requestDetails} onChange={handleChange} />
      </FormGroup>
      <SubmitBtn 
        onClick={() => {
          if (!formData.name || !formData.contact || !formData.requestDetails) {
            alert('필수 항목을 모두 입력해주세요.');
            return;
          }
          onSubmit(messageId, formData);
        }}
      >
        제출하기
      </SubmitBtn>
    </FormContainer>
  );
};
