// src/pages/AddPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Paper,
  Divider,
  Alert,
  Chip
} from '@mui/material';

import { createProduct } from '../services/api';
import { CATEGORIES, MAJORS, CONDITIONS } from '../constants';
// [삭제] import Header from '../components/Header';

function AddPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      price: '',
      category: '',
      major: '',
      location: '',
      modelName: '',
      imageUrl: '',
      // 프로젝트 공통 필드
      studentVerified: true,
      status: '판매중',
      priceHistory: [],
      condition: '',
    },
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [inspectionResult, setInspectionResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCategory = watch('category');
  const selectedCondition = watch('condition');

  // 이미지 파일 업로드
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 10MB 제한
    if (file.size > 10 * 1024 * 1024) {
      alert('이미지 크기는 10MB 이하로 업로드해주세요.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setValue('imageUrl', String(reader.result)); // Base64 저장
    };
    reader.readAsDataURL(file);
  };

  // 이미지 제거
  const handleImageRemove = () => {
    setImageFile(null);
    setImagePreview(null);
    setValue('imageUrl', '');
    setInspectionResult(null);
  };

  // Mock 자체 검수
  const handleImageInspection = () => {
    if (!imagePreview) {
      alert('이미지를 먼저 업로드해주세요!');
      return;
    }

    // CONDITIONS = [{ value, label, color }, ...] 가정
    const random = CONDITIONS[Math.floor(Math.random() * CONDITIONS.length)];
    const basePrice = Math.floor(Math.random() * 1_000_000) + 500_000;

    setInspectionResult({
      condition: random.value,
      estimatedPrice: basePrice,
      color: random.color,
    });

    setValue('condition', random.value);
  };

  const onSubmit = async (data) => {
    if (!imagePreview) {
      alert('상품 이미지를 업로드해주세요!');
      return;
    }

    setIsSubmitting(true);
    try {
      const productData = {
        ...data,
        price: Number(data.price) || 0,
        priceHistory: [Number(data.price) || 0],
        // 🔥 프로젝트 전체 형식에 맞춰 UNIX seconds 로 저장
        createdAt: Math.floor(Date.now() / 1000),
      };

      await createProduct(productData);
      alert('상품이 등록되었습니다!');
      navigate('/');
    } catch (err) {
      console.error('상품 등록 실패:', err);
      alert('상품 등록에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* [삭제] <Header /> (App.js에서 전역으로 제공) */}

      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
          상품 등록
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper elevation={0} sx={{ p: 3, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              상품이미지 (0/12) <span style={{ color: '#f44336' }}>*</span>
            </Typography>

            <Box
              sx={{
                border: '2px solid #e0e0e0',
                borderRadius: 2,
                overflow: 'hidden',
                mb: 2,
                bgcolor: '#fafafa',
              }}
            >
              {imagePreview ? (
                <Box sx={{ position: 'relative' }}>
                  <img
                    src={imagePreview}
                    alt="상품 이미지"
                    style={{
                      width: '100%',
                      maxHeight: '400px',
                      objectFit: 'contain',
                      display: 'block',
                    }}
                  />
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={handleImageRemove}
                    sx={{ position: 'absolute', top: 10, right: 10 }}
                  >
                    삭제
                  </Button>
                </Box>
              ) : (
                <Box
                  component="label"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '300px',
                    cursor: 'pointer',
                    '&:hover': { bgcolor: '#f0f0f0' },
                  }}
                >
                  <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      bgcolor: '#e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    <Typography sx={{ fontSize: '40px' }}>📷</Typography>
                  </Box>
                  <Typography variant="h6" color="text.secondary" gutterBottom>
                    이미지 등록
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    상품 이미지는 PC에서는 1:1, 모바일에서는 1:1.23 비율로 보여져요.
                  </Typography>
                </Box>
              )}
            </Box>

            {/* Hidden input for react-hook-form */}
            <input type="hidden" {...register('imageUrl', { required: '이미지를 업로드해주세요' })} />
            {errors.imageUrl && (
              <Typography variant="caption" color="error" display="block" sx={{ mb: 2 }}>
                {errors.imageUrl.message}
              </Typography>
            )}

            <Button
              variant="outlined"
              onClick={handleImageInspection}
              fullWidth
              disabled={!imagePreview}
              sx={{
                borderColor: '#4FC3F7',
                color: '#4FC3F7',
                '&:hover': { borderColor: '#29B6F6', bgcolor: '#E1F5FE' },
                '&:disabled': { borderColor: '#e0e0e0', color: '#9e9e9e' },
              }}
            >
              🤖 AI 자체 검수 시작
            </Button>

            {inspectionResult && (
              <Alert severity="success" sx={{ mt: 2 }}>
                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                  ✅ 검수 완료!
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                  <Chip
                    label={inspectionResult.condition}
                    sx={{ bgcolor: inspectionResult.color, color: 'white', fontWeight: 'bold' }}
                  />
                  <Typography variant="body2">
                    예상 시세: <strong>{inspectionResult.estimatedPrice.toLocaleString()}원</strong>
                  </Typography>
                </Box>
              </Alert>
            )}
          </Paper>

          <Divider sx={{ my: 3 }} />

          {/* 카테고리 */}
          <Paper elevation={0} sx={{ p: 3, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              카테고리 <span style={{ color: '#f44336' }}>*</span>
            </Typography>
            <FormControl component="fieldset" error={!!errors.category} fullWidth>
              <RadioGroup row>
                {CATEGORIES.map((cat) => (
                  <FormControlLabel
                    key={cat}
                    value={cat}
                    control={<Radio {...register('category', { required: true })} />}
                    label={cat}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            {errors.category && (
              <Typography variant="caption" color="error">
                카테고리를 선택해주세요
              </Typography>
            )}
          </Paper>

          {/* 전공/학과 */}
          <Paper elevation={0} sx={{ p: 3, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              전공/학과 <span style={{ color: '#f44336' }}>*</span>
            </Typography>
            <FormControl component="fieldset" error={!!errors.major} fullWidth>
              <RadioGroup row>
                {MAJORS.map((major) => (
                  <FormControlLabel
                    key={major}
                    value={major}
                    control={<Radio {...register('major', { required: true })} />}
                    label={major}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            {errors.major && (
              <Typography variant="caption" color="error">
                전공을 선택해주세요
              </Typography>
            )}
          </Paper>

          {/* 상품상태 (검수 안 했을 경우만 노출) */}
          {!inspectionResult && (
            <Paper elevation={0} sx={{ p: 3, mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                상품상태 <span style={{ color: '#f44336' }}>*</span>
              </Typography>
              <FormControl component="fieldset" error={!!errors.condition} fullWidth>
                <RadioGroup>
                  {CONDITIONS.map((cond) => (
                    <FormControlLabel
                      key={cond.value}
                      value={cond.value}
                      control={
                        <Radio {...register('condition', { required: !inspectionResult })} />
                      }
                      label={cond.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              {errors.condition && (
                <Typography variant="caption" color="error">
                  상품 상태를 선택해주세요
                </Typography>
              )}
            </Paper>
          )}

          {/* 제목 */}
          <Paper elevation={0} sx={{ p: 3, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              제목 <span style={{ color: '#f44336' }}>*</span>
            </Typography>
            <TextField
              fullWidth
              placeholder="상품 제목을 입력해주세요"
              {...register('title', { required: '제목을 입력해주세요' })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </Paper>

          {/* 모델명 */}
          <Paper elevation={0} sx={{ p: 3, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              모델명 <span style={{ color: '#f44336' }}>*</span>
            </Typography>
            <TextField
              fullWidth
              placeholder="예: MacBook Pro 14 M1"
              {...register('modelName', { required: '모델명을 입력해주세요' })}
              error={!!errors.modelName}
              helperText={errors.modelName?.message}
            />
          </Paper>

          {/* 설명 */}
          <Paper elevation={0} sx={{ p: 3, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              설명 <span style={{ color: '#f44336' }}>*</span>
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              placeholder="브랜드, 모델명, 구매 시기, 하자 유무 등 상품 설명을 최대한 자세히 적어주세요."
              {...register('description', { required: '설명을 입력해주세요' })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />
          </Paper>

          {/* 가격 */}
          <Paper elevation={0} sx={{ p: 3, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              가격 <span style={{ color: '#f44336' }}>*</span>
            </Typography>
            <TextField
              fullWidth
              type="number"
              placeholder="가격을 입력해주세요"
              InputProps={{ endAdornment: <Typography>원</Typography> }}
              {...register('price', {
                required: '가격을 입력해주세요',
                min: { value: 0, message: '0원 이상 입력해주세요' },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />
          </Paper>

          {/* 거래지역 */}
          <Paper elevation={0} sx={{ p: 3, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              거래 지역/캠퍼스 <span style={{ color: '#f44336' }}>*</span>
            </Typography>
            <TextField
              fullWidth
              placeholder="예: 서울대 정문"
              {...register('location', { required: '거래 지역을 입력해주세요' })}
              error={!!errors.location}
              helperText={errors.location?.message}
            />
          </Paper>

          {/* 하단 고정 버튼 */}
          <Box
            sx={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              bgcolor: 'white',
              borderTop: '1px solid #e0e0e0',
              p: 2,
              zIndex: 1000,
            }}
          >
            <Box
              sx={{
                maxWidth: 800,
                mx: 'auto',
                display: 'flex',
                gap: 1,
                justifyContent: 'flex-end',
              }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                disabled={isSubmitting}
                sx={{
                  minWidth: '120px',
                  height: '48px',
                  fontSize: '16px',
                  borderColor: '#e0e0e0',
                  color: '#666',
                }}
              >
                취소
              </Button>
              <Button
                variant="outlined"
                disabled={isSubmitting}
                sx={{
                  minWidth: '120px',
                  height: '48px',
                  fontSize: '16px',
                  borderColor: '#4FC3F7',
                  color: '#4FC3F7',
                  '&:hover': { borderColor: '#29B6F6', bgcolor: '#E1F5FE' },
                }}
              >
                임시저장
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  minWidth: '120px',
                  height: '48px',
                  fontSize: '16px',
                  bgcolor: '#4FC3F7',
                  '&:hover': { bgcolor: '#29B6F6' },
                }}
              >
                {isSubmitting ? '등록 중...' : '등록하기'}
              </Button>
            </Box>
          </Box>

          {/* 하단 버튼 공간 확보 */}
          <Box sx={{ height: '80px' }} />
        </form>
      </Box>
    </Box>
  );
}

export default AddPage;