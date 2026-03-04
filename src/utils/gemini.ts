import { GoogleGenerativeAI } from '@google/generative-ai';

// Vite에서 설정한 envPrefix('GEMINI_')를 통해 환경변수를 가져옵니다.
const apiKey = import.meta.env.GEMINI_API_KEY;

export const generateChatTitle = async (message: string): Promise<string> => {
  if (!apiKey) {
    console.warn('GEMINI_API_KEY가 설정되지 않았습니다.');
    return '새로운 민원';
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-001' });
    
    const prompt = `다음은 사용자가 처음 입력한 민원 내용입니다. 이 내용을 바탕으로 15자 이내의 짧고 간결한 민원 제목을 작성해주세요. 오직 제목만 출력해야 합니다.\n\n내용: ${message}`;
    
    const result = await model.generateContent(prompt);
    const title = result.response.text().trim();
    
    // 따옴표나 불필요한 문장 부호 제거
    return title.replace(/^["']|["']$/g, '');
  } catch (error) {
    console.error('제목 생성 중 오류 발생:', error);
    return '새로운 민원';
  }
};
