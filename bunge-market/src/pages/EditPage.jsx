// src/pages/EditPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  Chip,
  CircularProgress,
} from '@mui/material';

import { getProduct, updateProduct } from '../services/api'; // getProduct, updateProduct 임포트
import { CATEGORIES, MAJORS, CONDITIONS } from '../constants';
// Header가 프로젝트 전역 AppBar와 중복되면 제거해도 됩니다.
import Header from '../components/Header';

function EditPage() {
  const navigate = useNavigate();
  const { id } = useParams(); // URL에서 상품 ID 가져오기
  const [pageLoading, setPageLoading] = useState(true); // 페이지 로딩 상태

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset, // 폼 값을 한 번에 설정하기 위해 reset 임포트
  } = useForm();

  // AddPage와 동일한 상태들
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [inspectionResult, setInspectionResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedCategory = watch('category');
  const selectedCondition = watch('condition');

  // --- (데이터 로딩 useEffect) ---
  useEffect(() => {
    const fetchProduct = async () => {
      setPageLoading(true);
      try {
        const data = await getProduct(id);
        // react-hook-form의 reset으로 폼 전체 값을 한 번에 설정
        reset(data);
        
        // 이미지 미리보기 설정
        if (data.imageUrl) {
          setImagePreview(data.imageUrl);
        }
      } catch (err) {
        console.error('상품 정보 로딩 실패:', err);
        alert('상품 정보를 불러오는데 실패했습니다.');
        navigate('/');
      } finally {
        setPageLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate, reset]);

  // --- (AddPage와 동일한 핸들러들) ---

  // 이미지 파일 업로드
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
    const random = CONDITIONS[Math.floor(Math.random() * CONDITIONS.length)];
    const basePrice = Math.floor(Math.random() * 1_000_000) + 500_000;
    setInspectionResult({
      condition: random.value,
      estimatedPrice: basePrice,
      color: random.color,
    });
    setValue('condition', random.value);
  };

  // --- (수정된 onSubmit 핸들러) ---
  const onSubmit = async (data) => {
    if (!imagePreview) {
      alert('상품 이미지를 업로드해주세요!');
      return;
    }

    setIsSubmitting(true);
    try {
      // 폼에서 받은 최신 데이터로 productData 구성
      const productData = {
        ...data,
        price: Number(data.price) || 0,
        // priceHistory 업데이트 (선택적)
        priceHistory: [...(data.priceHistory || []), Number(data.price) || 0],
        // createdAt은 수정하지 않음 (최초 등록일 유지)
      };

      // updateProduct API 호출
      await updateProduct(id, productData);
      alert('상품이 수정되었습니다!');
      navigate(`/product/${id}`); // 수정 완료 후 상세 페이지로 이동
    } catch (err) {
      console.error('상품 수정 실패:', err);
      alert('상품 수정에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- (로딩 UI) ---
  if (pageLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>상품 정보를 불러오는 중...</Typography>
      </Box>
    );
  }

  // --- (JSX 렌더링 - AddPage와 거의 동일) ---
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      {/* 전역 AppBar를 쓰고 있다면 <Header />는 제거해도 됩니다 */}
      <Header />

      <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
          상품 수정
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* 이미지 섹션 (AddPage와 동일) */}
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
                  <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
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
              sx={{ borderColor: '#4FC3F7', color: '#4FC3F7', '&:hover': { borderColor: '#29B6F6', bgcolor: '#E1F5FE' }, '&:disabled': { borderColor: '#e0e0e0', color: '#9e9e9e' } }}
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

          {/* 카테고리 (AddPage와 동일) */}
          <Paper elevation={0} sx={{ p: 3, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              카테고리 <span style={{ color: '#f44336' }}>*</span>
            </Typography>
            <FormControl component="fieldset" error={!!errors.category} fullWidth>
              <RadioGroup row value={watch('category') || ''}>
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

          {/* 전공/학과 (AddPage와 동일) */}
          <Paper elevation={0} sx={{ p: 3, mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              전공/학과 <span style={{ color: '#f44336' }}>*</span>
            </Typography>
            <FormControl component="fieldset" error={!!errors.major} fullWidth>
              <RadioGroup row value={watch('major') || ''}>
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

          {/* 상품상태 (AddPage와 동일) */}
          {!inspectionResult && (
            <Paper elevation={0} sx={{ p: 3, mb: 2 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                상품상태 <span style={{ color: '#f44336' }}>*</span>
              </Typography>
              <FormControl component="fieldset" error={!!errors.condition} fullWidth>
                <RadioGroup value={watch('condition') || ''}>
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

          {/* 나머지 폼 필드 (AddPage와 동일) */}
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

          {/* 하단 고정 버튼 (텍스트 수정) */}
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
                onClick={() => navigate(-1)} // 상세 페이지나 메인으로 돌아가기
                disabled={isSubmitting}
                sx={{ minWidth: '120px', height: '48px', fontSize: '16px', borderColor: '#e0e0e0', color: '#666' }}
              >
                취소
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
                {isSubmitting ? '수정 중...' : '수정하기'}
              </Button>
            </Box>
          </Box>
          <Box sx={{ height: '80px' }} />
        </form>
      </Box>
    </Box>
  );
}

export default EditPage;