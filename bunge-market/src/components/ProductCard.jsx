import { Card, CardContent, CardMedia, Typography, Stack, Box } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// 몇 분 전 / 몇 시간 전 계산
function timeAgo(timestamp) {
  if (!timestamp) return '방금 전';
  const now = new Date();
  const past = new Date(timestamp * 1000); // 초 → 밀리초 변환
  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return '방금 전';
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

export default function ProductCard({ item }) {
  return (
    <Card
      sx={{
        width: 220,
        borderRadius: 2,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        '&:hover': {
          boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
          transform: 'translateY(-3px)',
        },
      }}
    >
      {/* 이미지 */}
      <CardMedia
        component="img"
        image={item.imageUrl || 'https://via.placeholder.com/220x220?text=No+Image'}
        alt={item.title}
        sx={{
          width: '100%',
          height: 180,
          objectFit: 'cover',
        }}
      />

      {/* 콘텐츠 */}
      <CardContent sx={{ p: 1.2, pb: 1.5 }}>
        {/* 제목과 가격을 한 줄 구조로 */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.9rem',
              fontWeight: 500,
              color: '#222',
              flex: 1,
              mr: 1,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.9rem',
              fontWeight: 400,
              color: '#999',
              whiteSpace: 'nowrap',
            }}
          >
            {timeAgo(item.createdAt)}
          </Typography>
        </Box>

        {/* 가격 */}
        <Typography
          variant="body1"
          sx={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#111',
            mt: 0.5,
            mb: 0.5,
          }}
        >
          {Number(item.price || 0).toLocaleString()}원
        </Typography>

        {/* 지역 */}
        <Stack direction="row" alignItems="center" spacing={0.4}>
          <LocationOnIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
            }}
          >
            {item.region || item.location || '지역정보 없음'}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
