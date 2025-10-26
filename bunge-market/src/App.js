import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  CssBaseline,
  Container,
  Box,
} from '@mui/material';

import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';


// 6. 메인 App 컴포넌트
export default function App() {
  return (
    <Router>
      <CssBaseline />
      <Header /> 

      {/* 본문 */}
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