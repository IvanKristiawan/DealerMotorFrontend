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
  Paper
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const UbahMarketing = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [namaMarketing, setNamaMarketing] = useState("");
  const [teleponMarketing, setTeleponMarketing] = useState("");
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
    const response = await axios.post(`${tempUrl}/marketings/${id}`, {
      id: user._id,
      token: user.token
    });
    setNamaMarketing(response.data.namaMarketing);
    setTeleponMarketing(response.data.teleponMarketing);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (namaMarketing.length === 0 || teleponMarketing.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/updateMarketing/${id}`, {
          namaMarketing,
          teleponMarketing,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate(`/marketing/${id}`);
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
        Ubah Marketing
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            error={error && namaMarketing.length === 0 && true}
            helperText={
              error && namaMarketing.length === 0 && "Nama harus diisi!"
            }
            id="outlined-basic"
            label="Nama"
            variant="outlined"
            value={namaMarketing}
            onChange={(e) => setNamaMarketing(e.target.value.toUpperCase())}
          />
          <TextField
            error={error && teleponMarketing.length === 0 && true}
            helperText={
              error && teleponMarketing.length === 0 && "Telepon harus diisi!"
            }
            id="outlined-basic"
            label="Telepon"
            variant="outlined"
            value={teleponMarketing}
            sx={spacingTop}
            onChange={(e) => setTeleponMarketing(e.target.value.toUpperCase())}
          />
        </Box>
      </Box>
      <Box sx={spacingTop}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/marketing")}
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

export default UbahMarketing;

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
