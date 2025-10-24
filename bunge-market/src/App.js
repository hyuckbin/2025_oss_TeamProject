import React from 'react';
// 1. useNavigate를 임포트합니다.
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
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
  useTheme, // 반응형
  useMediaQuery, // 반응형
  IconButton, // 반응형
} from '@mui/material';
import { Search } from '@mui/icons-material'; // Search 아이콘

// 📄 페이지 임포트
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import EditPage from './pages/EditPage';
import LoginPage from './pages/LoginPage'; // 2. LoginPage 임포트

// Zustand 스토어 임포트
import useAppStore from './store/useAppStore';

// 3. Header 컴포넌트를 App 밖으로 분리합니다. (useNavigate를 사용하기 위해)
function Header() {
  // 스토어에서 user와 logout 함수를 가져옵니다.
  const { searchQuery, setSearchQuery, user, logout } = useAppStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // 로그아웃 버튼 클릭 시 실행될 함수
  const handleLogout = () => {
    logout();
    navigate('/'); // 로그아웃 후 메인 페이지로 이동
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: '#fff', color: '#111', borderBottom: '1px solid #e5e5e5' }}
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
        {isMobile ? (
          // --- 모바일용 헤더 ---
          <>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              component={Link}
              to="/"
              sx={{ textDecoration: 'none', color: 'inherit', flex: 1 }}
            >
              <Box
                component="img"
                src="/images/lightning-logo.png"
                alt="로고"
                sx={{ width: 36, height: 36 }}
              />
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton color="inherit"><Search /></IconButton>
              {/* 4. [모바일] 로그인 상태에 따라 버튼 변경 */}
              {user ? (
                <Button onClick={handleLogout} size="small" sx={{ fontSize: 13, color: '#333' }}>
                  로그아웃
                </Button>
              ) : (
                <Button component={Link} to="/login" size="small" sx={{ fontSize: 13, color: '#333' }}>
                  로그인
                </Button>
              )}
            </Stack>
          </>
        ) : (
          // --- 데스크톱용 헤더 ---
          <>
            {/* 로고 (동일) */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              component={Link}
              to="/"
              sx={{ textDecoration: 'none', color: 'inherit' }}
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

            {/* 검색창 (동일) */}
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

            {/* 5. [데스크톱] 로그인 상태에 따라 버튼 변경 */}
            <Stack direction="row" spacing={2} alignItems="center">
              {user ? (
                <>
                  <Typography variant="body2" fontWeight={600}>{user.username}님</Typography>
                  <Button onClick={handleLogout} color="inherit" sx={{ fontSize: 14, color: '#333' }}>
                    로그아웃
                  </Button>
                </>
              ) : (
                <Button component={Link} to="/login" color="inherit" sx={{ fontSize: 14, color: '#333' }}>
                  로그인/가입
                </Button>
              )}
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
      
      {/* 모바일 검색창 (동일) */}
      {isMobile && (
        <Toolbar sx={{ bgcolor: 'white', borderBottom: '1px solid #e5e5eS', justifyContent: 'center', py: 1 }}>
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
  );
}

// 6. 메인 App 컴포넌트
export default function App() {
  return (
    <Router>
      <CssBaseline />
      <Header /> {/* 분리된 Header 컴포넌트 사용 */}

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
            <Route path="/login" element={<LoginPage />} /> {/* 7. /login 경로 추가 */}
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

