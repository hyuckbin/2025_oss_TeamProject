// src/pages/DetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Chip,
  Grid, // Grid는 이제 레이아웃 용도로 쓰지 않지만, 필요할 수 있어 남겨둡니다.
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Paper,
  Avatar,
  Stack, // [추가] Stack 컴포넌트
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatIcon from '@mui/icons-material/Chat';
import VerifiedIcon from '@mui/icons-material/Verified';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// SearchIcon은 이제 사용하지 않습니다.
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { getProduct, deleteProduct } from '../services/api';
import { CONDITIONS } from '../constants';
import Header from '../components/Header';
import ProductMap from '../components/ProductMap';
import PriceChart from '../components/PriceChart';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // 상품 데이터 불러오기 (동일)
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

  // 삭제 처리 (동일)
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

  // 찜하기 토글 (동일)
  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };


  // 로딩 중 UI (동일)
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

  // 상품 없음 UI (동일)
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

  // 상태 등급 색상 찾기 (동일)
  const conditionColor = CONDITIONS.find(c => c.value === product.condition)?.color || '#757575';

  // Mock 데이터 -> 실제 데이터 사용하도록 수정
  const viewCount = product.viewCount || 0; // API에 viewCount가 있다면 사용
  const favoriteCount = product.favoriteCount || 0; // API에 favoriteCount가 있다면 사용
  const timeAgo = product.createdAt ? timeAgoCalc(product.createdAt * 1000) : '방금 전'; // 실제 createdAt 사용

  return (
    <Box>
      <Header />

      {/* [수정] 메인 콘텐츠 영역 (maxWidth: 800px 유지, 세로 배치) */}
      <Box sx={{ maxWidth: '800px', margin: '0 auto', padding: { xs: 2, md: 4 } }}>

        {/* --- 상단: 이미지와 핵심 정보 (좌우 분할) --- */}
        {/* [수정] Stack direction 유지, 내부 구조 변경 */}
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ mb: 4 }}>

          {/* 1. 왼쪽: 이미지 영역 (거의 동일) */}
          <Box sx={{ width: { xs: '100%', md: '50%' }, position: 'relative' }}>
            <Box sx={{ position: 'relative', width: '100%', paddingTop: '100%', bgcolor: '#f5f5f5', borderRadius: 2, overflow: 'hidden' }}>
              <img
                src={product.imageUrl || 'https://via.placeholder.com/600x600?text=No+Image'}
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
              {/* 이미지 슬라이드 인디케이터 (간략화) */}
              <Box sx={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1 }}>
                {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                  <Box
                    key={index}
                    sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: index === 0 ? '#555' : '#ccc', cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </Box>
             {/* 이미지 좌우 버튼 (선택적) */}
            <IconButton sx={{ position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.3)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } }}>
              <NavigateBeforeIcon />
            </IconButton>
            <IconButton sx={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', bgcolor: 'rgba(0,0,0,0.3)', color: 'white', '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' } }}>
              <NavigateNextIcon />
            </IconButton>
          </Box>

          {/* 2. 오른쪽: 상품 정보 및 액션 버튼 */}
          <Box sx={{ width: { xs: '100%', md: '50%' }, display: 'flex', flexDirection: 'column' }}>
            {/* 상품 제목 */}
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {product.title}
            </Typography>
            {/* 가격 */}
            <Typography variant="h4" fontWeight="bold" sx={{ mt: 1, mb: 2 }}>
              {product.price?.toLocaleString()}
              <Typography component="span" variant="h5" sx={{ ml: 0.5 }}>원</Typography>
            </Typography>
            {/* 통계 (찜, 조회수, 시간) + 신고 */}
            <Stack direction="row" spacing={2} sx={{ color: 'text.secondary', mb: 2, alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">{favoriteCount}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <VisibilityIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">{viewCount}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <AccessTimeIcon sx={{ fontSize: 18 }} />
                <Typography variant="body2">{timeAgo}</Typography>
              </Box>
              <Box sx={{ flexGrow: 1 }} /> {/* 오른쪽 정렬용 빈 공간 */}
              <Button size="small" sx={{ color: '#999', fontSize: '12px', minWidth: 'auto', p: 0 }}>신고하기</Button>
            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* 상품 상태, 배송비 등 */}
            <Stack spacing={1.5} sx={{ mb: 3 }}>
              <Stack direction="row">
                <Typography variant="body2" color="text.secondary" sx={{ width: 80, flexShrink: 0 }}>상품상태</Typography>
                <Typography variant="body2" fontWeight="medium">{product.condition}</Typography>
              </Stack>
              <Stack direction="row">
                <Typography variant="body2" color="text.secondary" sx={{ width: 80, flexShrink: 0 }}>배송비</Typography>
                <Typography variant="body2" fontWeight="medium">일반 4,000원</Typography>
              </Stack>
            </Stack>

            {/* [수정] 버튼들을 flexGrow 대신 여기에 배치 */}
            {/* 액션 버튼들 */}
            <Stack direction="row" spacing={1.5} sx={{ mt: 'auto' }}> {/* mt: 'auto'로 아래로 밀착 */}
              {/* 찜 버튼 (스타일 수정) */}
              <Button
                variant="outlined"
                onClick={handleFavoriteToggle}
                sx={{
                  minWidth: 'auto', // 너비 자동 조절
                  width: 'auto', // 너비 자동 조절
                  height: '56px',
                  borderColor: '#ddd',
                  bgcolor: '#f0f0f0', // 이미지와 유사한 회색 배경
                  color: isFavorite ? '#FF6B6B' : '#555', // 아이콘 색상도 같이 변경되도록
                  display: 'flex',
                  flexDirection: 'column', // 아이콘과 텍스트 세로 배치
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1.2,
                  px: 1, // 좌우 패딩 줄임
                  '& .MuiButton-startIcon': { margin: 0 }, // 아이콘 마진 제거
                  '&:hover': { bgcolor: '#e0e0e0', borderColor: '#ccc' }
                }}
              >
                {isFavorite ? <FavoriteIcon sx={{ mb: 0.5 }} /> : <FavoriteBorderIcon sx={{ mb: 0.5 }} />}
                <Typography variant="caption" sx={{ fontSize: '11px' }}>찜 {favoriteCount}</Typography>
              </Button>
              {/* 번개톡 버튼 (스타일 수정) */}
              <Button
                variant="contained"
                startIcon={<ChatIcon />}
                sx={{
                  flex: 1, // 비율 차지
                  height: '56px',
                  bgcolor: '#ffae00', // 번개장터 오렌지
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: '#e69a00' }
                }}
              >
                번개톡
              </Button>
              {/* 바로구매 버튼 (스타일 수정) */}
              <Button
                variant="contained"
                sx={{
                  flex: 1, // 비율 차지
                  height: '56px',
                  bgcolor: '#f70000', // 번개장터 빨강
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  '&:hover': { bgcolor: '#d60000' }
                }}
              >
                바로구매
              </Button>
            </Stack>
            {/* 안전결제 안내 */}
            <Box sx={{ mt: 2, p: 1.5, bgcolor: '#E8F4FD', borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <VerifiedIcon sx={{ fontSize: 18, color: '#1976D2', mr: 1 }} />
              <Typography variant="body2" color="#1976D2" fontWeight="medium">
                안전결제 수수료 없이 구매하세요
              </Typography>
            </Box>
          </Box>
        </Stack>

        {/* --- 하단: 판매자 정보, 상세 정보 등 (이전과 동일) --- */}

        {/* 판매자 정보 */}
        <Paper variant="outlined" sx={{ my: 4, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ mr: 2, bgcolor: '#4FC3F7' }}><StorefrontIcon /></Avatar>
            <Typography variant="h6" fontWeight="bold">{product.seller || '판매자'}</Typography>
          </Box>
          <Button variant="outlined" size="small" sx={{ borderColor: '#ddd', color: '#555' }}>상점 보기</Button>
        </Paper>

        {/* 상품 설명 */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>상품 설명</Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7, color: '#333' }}>
            {product.description || '상품 설명이 없습니다.'}
          </Typography>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* 상품 정보 (테이블 형태 유지) */}
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>상품 정보</Typography>
          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', py: 1.5 }}><Typography variant="body1" color="text.secondary" sx={{ width: '150px', flexShrink: 0 }}>• 상품상태</Typography><Chip label={product.condition} sx={{ bgcolor: conditionColor, color: 'white', fontWeight: 'bold' }} /></Box>
            <Box sx={{ display: 'flex', py: 1.5 }}><Typography variant="body1" color="text.secondary" sx={{ width: '150px', flexShrink: 0 }}>• 카테고리</Typography><Typography variant="body1" fontWeight="medium">{product.category}</Typography></Box>
            <Box sx={{ display: 'flex', py: 1.5 }}><Typography variant="body1" color="text.secondary" sx={{ width: '150px', flexShrink: 0 }}>• 전공/학과</Typography><Typography variant="body1" fontWeight="medium">{product.major}</Typography></Box>
            <Box sx={{ display: 'flex', py: 1.5 }}><Typography variant="body1" color="text.secondary" sx={{ width: '150px', flexShrink: 0 }}>• 직거래지역</Typography><Typography variant="body1" fontWeight="medium">{product.location}</Typography></Box>
          </Box>
        </Box>

        {/* 지도 컴포넌트 */}
        {product.location && (
          <Box sx={{ my: 4 }}>
            <ProductMap locationName={product.location} />
          </Box>
        )}

        {/* 차트 컴포넌트 */}
        {(product.priceHistory && product.priceHistory.length > 0) && (
          <Box sx={{ my: 4 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>최근 시세</Typography>
            <PriceChart
              labels={product.priceHistory.map((_, i) => i === 0 ? '등록 시' : `${i}회차`)}
              prices={product.priceHistory}
            />
          </Box>
        )}

        {/* 수정/삭제 버튼 */}
        <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'center' }}>
          <Button size="small" variant="outlined" onClick={() => navigate(`/edit/${id}`)} sx={{ color: '#666', borderColor: '#e0e0e0' }}>수정</Button>
          <Button size="small" variant="outlined" onClick={() => setDeleteDialogOpen(true)} sx={{ color: '#f44336', borderColor: '#f44336' }}>삭제</Button>
        </Box>

      </Box> {/* End of maxWidth: 800px Box */}

      {/* 삭제 다이얼로그 (동일) */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>상품 삭제</DialogTitle>
        <DialogContent>
          <Typography>정말로 이 상품을 삭제하시겠습니까?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>취소</Button>
          <Button onClick={handleDelete} color="error" variant="contained">삭제</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

// [수정] 시간 계산 함수 이름 변경 (중복 방지)
function timeAgoCalc(dateParam) {
  if (!dateParam) return null;
  const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
  const today = new Date();
  const seconds = Math.round((today - date) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return '방금 전';
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  return `${days}일 전`;
}

export default DetailPage;

