// src/components/Header.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Menu,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import logo from '../logo.jpg';

function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    // 검색 기능은 나중에 메인 페이지에서 구현
    console.log('검색:', searchQuery);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  return (
    <>
      {/* 상단 헤더 */}
      <AppBar 
        position="fixed" 
        sx={{ 
          bgcolor: 'white', 
          color: 'black',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}
      >
        <Toolbar sx={{ gap: 2, py: 1, justifyContent: 'center', maxWidth: '1200px', mx: 'auto', width: '100%' }}>
          {/* 로고 */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              cursor: 'pointer',
              //minWidth: '200px'
            }}
            onClick={() => navigate('/')}
          >
            <img 
              src={logo} 
              alt="라이트닝 캠퍼스 스토어" 
              style={{ height: '50px' }}
            />
            <Box>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold',
                  fontSize: '18px',
                  lineHeight: 1.2
                }}
              >
                라이트닝
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontSize: '14px',
                  lineHeight: 1.2
                }}
              >
                캠퍼스스토어
              </Typography>
            </Box>
          </Box>

          {/* 검색창 */}
          <Box 
            component="form" 
            onSubmit={handleSearch}
            sx={{ flexGrow: 1, maxWidth: '600px' }}
          >
            <TextField
              fullWidth
              placeholder="검색어를 입력하세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              size="small"
              sx={{
                bgcolor: '#f0f8ff',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#4FC3F7',
                    borderWidth: '2px'
                  },
                  '&:hover fieldset': {
                    borderColor: '#29B6F6',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4FC3F7',
                  },
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {searchQuery && (
                      <IconButton
                        size="small"
                        onClick={handleClearSearch}
                        edge="end"
                        sx={{ mr: 0.5 }}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    )}
                    <IconButton
                      type="submit"
                      size="small"
                      edge="end"
                      sx={{ color: '#4FC3F7' }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* 우측 메뉴 */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            {/* 판매하기 */}
            <Box
              onClick={() => navigate('/create')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                cursor: 'pointer',
                '&:hover': { color: '#4FC3F7' }
              }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  bgcolor: '#4FC3F7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                C
              </Box>
              <Typography variant="body2">판매하기</Typography>
            </Box>

            {/* 내상점 */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                cursor: 'pointer',
                '&:hover': { color: '#4FC3F7' }
              }}
            >
              <PersonIcon />
              <Typography variant="body2">내상점</Typography>
            </Box>

            {/* 번개톡 */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                cursor: 'pointer',
                '&:hover': { color: '#4FC3F7' }
              }}
            >
              <ChatIcon />
              <Typography variant="body2">번개톡</Typography>
            </Box>
          </Box>
        </Toolbar>

        {/* 하단 메뉴바 */}
        <Box 
          sx={{ 
            borderTop: '1px solid #e0e0e0',
            bgcolor: 'white',
            px: 3,
            py: 1
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {/* 햄버거 메뉴 */}
            <Box
              onClick={handleMenuOpen}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                '&:hover': { color: '#4FC3F7' }
              }}
            >
              <MenuIcon />
              <Typography variant="body2" fontWeight="bold">
                스토어 판매자센터
              </Typography>
            </Box>

            <Menu
              anchorEl={menuAnchor}
              open={Boolean(menuAnchor)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>노트북</MenuItem>
              <MenuItem onClick={handleMenuClose}>태블릿</MenuItem>
              <MenuItem onClick={handleMenuClose}>스마트폰</MenuItem>
              <MenuItem onClick={handleMenuClose}>액세서리</MenuItem>
            </Menu>
          </Box>
        </Box>
      </AppBar>

      {/* AppBar 높이만큼 여백 확보 */}
      <Toolbar />
      <Box sx={{ height: '48px' }} />
    </>
  );
}

export default Header;