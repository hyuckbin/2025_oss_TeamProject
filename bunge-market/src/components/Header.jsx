import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component={Link} to="/" color="inherit" sx={{ textDecoration: "none" }}>
          번개마켓
        </Typography>
        <div>
          <Button color="inherit" component={Link} to="/">
            홈
          </Button>
          <Button color="inherit" component={Link} to="/add">
            상품 등록
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}
