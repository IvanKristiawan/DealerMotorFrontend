import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
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
  Paper
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const UbahWarna = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [namaWarna, setNamaWarna] = useState("");
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
    const response = await axios.post(`${tempUrl}/warnas/${id}`, {
      id: user._id,
      token: user.token
    });
    setNamaWarna(response.data.namaWarna);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (namaWarna.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/updateWarna/${id}`, {
          namaWarna,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate(`/warna/${id}`);
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
        Ubah Warna
      </Typography>
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
            sx={spacingTop}
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
    </Paper>
  );
};

export default UbahWarna;

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
