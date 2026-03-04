export type MessageType = 'text' | 'complaint_form' | 'lawsuit_form' | 'admin_form' | 'business_form';

export interface ComplaintFormData {
  name: string;
  contact: string;
  file?: File | null;
}

export interface LawsuitFormData {
  name: string;
  contact: string;
  targetName: string;
  incidentDate: string;
  description: string;
  evidence?: File | null;
}

export interface AdminFormData {
  name: string;
  contact: string;
  department: string;
  requestDetails: string;
}

export interface BusinessFormData {
  name: string;
  contact: string;
  businessName: string;
  businessType: string;
  address: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type: MessageType;
  isFormSubmitted?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
}