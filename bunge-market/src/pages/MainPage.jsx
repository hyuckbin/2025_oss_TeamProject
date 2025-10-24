import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getbunge } from '../services/api';
// 1. CATEGORIES 임포트
import { MAJORS, CATEGORIES } from '../constants';
import { Box } from '@mui/material';

// 2. MUI 컴포넌트 임포트 (수정 완료)
import {
  Grid,
  Stack,
  Typography,
  Button,
  Drawer,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Divider,
  Skeleton
} from '@mui/material';

import ProductCard from '../components/ProductCard';
// 3. Zustand 스토어 임포트
import useAppStore from '../store/useAppStore';

// 4. searchQuery prop 제거
export default function MainPage() {
  // 5. Zustand 스토어에서 searchQuery 직접 가져오기
  const searchQuery = useAppStore((state) => state.searchQuery);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('latest');
  const [open, setOpen] = useState(false);
  const [majSel, setMajSel] = useState(() => new Set());
  const [catSel, setCatSel] = useState(() => new Set()); // 카테고리 필터 state

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getbunge();
        setItems(data);
      } finally { setLoading(false); }
    })();
  }, []);

  // 6. useMemo 로직 (searchQuery를 사용하도록 이미 수정됨)
  const filtered = useMemo(() => {
    let base = items;
    if (searchQuery) base = base.filter(p => (p.title || '').toLowerCase().includes(searchQuery.toLowerCase()));
    if (majSel.size > 0) base = base.filter(p => majSel.has(p.major));
    if (catSel.size > 0) base = base.filter(p => catSel.has(p.category)); // 카테고리 필터 로직

    const arr = [...base];
    if (sort === 'priceAsc') arr.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sort === 'priceDesc') arr.sort((a, b) => (b.price || 0) - (a.price || 0));
    else arr.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    return arr;
  }, [items, searchQuery, sort, majSel, catSel]); // 7. 의존성 배열에 searchQuery 포함 (catSel도 포함)

  const toggleSet = (set, value) => {
    const next = new Set(set);
    next.has(value) ? next.delete(value) : next.add(value);
    return next;
  };

  return (
    <Stack spacing={3} sx={{ px: { xs: 2, md: 6 }, mt: 3 }}>
      {/* 상단 영역 */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        sx={{ mb: 1 }}
      >
        {/* 왼쪽: 검색 결과 (searchQuery 사용) */}
        <Typography variant="subtitle1" sx={{ fontSize: 15 }}>
          <Typography component="span" color="error" fontWeight={700}>
            {searchQuery || '전체'}
          </Typography>
          의 검색결과{' '}
          <Typography component="span" fontWeight={500}>
            {filtered.length}
          </Typography>
          개
        </Typography>

        {/* 오른쪽: 필터 */}
        <Stack direction="row" spacing={2} alignItems="center">
          {[
            { label: '정확도순', value: 'relevance' },
            { label: '최신순', value: 'latest' },
            { label: '저가순', value: 'priceAsc' },
            { label: '고가순', value: 'priceDesc' },
          ].map((option) => (
            <Typography
              key={option.value}
              onClick={() => setSort(option.value)}
              sx={{
                fontSize: 14,
                fontWeight: sort === option.value ? 700 : 400,
                color: sort === option.value ? 'error.main' : 'text.secondary',
                cursor: 'pointer',
                '&:hover': { color: 'error.main' },
              }}
            >
              {option.label}
            </Typography>
          ))}
          <Button
            variant="outlined"
            onClick={() => setOpen(true)}
            sx={{
              borderColor: '#ddd',
              color: '#333',
              fontWeight: 500,
              height: 32,
              fontSize: 13,
            }}
          >
            필터
          </Button>
        </Stack>
      </Stack>

      {/* 상품 목록 */}
      {loading ? (
        <Grid container spacing={2} justifyContent="center" sx={{ maxWidth: 1320, margin: '0 auto' }}>
          {Array.from({ length: 10 }).map((_, i) => (
            <Grid key={i} item sx={{ width: 220 }}>
              <Skeleton variant="rectangular" height={300} />
            </Grid>
          ))}
        </Grid>
      ) : filtered.length === 0 ? (
        <Typography align="center" sx={{ mt: 5 }}>
          조건에 맞는 상품이 없습니다.
        </Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', // auto-fit 대신 auto-fill 추천
            gap: 2,
            justifyContent: 'flex-start', // ✅ 전체 그리드 왼쪽 정렬
            justifyItems: 'start',        // ✅ 각 아이템도 왼쪽 정렬
            alignItems: 'start',
            maxWidth: 1400,
            mx: 'auto',
            px: 2,
          }}
        >
          {filtered.map((item) => (
            <RouterLink
              key={item.id}
              to={`/product/${item.id}`}
              style={{ textDecoration: 'none', width: '100%' }}
            >
              <ProductCard item={item} />
            </RouterLink>
          ))}
        </Box>

      )}



      {/* Drawer (필터) */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Stack sx={{ width: 280, p: 2 }} spacing={2}>
          {/* 카테고리 필터 UI */}
          <Typography variant="h6">카테고리 필터</Typography>
          <FormGroup>
            {CATEGORIES.map((cat) => (
              <FormControlLabel
                key={cat}
                control={
                  <Checkbox
                    checked={catSel.has(cat)}
                    onChange={() => setCatSel(prev => toggleSet(prev, cat))}
                  />
                }
                label={cat}
              />
            ))}
          </FormGroup>

          <Divider />

          {/* 전공별 필터 UI */}
          <Typography variant="h6">전공별 필터</Typography>
          <FormGroup>
            {MAJORS.map((m) => (
              <FormControlLabel
                key={m}
                control={
                  <Checkbox
                    checked={majSel.has(m)}
                    onChange={() => setMajSel(prev => toggleSet(prev, m))}
                  />
                }
                label={m}
              />
            ))}
          </FormGroup>

          <Divider />

          <Button variant="contained" fullWidth onClick={() => setOpen(false)}>
            적용하기
          </Button>
        </Stack>
      </Drawer>
    </Stack>
  );
}

