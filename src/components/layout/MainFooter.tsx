import { Box, Typography } from "@mui/material";

export const MainFooter = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography style={{ textAlign: "center", color: "inherit" }}>
        Made by Andris La for Codelex
      </Typography>

      <Typography style={{ textAlign: "center", color: "inherit" }}>
        2024
      </Typography>
    </Box>
  );
};
