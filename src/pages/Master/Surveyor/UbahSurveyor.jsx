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
  Autocomplete,
  Paper
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const UbahSurveyor = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeSurveyor, setKodeSurveyor] = useState("");
  const [namaSurveyor, setNamaSurveyor] = useState("");
  const [jenisSurveyor, setJenisSurveyor] = useState("");
  const [teleponSurveyor, setTeleponSurveyor] = useState("");
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
    const response = await axios.post(`${tempUrl}/surveyors/${id}`, {
      id: user._id,
      token: user.token
    });
    setKodeSurveyor(response.data.kodeSurveyor);
    setNamaSurveyor(response.data.namaSurveyor);
    setJenisSurveyor(response.data.jenisSurveyor);
    setTeleponSurveyor(response.data.teleponSurveyor);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (
      namaSurveyor.length === 0 ||
      jenisSurveyor.length === 0 ||
      teleponSurveyor.length === 0
    ) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/updateSurveyor/${id}`, {
          namaSurveyor,
          jenisSurveyor,
          teleponSurveyor,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate(`/surveyor/${id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const jenisSurveyorOption = [{ label: "CMO" }, { label: "SURVEYOR" }];

  if (loading) {
    return <Loader />;
  }

  return (
    <Paper sx={container} elevation={3}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Ubah Surveyor
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            error={error && kodeSurveyor.length === 0 && true}
            helperText={
              error && kodeSurveyor.length === 0 && "Kode harus diisi!"
            }
            id="outlined-basic"
            label="Kode"
            variant="outlined"
            value={kodeSurveyor}
            InputProps={{
              readOnly: true
            }}
            onChange={(e) => setKodeSurveyor(e.target.value)}
          />
          <TextField
            error={error && namaSurveyor.length === 0 && true}
            helperText={
              error && namaSurveyor.length === 0 && "Nama Surveyor harus diisi!"
            }
            id="outlined-basic"
            label="Nama Surveyor"
            variant="outlined"
            sx={spacingTop}
            value={namaSurveyor}
            onChange={(e) => setNamaSurveyor(e.target.value.toUpperCase())}
          />
        </Box>
        <Box sx={[showDataWrapper, { marginLeft: 4 }]}>
          <TextField
            error={error && teleponSurveyor.length === 0 && true}
            helperText={
              error &&
              teleponSurveyor.length === 0 &&
              "Telepon Surveyor harus diisi!"
            }
            id="outlined-basic"
            label="Telepon Surveyor"
            variant="outlined"
            value={teleponSurveyor}
            onChange={(e) => setTeleponSurveyor(e.target.value.toUpperCase())}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={jenisSurveyorOption}
            renderInput={(params) => (
              <TextField
                error={error && jenisSurveyor.length === 0 && true}
                helperText={
                  error && jenisSurveyor.length === 0 && "Jenis harus diisi!"
                }
                {...params}
                label="Jenis Surveyor"
              />
            )}
            sx={spacingTop}
            onInputChange={(e, value) => setJenisSurveyor(value)}
            value={{ label: jenisSurveyor }}
          />
        </Box>
      </Box>
      <Box sx={spacingTop}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/surveyor")}
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

export default UbahSurveyor;

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
