import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Stack, Typography } from "@mui/material";
import taxInfo from "../../../../domain/features/netSalaryCalculator/content/taxInfo.json";

export const TaxInfoList = () => {
  return (
    <List>
      {taxInfo.map((item) => (
        <ListItem
          key={item.id}
          disablePadding
          sx={(theme) => ({
            mb: 1,
            borderBottom: `1px solid ${theme.palette.primary.main}}`,
          })}
        >
          <Stack
            direction="row"
            alignItems="end"
            columnGap={2}
            sx={{ width: "100%" }}
          >
            <Stack flex={1}>
              <Typography
                variant="body2"
                sx={{ color: "inherit", fontWeight: "bold" }}
              >
                {item.description.title}
              </Typography>

              <Stack flexDirection="row" columnGap={1}>
                {item.description.valueDescription && (
                  <Typography variant="body2" sx={{ color: "inherit" }}>
                    {item.description.valueDescription}
                  </Typography>
                )}

                {item.description.value && (
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: "bold", color: "inherit" }}
                  >
                    {item.description.value}
                  </Typography>
                )}
              </Stack>
            </Stack>

            <Stack>
              <Typography
                sx={(theme) => ({
                  color: theme.palette.primary.main,
                  fontSize: 20,
                  fontWeight: "bold",
                })}
              >
                {item.value}
              </Typography>
            </Stack>
          </Stack>
        </ListItem>
      ))}
    </List>
  );
};
