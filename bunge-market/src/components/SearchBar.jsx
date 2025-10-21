// src/components/SearchBar.jsx
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ q, setQ }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 2, bgcolor: '#fff' }}>
      <TextField
        placeholder="맥북에어 M2 등 검색어를 입력하세요"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{
          width: '80%',
          maxWidth: 600,
          '& .MuiOutlinedInput-root': {
            borderRadius: '30px',
            '& fieldset': { borderColor: '#e74c3c' },
            '&:hover fieldset': { borderColor: '#c0392b' },
            '&.Mui-focused fieldset': { borderColor: '#c0392b' },
          },
        }}
      />
    </Box>
  );
}
