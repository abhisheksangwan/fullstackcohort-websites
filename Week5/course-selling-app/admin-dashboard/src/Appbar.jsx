import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Appbar() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        backgroundColor: "grey",
      }}
    >
      <div>
        <Typography variant={"h6"} style={{ marginLeft: "10px" }}>
          Coursera
        </Typography>
      </div>
      <div
        style={{
          marginRight: "10px",
          display: "flex",
        }}
      >
        <Button
          variant={"contained"}
          onClick={() => {
            navigate("/signup");
          }}
          style={{ marginRight: "15px" }}
        >
          Sign up
        </Button>
        <Button
          variant={"contained"}
          onClick={() => {
            navigate("/login");
          }}
        >
          Sign in
        </Button>
      </div>
    </div>
  );
}

export default Appbar;
