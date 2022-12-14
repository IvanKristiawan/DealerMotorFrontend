import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { tempUrl } from "../../../../contexts/ContextProvider";
import { Loader } from "../../../../components";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const TambahWarna = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [namaWarna, setNamaWarna] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClickOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    if (namaWarna.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        let tempNamaWarna = await axios.post(`${tempUrl}/getNamaWarna`, {
          namaWarna,
          id: user._id,
          token: user.token
        });
        if (tempNamaWarna.data.length > 0) {
          handleClickOpenAlert();
        } else {
          setLoading(true);
          await axios.post(`${tempUrl}/saveWarna`, {
            namaWarna,
            id: user._id,
            token: user.token
          });
          setLoading(false);
          navigate("/warna");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Paper sx={container} elevation={3}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Tambah Warna
      </Typography>
      <Dialog
        open={openAlert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Data Nama Sama`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {`Nama Warna ${namaWarna} sudah ada, ganti Nama Warna!`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlert}>Ok</Button>
        </DialogActions>
      </Dialog>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            error={error && namaWarna.length === 0 && true}
            helperText={
              error && namaWarna.length === 0 && "Nama Warna harus diisi!"
            }
            id="outlined-basic"
            label="Nama Warna"
            variant="outlined"
            value={namaWarna}
            onChange={(e) => setNamaWarna(e.target.value.toUpperCase())}
          />
        </Box>
      </Box>
      <Box sx={spacingTop}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/warna")}
          sx={{ marginRight: 2 }}
        >
          {"< Kembali"}
        </Button>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={saveUser}>
          Simpan
        </Button>
      </Box>
      <Divider sx={spacingTop} />
      {error && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={alertBox}>
            Data belum terisi semua!
          </Alert>
        </Snackbar>
      )}
    </Paper>
  );
};

export default TambahWarna;

const container = {
  p: 4,
  backgroundColor: "white",
  borderRadius: "20px"
};

const subTitleText = {
  fontWeight: "900"
};

const dividerStyle = {
  mt: 2
};

const showDataContainer = {
  mt: 4,
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "row"
  }
};

const showDataWrapper = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  maxWidth: {
    md: "40vw"
  }
};

const spacingTop = {
  mt: 4
};

const alertBox = {
  width: "100%"
};

const beforeLink = {
  cursor: "pointer",
  "&:hover": { color: "blue" }
};
