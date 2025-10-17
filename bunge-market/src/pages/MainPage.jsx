import { Container, Grid, Typography, Button } from "@mui/material";
import ProductCard from "../components/ProductCard";

export default function MainPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        상품 목록
      </Typography>
      <Button variant="contained" color="secondary" sx={{ mb: 2 }}>
        최신순 정렬
      </Button>
      <Grid container spacing={3}>
        {/* 임시 데이터 예시 */}
        {[1, 2, 3].map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item}>
            <ProductCard />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
