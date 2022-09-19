import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { tempUrl } from "../../contexts/ContextProvider";
import { Loader } from "../../components";
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

const TambahWilayah = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [namaWilayah, setNamaWilayah] = useState("");
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
    if (namaWilayah.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/saveWilayah`, {
          namaWilayah,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate("/wilayah");
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
        Tambah Wilayah
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            error={error && namaWilayah.length === 0 && true}
            helperText={
              error && namaWilayah.length === 0 && "Nama Wilayah harus diisi!"
            }
            id="outlined-basic"
            label="Nama Wilayah"
            variant="outlined"
            value={namaWilayah}
            onChange={(e) => setNamaWilayah(e.target.value)}
          />
        </Box>
      </Box>
      <Box sx={spacingTop}>
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

export default TambahWilayah;

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
