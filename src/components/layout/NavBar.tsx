import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import FinCalcLogo from "../../assets/FinCalcLogo.png";

export const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ boxShadow: "none" }}>
        <Toolbar sx={{ pl: { xs: 0 }, pr: { xs: 0 } }}>
          <img src={FinCalcLogo} />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
