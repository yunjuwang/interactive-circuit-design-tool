import { useState } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import SearchIcons from "./SearchIcons.js";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function SearchIconsDialog({ open, handleClose, handleSelect }) {
  const [selectedIcon, setSelectedIcon] = useState("");

  return (
    <>
      <BootstrapDialog keepMounted open={open}>
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Select Pattern
        </DialogTitle>
        <IconButton
          onClick={() => {
            handleClose();
            setSelectedIcon("");
          }}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <SearchIcons
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!selectedIcon}
            variant="contained"
            onClick={() => {
              handleSelect(selectedIcon);
              setSelectedIcon("");
            }}
          >
            Select
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
