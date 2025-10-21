import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Container,
  Box,
  InputBase,
} from '@mui/material';
import { Search } from '@mui/icons-material';

// 📄 페이지 임포트 (팀 버전 기준)
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';

export default function App() {
  const [q, setQ] = useState('');

  return (
    <Router>
      <CssBaseline />

      {/* 🔹 상단 네비게이션 */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: '#fff',
          color: '#111',
          borderBottom: '1px solid #e5e5e5',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: 1200,
            mx: 'auto',
            width: '100%',
            px: { xs: 2, md: 3 },
          }}
        >
          {/* 왼쪽: 로고 */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Box
              component="img"
              src="/images/lightning-logo.png"
              alt="로고"
              sx={{ width: 36, height: 36 }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#111', fontSize: 16 }}>
                라이트닝
              </Typography>
              <Typography variant="subtitle1" fontWeight={700} sx={{ color: '#111', fontSize: 16 }}>
                캠퍼스스토어
              </Typography>
            </Box>
          </Stack>

          {/* 가운데 검색창 */}
          <Box
            sx={{
              flex: 1,
              maxWidth: 500,
              mx: 3,
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #ccc',
              borderRadius: 1,
              px: 1.5,
              py: 0.3,
              bgcolor: '#fff',
              '&:focus-within': { borderColor: '#1976d2' },
            }}
          >
            <Search sx={{ color: '#888', fontSize: 22, mr: 1 }} />
            <InputBase
              placeholder="맥북에어 M2 등 검색어를 입력하세요"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              sx={{ flex: 1, fontSize: 14 }}
            />
          </Box>

          {/* 오른쪽 메뉴 */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Button color="inherit" sx={{ fontSize: 14, color: '#333' }}>
              내상점
            </Button>
            <Button
              component={Link}
              to="/add"
              variant="contained"
              sx={{
                bgcolor: '#5c6bc0',
                color: '#fff',
                fontWeight: 600,
                px: 2.5,
                borderRadius: 1,
                '&:hover': { bgcolor: '#3f4fa0' },
              }}
            >
              판매하기
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

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
            <Route path="/" element={<MainPage searchQuery={q} />} />
            <Route path="/product/:id" element={<DetailPage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}
