import { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getbunge } from '../services/api';
import { MAJORS } from '../constants';
import { Box } from '@mui/material';

import {
  Grid, Stack, Typography, Button, Drawer,
  FormGroup, FormControlLabel, Checkbox, Divider, Skeleton
} from '@mui/material';
import ProductCard from '../components/ProductCard';

export default function MainPage({ searchQuery }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('latest');
  const [open, setOpen] = useState(false);
  const [majSel, setMajSel] = useState(() => new Set());

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await getbunge();
        setItems(data);
      } finally { setLoading(false); }
    })();
  }, []);

  const filtered = useMemo(() => {
    let base = items;
    if (searchQuery) base = base.filter(p => (p.title || '').toLowerCase().includes(searchQuery.toLowerCase()));
    if (majSel.size > 0) base = base.filter(p => majSel.has(p.major));

    const arr = [...base];
    if (sort === 'priceAsc') arr.sort((a, b) => (a.price || 0) - (b.price || 0));
    else if (sort === 'priceDesc') arr.sort((a, b) => (b.price || 0) - (a.price || 0));
    else arr.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    return arr;
  }, [items, searchQuery, sort, majSel]);
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
        {/* 왼쪽: 검색 결과 */}
        <Typography variant="subtitle1" sx={{ fontSize: 15 }}>
          <Typography component="span" color="error" fontWeight={700}>
            {}
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
            전공별 필터
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 2,              // 카드 사이 여백
            justifyItems: 'center', // 가운데 정렬
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



      {/* Drawer (전공 필터) */}
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Stack sx={{ width: 280, p: 2 }} spacing={2}>
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
