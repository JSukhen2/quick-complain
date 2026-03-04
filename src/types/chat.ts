export type MessageType = 'text' | 'complaint_form';

export interface ComplaintFormData {
  name: string;
  contact: string;
  file?: File | null;
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