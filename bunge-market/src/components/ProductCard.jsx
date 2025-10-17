import { Card, CardContent, Typography, CardMedia } from "@mui/material";

export default function ProductCard({ title, price, location, image }) {
  return (
    <Card>
      <CardMedia
        component="img"
        height="160"
        image={image || "https://via.placeholder.com/300"}
        alt="상품 이미지"
      />
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {price}만원 · {location}
        </Typography>
      </CardContent>
    </Card>
  );
}
