import { useForm } from "react-hook-form";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

  export default function AddPage() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
  try {
    await axios.post("https://68db330023ebc87faa323a6c.mockapi.io/bunge", {
      ...data,
      date: new Date().toISOString().slice(0, 10),
    });
    alert("상품이 등록되었습니다!");
    navigate("/");
    reset();
  } catch (error) {
    console.error(error);
    alert("상품 등록 실패!");
  }
};
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        상품 등록
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField label="상품명" {...register("title", { required: true })} />
        <TextField
          label="가격"
          type="number"
          {...register("price", { required: true })}
        />
        <TextField label="카테고리" {...register("category")} />
        <TextField label="거래 지역" {...register("location")} />
        <TextField label="이미지 URL" {...register("image")} />
        <TextField
          label="상세 설명"
          multiline
          rows={4}
          {...register("description")}
        />
        <Button type="submit" variant="contained">
          등록하기
        </Button>
      </Box>
    </Container>
  );
}
