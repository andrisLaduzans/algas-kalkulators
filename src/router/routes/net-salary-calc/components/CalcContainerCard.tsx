import {
  Box,
  Card,
  Stack,
  SvgIconTypeMap,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ReactNode } from "react";
import { TaxInfoList } from "./TaxInfoList";

interface Props {
  headerProps: {
    text: string;
    icon?: OverridableComponent<SvgIconTypeMap<object, "svg">> & {
      muiName: string;
    };
  };

  children: ReactNode;
  sx?: SxProps<Theme>;
}

export const CalcContainerCard = ({ headerProps, children, sx }: Props) => {
  return (
    <Card
      sx={[
        {
          borderRadius: "40px",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      elevation={4}
    >
      <Stack
        direction="row"
        alignItems={"center"}
        sx={(theme) => ({ bgcolor: theme.palette.secondary.main, p: 3 })}
      >
        <Stack direction="row" flex={1}>
          <Typography
            sx={(theme) => ({
              color: theme.palette.background.default,
              fontWeight: "bold",
              fontSize: 20,
            })}
          >
            {headerProps.text}
          </Typography>
        </Stack>

        {headerProps.icon && (
          <Stack>
            <headerProps.icon
              sx={(theme) => ({ color: theme.palette.primary.main })}
            />
          </Stack>
        )}
      </Stack>

      <Stack sx={{ p: 2 }}>{children}</Stack>

      <Box
        sx={(theme) => ({
          p: 3,
          bgcolor: theme.palette.secondary.main,
          color: theme.palette.background.default,
        })}
      >
        <TaxInfoList />
      </Box>
    </Card>
  );
};
