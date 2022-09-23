import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { tempUrl } from "../../../contexts/ContextProvider";
import { Loader } from "../../../components";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const TambahLeasing = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [namaLeasing, setNamaLeasing] = useState("");
  const [alamatLeasing, setAlamatLeasing] = useState("");
  const [teleponLeasing, setTeleponLeasing] = useState("");
  const [picLeasing, setPicLeasing] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    if (namaLeasing.length === 0 || picLeasing.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/saveLeasing`, {
          namaLeasing,
          alamatLeasing,
          teleponLeasing,
          picLeasing,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate("/leasing");
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Tambah Leasing
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            error={error && namaLeasing.length === 0 && true}
            helperText={
              error && namaLeasing.length === 0 && "Nama Leasing harus diisi!"
            }
            id="outlined-basic"
            label="Nama Leasing"
            variant="outlined"
            value={namaLeasing}
            onChange={(e) => setNamaLeasing(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Alamat"
            variant="outlined"
            value={alamatLeasing}
            sx={spacingTop}
            onChange={(e) => setAlamatLeasing(e.target.value)}
          />
        </Box>
        <Box sx={[showDataWrapper, { marginLeft: 4 }]}>
          <TextField
            id="outlined-basic"
            label="Telepon"
            variant="outlined"
            value={teleponLeasing}
            onChange={(e) => setTeleponLeasing(e.target.value)}
          />
          <TextField
            error={error && picLeasing.length === 0 && true}
            helperText={
              error && picLeasing.length === 0 && "PIC Cabang harus diisi!"
            }
            id="outlined-basic"
            label="PIC"
            variant="outlined"
            value={picLeasing}
            sx={spacingTop}
            onChange={(e) => setPicLeasing(e.target.value)}
          />
        </Box>
      </Box>
      <Box sx={spacingTop}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/leasing")}
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
    </Box>
  );
};

export default TambahLeasing;

const container = {
  pt: 4
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
