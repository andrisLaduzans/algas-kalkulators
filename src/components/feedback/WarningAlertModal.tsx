import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Button, Container, Stack, Typography } from "@mui/material";

interface Props {
  isOpen: boolean;
  title: string;
  description?: string;
  primaryActionTitle: string;
  onPrimaryAction: () => void;
  secondaryActionTitle: string;
  onSecondaryAction: () => void;
}

export const WarningAlertModal = ({
  isOpen,
  title,
  description,
  primaryActionTitle,
  onPrimaryAction,
  secondaryActionTitle,
  onSecondaryAction,
}: Props) => {
  return (
    <Modal open={isOpen} onClose={() => null}>
      <Container maxWidth="sm" sx={{ height: "100vh" }}>
        <Stack sx={{ height: "100%", justifyContent: "center" }}>
          <Alert severity="warning">
            <AlertTitle>{title}</AlertTitle>

            <Typography>{description}</Typography>

            <Stack direction={"row"} columnGap={2}>
              <Button variant="outlined" onClick={onSecondaryAction}>
                {secondaryActionTitle}
              </Button>

              <Button variant="contained" onClick={onPrimaryAction}>
                {primaryActionTitle}
              </Button>
            </Stack>
          </Alert>
        </Stack>
      </Container>
    </Modal>
  );
};
