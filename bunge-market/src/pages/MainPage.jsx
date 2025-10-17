import { Container, Grid, Typography, Button } from "@mui/material";
import axios from "axios";

import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function MainPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://68db330023ebc87faa323a6c.mockapi.io/bunge")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        상품 목록
      </Typography>

      <Grid container spacing={3}>
        {products.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p.id}>
            <ProductCard
              title={p.title}
              price={p.price}
              location={p.location}
              image={p.image}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
