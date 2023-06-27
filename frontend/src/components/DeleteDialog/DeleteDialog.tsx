import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface Props {
  title: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  callBack: () => void;
}

const DeleteDialog = ({ title, open, setOpen, callBack }: Props) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle sx={{ pt: 3, mb: 2 }} variant="h5">
        {title}
      </DialogTitle>
      <DialogContent>
        <Typography>This action cannot be undone</Typography>
      </DialogContent>
      <DialogActions>
        <Box sx={{ pb: 2 }}>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            sx={{ mr: 5 }}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            sx={{ mr: 2 }}
            onClick={() => {
              callBack();
              setOpen(false);
            }}
            variant="contained"
          >
            Confirm
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
