// src/pages/DetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Chip,
  Grid,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  // Container는 이제 사용하지 않습니다.
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatIcon from '@mui/icons-material/Chat';
import VerifiedIcon from '@mui/icons-material/Verified';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { getProduct, deleteProduct } from '../services/api';
import { CONDITIONS } from '../constants';
import Header from '../components/Header';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // 상품 데이터 불러오기
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('상품 조회 실패:', error);
        alert('상품을 불러오는데 실패했습니다.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  // 삭제 처리
  const handleDelete = async () => {
    try {
      await deleteProduct(id);
      alert('상품이 삭제되었습니다.');
      navigate('/');
    } catch (error) {
      console.error('삭제 실패:', error);
      alert('상품 삭제에 실패했습니다.');
    }
  };

  // 찜하기 토글
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  // 로딩 중
  if (loading) {
    return (
      <Box>
        <Header />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress sx={{ color: '#4FC3F7' }} />
        </Box>
      </Box>
    );
  }

  // 상품 없음
  if (!product) {
    return (
      <Box>
        <Header />
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography variant="h5">상품을 찾을 수 없습니다.</Typography>
          <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
            메인으로 돌아가기
          </Button>
        </Box>
      </Box>
    );
  }

  // 상태 등급 색상 찾기
  const conditionColor = CONDITIONS.find(c => c.value === product.condition)?.color || '#757575';

  // Mock 데이터
  const viewCount = 63;
  const favoriteCount = 1;
  const timeAgo = '55분 전';

  return (
    <Box sx={{ minHeight: '10vh', bgcolor: '#cd7676ff' }}>
      <Header />

      {/* Container 대신 Box를 사용하고 직접 스타일링 */}
      <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: { xs: 2, md: 4 } }}>
        <Grid container spacing={4}>
          
          {/* 파란 박스 (이미지) */}
          <Grid item xs={12} md={7}>
            <Box sx={{ position: 'relative' }}>
              <Box sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '100%',
                bgcolor: '#f5f5f5',
                borderRadius: 2,
                overflow: 'hidden'
              }}>
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x600?text=No+Image';
                  }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(0,0,0,0.3)',
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' }
                  }}
                >
                  <NavigateBeforeIcon />
                </IconButton>
                <IconButton
                  sx={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(0,0,0,0.3)',
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' }
                  }}
                >
                  <NavigateNextIcon />
                </IconButton>
                <Box
                  sx={{
                    position: 'absolute',
                    right: 16,
                    bottom: 16,
                    bgcolor: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    borderRadius: 20,
                    px: 2,
                    py: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    cursor: 'pointer'
                  }}
                >
                  <SearchIcon sx={{ fontSize: 18 }} />
                  <Typography variant="caption">
                    확대
                  </Typography>
                </Box>
                <Box sx={{
                  position: 'absolute',
                  bottom: 16,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 1
                }}>
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: index === 0 ? '#fff' : 'rgba(255,255,255,0.5)',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* 빨간 박스 (상품 정보) */}
          <Grid item xs={12} md={5}>
            <Box>
              <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                {product.title}
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                sx={{ mb: 3 }}
              >
                {product.price?.toLocaleString()}
                <Typography component="span" variant="h4" sx={{ ml: 0.5 }}>
                  원
                </Typography>
              </Typography>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3
              }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <FavoriteBorderIcon sx={{ fontSize: 20, color: '#999' }} />
                    <Typography variant="body2" color="text.secondary">
                      {favoriteCount}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <VisibilityIcon sx={{ fontSize: 20, color: '#999' }} />
                    <Typography variant="body2" color="text.secondary">
                      {viewCount}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTimeIcon sx={{ fontSize: 20, color: '#999' }} />
                    <Typography variant="body2" color="text.secondary">
                      {timeAgo}
                    </Typography>
                  </Box>
                </Box>
                <Button
                  size="small"
                  startIcon={<VerifiedIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    color: '#999',
                    fontSize: '13px'
                  }}
                >
                  신고하기
                </Button>
              </Box>
              <Divider sx={{ my: 3 }} />
              <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5 }}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ width: '150px', flexShrink: 0 }}
                  >
                    • 상품상태
                  </Typography>
                  <Chip
                    label={product.condition}
                    sx={{
                      bgcolor: conditionColor,
                      color: 'white',
                      fontWeight: 'bold',
                      height: 28,
                      fontSize: '14px'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5 }}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ width: '150px', flexShrink: 0 }}
                  >
                    • 램 용량
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    8GB
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5 }}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ width: '150px', flexShrink: 0 }}
                  >
                    • 저장용량
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    256GB
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5 }}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ width: '150px', flexShrink: 0 }}
                  >
                    • 배송비
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    일반 4,000원
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5 }}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ width: '150px', flexShrink: 0 }}
                  >
                    • 카테고리
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {product.category}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5 }}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ width: '150px', flexShrink: 0 }}
                  >
                    • 전공/학과
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {product.major}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', py: 1.5 }}>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ width: '150px', flexShrink: 0 }}
                  >
                    • 직거래지역
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {product.location}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 3 }} />
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Button
                  variant="outlined"
                  onClick={handleFavoriteToggle}
                  sx={{
                    width: '100px',
                    height: '60px',
                    borderColor: '#e0e0e0',
                    bgcolor: '#f5f5f5',
                    color: '#333',
                    flexDirection: 'column',
                    gap: 0.5,
                    '&:hover': {
                      borderColor: '#FF6B6B',
                      bgcolor: '#FFF5F5'
                    }
                  }}
                >
                  {isFavorite ? (
                    <FavoriteIcon sx={{ fontSize: 24, color: '#FF6B6B' }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ fontSize: 24 }} />
                  )}
                  <Typography variant="caption" fontSize="12px">
                    찜 {favoriteCount}
                  </Typography>
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<ChatIcon sx={{ fontSize: 20 }} />}
                  sx={{
                    height: '60px',
                    bgcolor: '#FFA500',
                    fontWeight: 'bold',
                    fontSize: '17px',
                    '&:hover': {
                      bgcolor: '#FF8C00'
                    }
                  }}
                >
                  번개톡
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    height: '60px',
                    bgcolor: '#FF3333',
                    fontWeight: 'bold',
                    fontSize: '17px',
                    '&:hover': {
                      bgcolor: '#E62E2E'
                    }
                  }}
                >
                  바로구매
                </Button>
              </Box>
              <Box sx={{
                mt: 2,
                p: 2,
                bgcolor: '#E8F4FD',
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <VerifiedIcon sx={{ fontSize: 20, color: '#1976D2', mr: 1 }} />
                <Typography variant="body2" color="#1976D2" fontWeight="medium">
                  안전결제 수수료 없이 구매하세요
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mt: 3, justifyContent: 'center' }}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => navigate(`/edit/${id}`)}
                  sx={{
                    color: '#666',
                    borderColor: '#e0e0e0',
                    minWidth: '80px'
                  }}
                >
                  수정
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setDeleteDialogOpen(true)}
                  sx={{
                    color: '#f44336',
                    borderColor: '#f44336',
                    minWidth: '80px'
                  }}
                >
                  삭제
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>상품 삭제</DialogTitle>
        <DialogContent>
          <Typography>정말로 이 상품을 삭제하시겠습니까?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>취소</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default DetailPage;

