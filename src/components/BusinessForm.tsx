import { useState } from 'react';
import styled from 'styled-components';
import type { BusinessFormData } from '../types/chat';

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

interface BusinessFormProps {
  messageId: string;
  isSubmitted?: boolean;
  onSubmit: (id: string, data: BusinessFormData) => void;
}

export const BusinessForm: React.FC<BusinessFormProps> = ({ messageId, isSubmitted, onSubmit }) => {
  const [formData, setFormData] = useState<BusinessFormData>({
    name: '',
    contact: '',
    businessName: '',
    businessType: '',
    address: ''
  });

  if (isSubmitted) {
    return (
      <FormContainer $isSubmitted={true}>
        <SuccessMessage>✓ 사업자 등록 신청 정보가 전달되었습니다.</SuccessMessage>
      </FormContainer>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <FormContainer>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#111827' }}>사업자 등록 사전 정보 입력</h3>
      <FormGroup>
        <Label>대표자 성명 (필수)</Label>
        <Input name="name" type="text" placeholder="홍길동" value={formData.name} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label>연락처 (필수)</Label>
        <Input name="contact" type="text" placeholder="010-0000-0000" value={formData.contact} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label>상호명 (필수)</Label>
        <Input name="businessName" type="text" placeholder="예: 퀵컴플레인 코퍼레이션" value={formData.businessName} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label>업태/종목 (필수)</Label>
        <Input name="businessType" type="text" placeholder="예: 정보통신업 / 소프트웨어 개발" value={formData.businessType} onChange={handleChange} />
      </FormGroup>
      <FormGroup>
        <Label>사업장 주소 (필수)</Label>
        <Input name="address" type="text" placeholder="사업장 소재지를 입력해주세요" value={formData.address} onChange={handleChange} />
      </FormGroup>
      <SubmitBtn 
        onClick={() => {
          if (!formData.name || !formData.contact || !formData.businessName || !formData.businessType || !formData.address) {
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
