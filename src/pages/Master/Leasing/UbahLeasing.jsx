import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { tempUrl } from "../../../contexts/ContextProvider";
import { Loader } from "../../../components";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert,
  Breadcrumbs
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const UbahLeasing = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeLeasing, setKodeLeasing] = useState("");
  const [namaLeasing, setNamaLeasing] = useState("");
  const [alamatLeasing, setAlamatLeasing] = useState("");
  const [teleponLeasing, setTeleponLeasing] = useState("");
  const [picLeasing, setPicLeasing] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/leasings/${id}`, {
      id: user._id,
      token: user.token
    });
    setKodeLeasing(response.data.kodeLeasing);
    setNamaLeasing(response.data.namaLeasing);
    setAlamatLeasing(response.data.alamatLeasing);
    setTeleponLeasing(response.data.teleponLeasing);
    setPicLeasing(response.data.picLeasing);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (namaLeasing.length === 0 || picLeasing.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/updateLeasing/${id}`, {
          namaLeasing,
          alamatLeasing,
          teleponLeasing,
          picLeasing,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate(`/leasing/${id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography
          underline="hover"
          color="inherit"
          sx={beforeLink}
          onClick={() => navigate("/leasing")}
        >
          Leasing
        </Typography>
        <Typography color="text.primary">Ubah Leasing</Typography>
      </Breadcrumbs>
      <Box sx={container}>
        <Typography color="#757575">Master</Typography>
        <Typography variant="h4" sx={subTitleText}>
          Ubah Leasing
        </Typography>
        <Divider sx={dividerStyle} />
        <Box sx={showDataContainer}>
          <Box sx={showDataWrapper}>
            <TextField
              error={error && kodeLeasing.length === 0 && true}
              helperText={
                error && kodeLeasing.length === 0 && "Kode harus diisi!"
              }
              id="outlined-basic"
              label="Kode"
              variant="outlined"
              value={kodeLeasing}
              InputProps={{
                readOnly: true
              }}
              onChange={(e) => setKodeLeasing(e.target.value)}
            />
            <TextField
              error={error && namaLeasing.length === 0 && true}
              helperText={
                error && namaLeasing.length === 0 && "Nama Leasing harus diisi!"
              }
              id="outlined-basic"
              label="Nama Leasing"
              variant="outlined"
              sx={spacingTop}
              value={namaLeasing}
              onChange={(e) => setNamaLeasing(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Alamat"
              variant="outlined"
              sx={spacingTop}
              value={alamatLeasing}
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
                error && picLeasing.length === 0 && "PIC Leasing harus diisi!"
              }
              id="outlined-basic"
              label="PIC"
              variant="outlined"
              sx={spacingTop}
              value={picLeasing}
              onChange={(e) => setPicLeasing(e.target.value)}
            />
          </Box>
        </Box>
        <Box sx={spacingTop}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={updateUser}
          >
            Ubah
          </Button>
        </Box>
        <Divider sx={dividerStyle} />
        {error && (
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={alertBox}>
              Data belum terisi semua!
            </Alert>
          </Snackbar>
        )}
      </Box>
    </>
  );
};

export default UbahLeasing;

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
