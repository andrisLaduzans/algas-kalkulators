import { ReactNode } from "react";
import { Box, Container, Stack } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

interface Props {
  children: ReactNode;
  headerNode: ReactNode;
  footerNode: ReactNode;
}

export const MainLayout = ({ children, headerNode, footerNode }: Props) => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Stack
        sx={(theme) => ({
          minHeight: "100%",
          width: "100%",
          bgcolor: theme.palette.background.paper,
        })}
      >
        <Stack
          sx={(theme) => ({
            width: "100%",
            bgcolor: theme.palette.primary.main,
          })}
        >
          <Container maxWidth="md">{headerNode}</Container>
        </Stack>

        <Stack sx={{ flex: 1, overflow: "auto" }}>
          <Stack sx={{ flex: 1 }}>
            <Container maxWidth="xs" sx={{ flex: 1, position: "relative" }}>
              <AccountBalanceWalletIcon
                sx={(theme) => ({
                  fontSize: 280,
                  position: "absolute",
                  right: 0,
                  top: 0,
                  color: theme.palette.background.default,
                })}
              />

              <Box sx={{ position: "relative" }}>{children}</Box>
            </Container>
          </Stack>

          <Stack
            sx={(theme) => ({
              bgcolor: theme.palette.secondary.main,
              color: theme.palette.background.default,
            })}
          >
            <Container maxWidth="md">{footerNode}</Container>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
