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

const UbahMarketing = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [namaMarketing, setNamaMarketing] = useState("");
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
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (namaMarketing.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/updateMarketing/${id}`, {
          namaMarketing,
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
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography
          underline="hover"
          color="inherit"
          sx={beforeLink}
          onClick={() => navigate("/marketing")}
        >
          Marketing
        </Typography>
        <Typography color="text.primary">Ubah Marketing</Typography>
      </Breadcrumbs>
      <Box sx={container}>
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
              onChange={(e) => setNamaMarketing(e.target.value)}
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

export default UbahMarketing;

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