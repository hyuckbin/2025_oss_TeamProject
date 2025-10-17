import { Card, CardContent, Typography, CardMedia } from "@mui/material";

export default function ProductCard() {
  return (
    <Card>
      <CardMedia
        component="img"
        height="160"
        image="https://th.bing.com/th/id/OIP.IOYgwkeK1yeOG6Po1byA4gHaEK?w=333&h=187&c=7&r=0&o=7&cb=12&dpr=1.3&pid=1.7&rm=3"
        alt="상품 이미지"
      />
      <CardContent>
        <Typography variant="h6">아이폰 15 Pro</Typography>
        <Typography variant="body2" color="text.secondary">
          120만원 · 서울
        </Typography>
      </CardContent>
    </Card>
  );
}
