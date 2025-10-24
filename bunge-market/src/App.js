import React from 'react';
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
  useTheme, // 1. useTheme 임포트
  useMediaQuery, // 2. useMediaQuery 임포트
  IconButton, // 3. IconButton 임포트
} from '@mui/material';
import { Search } from '@mui/icons-material'; // Search 아이콘은 이미 임포트되어 있습니다.

// 📄 페이지 임포트
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';

// Zustand 스토어 임포트
import useAppStore from './store/useAppStore';

export default function App() {
  const { searchQuery, setSearchQuery } = useAppStore();

  // 4. 반응형 UI를 위한 훅 설정
  const theme = useTheme();
  // 화면 크기가 'md' (900px)보다 작아지면 isMobile은 true가 됩니다.
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
          {/* 5. isMobile 값에 따라 다른 UI를 렌더링합니다. */}
          {isMobile ? (
            // --- 모바일용 헤더 ---
            <>
              {/* 왼쪽: 로고 */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                component={Link}
                to="/"
                sx={{ textDecoration: 'none', color: 'inherit', flex: 1 }} // flex: 1로 공간 차지
              >
                <Box
                  component="img"
                  src="/images/lightning-logo.png"
                  alt="로고"
                  sx={{ width: 36, height: 36 }}
                />
              </Stack>
              {/* 오른쪽: 검색 아이콘 + 판매 버튼 */}
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton color="inherit">
                  <Search />
                </IconButton>
                <Button
                  component={Link}
                  to="/add"
                  variant="contained"
                  size="small"
                  sx={{
                    bgcolor: '#5c6bc0',
                    color: '#fff',
                    fontWeight: 600,
                    px: 1.5,
                    fontSize: 13,
                    '&:hover': { bgcolor: '#3f4fa0' },
                  }}
                >
                  판매
                </Button>
              </Stack>
            </>
          ) : (
            // --- 데스크톱용 헤더 (기존과 동일) ---
            <>
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
            </>
          )}
        </Toolbar>
        
        {/* 6. 모바일일 때만 검색창을 헤더 하단에 추가로 표시 */}
        {isMobile && (
          <Toolbar sx={{ bgcolor: 'white', borderBottom: '1px solid #e5e5e5', justifyContent: 'center', py: 1 }}>
            <Box
              sx={{
                flex: 1,
                maxWidth: 500,
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ flex: 1, fontSize: 14 }}
              />
            </Box>
          </Toolbar>
        )}
      </AppBar>

      {/* 🔹 본문 (기존과 동일) */}
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
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

