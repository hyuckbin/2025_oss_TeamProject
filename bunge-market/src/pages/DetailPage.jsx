// src/pages/DetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Grid, Paper, Chip, Button, CircularProgress, Divider
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatIcon from '@mui/icons-material/Chat';
import { getProduct } from '../services/api';
import Header from '../components/Header';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (e) {
        alert('상품 정보를 불러오는 데 실패했습니다.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return <Typography>상품이 존재하지 않습니다.</Typography>;
  }

  return (
    <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', justifyContent: 'center' }}>
      <Header />

      <Box sx={{ maxWidth: 1000, mx: 'auto', pt: 6, px: 2 }}>
        <Grid container spacing={4} alignItems="stretch">
          {/* 왼쪽: 사진 */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: '#fff'
              }}
            >
              <img
                src={product.imageUrl}
                alt={product.title}
                style={{
                  width: '100%',
                  maxHeight: '500px',
                  objectFit: 'contain'
                }}
              />
            </Paper>
          </Grid>

          {/* 오른쪽: 상품 정보 */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              {/* 제목 + 가격 */}
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {product.title}
              </Typography>
              <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
                {product.price.toLocaleString()}원
              </Typography>

              {/* 조회수/찜/시간 */}
              <Box sx={{ display: 'flex', gap: 2, color: '#999', fontSize: '14px', mb: 2 }}>
                <span>❤️ 1</span>
                <span>👁 63</span>
                <span>⏱ 55분 전</span>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* 상품 정보 항목 */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, fontSize: '16px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>상품상태</Typography>
                  <Typography>{product.condition}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>램 용량</Typography>
                  <Typography>8GB</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>저장용량</Typography>
                  <Typography>256GB</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>배송비</Typography>
                  <Typography>일반 4,000원</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>직거래지역</Typography>
                  <Typography>{product.location}</Typography>
                </Box>
              </Box>

              {/* 버튼 영역 */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  mt: 'auto', // 하단 정렬
                  pt: 3
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<FavoriteBorderIcon />}
                  sx={{
                    flex: 1,
                    height: '50px',
                    color: '#666',
                    borderColor: '#ccc',
                    '&:hover': {
                      borderColor: '#bbb',
                      bgcolor: '#f5f5f5'
                    }
                  }}
                >
                  찜 1
                </Button>
                <Button
                  variant="contained"
                  startIcon={<ChatIcon />}
                  sx={{
                    flex: 1,
                    height: '50px',
                    bgcolor: '#FF9800',
                    '&:hover': {
                      bgcolor: '#FB8C00'
                    }
                  }}
                >
                  번개톡
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    flex: 1,
                    height: '50px',
                    bgcolor: '#D32F2F',
                    color: '#fff',
                    '&:hover': {
                      bgcolor: '#C62828'
                    }
                  }}
                >
                  바로구매
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default DetailPage;
