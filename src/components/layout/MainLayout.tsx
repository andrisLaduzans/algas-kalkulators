import { Box, Container, Stack } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  headerNode: ReactNode;
  footerNode: ReactNode;
}

export const MainLayout = ({ children, headerNode, footerNode }: Props) => {
  return (
    <Box
      sx={(theme) => ({
        height: "100vh",
        width: "100vw",
        bgcolor: theme.palette.background.paper,
      })}
    >
      <Stack sx={{ minHeight: "100%", width: "100%" }}>
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
            <Container maxWidth="xs" sx={{ flex: 1 }}>
              {children}
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
