import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { ChatPage } from './pages/ChatPage';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<ChatPage />} />
        {/* 추가적인 페이지 라우팅은 여기에 작성합니다 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;