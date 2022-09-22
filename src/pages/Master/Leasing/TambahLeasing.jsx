import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { tempUrl } from "../../../contexts/ContextProvider";
import { Loader } from "../../../components";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Card,
  CardActionArea,
  CardMedia,
  Snackbar,
  Alert,
  Breadcrumbs
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import SaveIcon from "@mui/icons-material/Save";
import { KeyOffRounded } from "@mui/icons-material";

const TambahLeasing = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  let [arrayImage, setArrayImage] = useState([]);
  let [arrayImageUrl, setArrayImageUrl] = useState([]);
  let [tempGambarId, setTempGambarId] = useState([]);
  let [tempGambar, setTempGambar] = useState([]);
  const [kodeLeasing, setKodeLeasing] = useState("");
  const [namaLeasing, setNamaLeasing] = useState("");
  const [alamatLeasing, setAlamatLeasing] = useState("");
  const [teleponLeasing, setTeleponLeasing] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getUrlImg();
    getKodeCabangNext();
  }, [arrayImage]);

  const getUrlImg = () => {
    let tempArrayImageUrl = [];
    Object.keys(arrayImage).map(function (key, index) {
      tempArrayImageUrl.push(URL.createObjectURL(arrayImage[key]));
      setArrayImageUrl(tempArrayImageUrl);
    });
  };

  const getKodeCabangNext = async () => {
    const response = await axios.post(`${tempUrl}/leasingsNextLength`, {
      id: user._id,
      token: user.token
    });
    setKodeLeasing(`${response.data}`);
  };

  const saveImage = async (formData) => {
    try {
      setLoading(true);

      arrayImage &&
        (await axios
          .post(
            "https://api.cloudinary.com/v1_1/dbtag5lau/image/upload",
            formData
          )
          .then((response) => {
            tempGambar.push(response.data.url);
            tempGambarId.push(response.data.public_id);
          })
          .catch((e) => {
            console.log(e);
          }));

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const saveUser = async (e) => {
    e.preventDefault();

    if (kodeLeasing.length === 0 || namaLeasing.length === 0) {
      setError(true);
      setOpen(!open);
    } else {
      const formData = new FormData();

      for (let i = 0; i < arrayImage.length; i++) {
        formData.append("file", arrayImage[i]);
        formData.append("upload_preset", "pnwyctyw");
        await saveImage(formData);
      }
      setError(true);
      setOpen(!open);
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/saveLeasing`, {
          gambarId: tempGambarId,
          gambar: tempGambar,
          kodeLeasing,
          namaLeasing,
          alamatLeasing,
          teleponLeasing,
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
        <Typography color="text.primary">Tambah Leasing</Typography>
      </Breadcrumbs>
      <Box sx={container}>
        <Typography color="#757575">Master</Typography>
        <Typography variant="h4" sx={subTitleText}>
          Tambah Leasing
        </Typography>
        <Divider sx={dividerStyle} />
        <Box mt={2} textAlign="center" sx={imagePickerContainer}>
          <input
            accept="image/*"
            type="file"
            id="select-image"
            style={{ display: "none" }}
            onChange={(e) => setArrayImage(e.target.files)}
            multiple
          />
          <label htmlFor="select-image">
            <Button
              variant="contained"
              color="primary"
              component="span"
              endIcon={<FileUploadIcon />}
            >
              Unggah Gambar
            </Button>
          </label>
        </Box>
        <Box sx={listImageContainer}>
          {arrayImageUrl &&
            arrayImage &&
            arrayImageUrl.map((key, i) => (
              <Card sx={imageCard}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="200px"
                    src={key}
                    alt={KeyOffRounded.name}
                  />
                </CardActionArea>
              </Card>
            ))}
        </Box>
        <Box sx={textFieldContainer}>
          <Box sx={textFieldWrapper}>
            <TextField
              error={error && kodeLeasing.length === 0 && true}
              helperText={
                error && kodeLeasing.length === 0 && "Kode Leasing harus diisi!"
              }
              id="outlined-basic"
              label="Kode"
              variant="outlined"
              sx={textFieldStyle}
              value={kodeLeasing}
              onChange={(e) => setKodeLeasing(e.target.value)}
              InputProps={{
                readOnly: true
              }}
            />
            <TextField
              error={error && namaLeasing.length === 0 && true}
              helperText={
                error && namaLeasing.length === 0 && "Nama Leasing harus diisi!"
              }
              id="outlined-basic"
              label="Nama Leasing"
              variant="outlined"
              sx={textFieldStyle}
              value={namaLeasing}
              onChange={(e) => setNamaLeasing(e.target.value)}
            />
          </Box>
          <Box sx={textFieldBox}>
            <TextField
              id="outlined-basic"
              label="Alamat Leasing"
              variant="outlined"
              sx={textFieldStyle}
              value={alamatLeasing}
              onChange={(e) => setAlamatLeasing(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Telepon Leasing"
              variant="outlined"
              sx={textFieldStyle}
              value={teleponLeasing}
              onChange={(e) => setTeleponLeasing(e.target.value)}
            />
          </Box>
        </Box>
        <Box sx={textFieldStyle}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={saveUser}
          >
            Simpan
          </Button>
        </Box>
        <Divider sx={{ mt: 2 }} />
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

export default TambahLeasing;

const container = {
  pt: 4
};

const subTitleText = {
  fontWeight: "900"
};

const dividerStyle = {
  mt: 2,
  mb: 2
};

const imagePickerContainer = {
  display: "flex",
  flexDirection: "column"
};

const listImageContainer = {
  display: "flex",
  flexWrap: "wrap"
};

const imageCard = {
  m: "auto",
  mt: 2
};

const textFieldContainer = {
  mt: 4,
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "row"
  }
};

const textFieldWrapper = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  mr: {
    xs: 0,
    sm: 10
  }
};

const textFieldStyle = {
  mt: 4
};

const textFieldBox = {
  display: "flex",
  flex: 1,
  flexDirection: "column"
};

const alertBox = {
  width: "100%"
};

const beforeLink = {
  cursor: "pointer",
  "&:hover": { color: "blue" }
};
