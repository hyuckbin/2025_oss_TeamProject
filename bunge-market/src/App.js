// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

// 페이지 임포트
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';

function App() {
  return (
    <Router>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/product/:id" element={<DetailPage />} />
          <Route path="/create" element={<AddPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;