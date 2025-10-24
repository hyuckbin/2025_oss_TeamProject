import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
} from '@mui/material';
import useAppStore from '../store/useAppStore';
 
function LoginPage() {
  const navigate = useNavigate();
  // Zustand 스토어에서 login 함수를 가져옵니다.
  const login = useAppStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 폼 제출 시 실행될 함수
  const onSubmit = (data) => {
    // 실제 앱에서는 여기서 API로 아이디/비밀번호를 확인하겠지만,
    // 지금은 간단히 입력한 아이디로 로그인 처리합니다.
    login(data.username);
    alert(`${data.username}님, 환영합니다!`);
    navigate('/'); // 로그인 후 메인 페이지로 이동
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5" fontWeight="bold">
          로그인
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 3, width: '100%' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="아이디"
            autoFocus
            {...register('username', { required: '아이디를 입력해주세요.' })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            defaultValue="1234" // 간단한 로그인을 위해 임시 비밀번호
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem', bgcolor: '#5c6bc0' }}
          >
            로그인
          </Button>
          <Stack direction="row" justifyContent="center">
            <Button component={RouterLink} to="/" color="primary">
              메인으로 돌아가기
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginPage;

