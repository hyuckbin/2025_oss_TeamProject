import React from 'react';
// [수정] useNavigate 및 불필요한 MUI 임포트 제거
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  CssBaseline,
  Container,
  Box,
} from '@mui/material';

// 📄 페이지 임포트
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import LoginPage from './pages/LoginPage';

// [삭제] Zustand 스토어 임포트 (Header.jsx가 담당)
// [삭제] function Header() { ... } (App.js에 있던 헤더 정의 전체 삭제)

// [추가] components/Header.jsx를 임포트합니다.
import Header from './components/Header';


// 6. 메인 App 컴포넌트
export default function App() {
  return (
    <Router>
      <CssBaseline />
      <Header /> {/* [수정] components/Header.jsx가 여기에 렌더링됩니다. */}

      {/* 🔹 본문 */}
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          bgcolor: '#f8f8f8',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          px: { xs: 2, md: 4 },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 1200 }}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/product/:id" element={<DetailPage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}