import { AppBar, Toolbar, Box, Typography, Button, Stack, IconButton, InputBase } from '@mui/material';
import { Search } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function Header({ q, setQ }) {
  return (
    <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid #e5e5e5' }}>
      <Toolbar
        sx={{
          maxWidth: 1200,
          width: '100%',
          mx: 'auto',
          justifyContent: 'space-between',
          px: { xs: 2, md: 3 },
        }}
      >
        {/* 🔹 왼쪽 로고 / 텍스트 */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'black', fontWeight: 700 }}>
            ⚡ Bunge Market
          </Typography>
          <Typography variant="body2" color="text.secondary">
            캠퍼스 스토어
          </Typography>
        </Stack>

        {/* 🔹 중앙 검색창 */}
        <Box
          sx={{
            flex: 1,
            maxWidth: 500,
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #cfcfcf',
            borderRadius: 1,
            px: 1.5,
            py: 0.3,
            mx: 3,
            bgcolor: 'white',
            '&:focus-within': {
              borderColor: '#1976d2',
            },
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

        {/* 🔹 오른쪽 메뉴 */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Button color="inherit" sx={{ fontSize: 14, color: '#333' }}>
            내상점
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/create"
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
  );
}
