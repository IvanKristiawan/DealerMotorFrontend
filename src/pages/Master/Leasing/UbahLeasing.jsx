import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
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
  CardActions,
  IconButton,
  Snackbar,
  Alert,
  Breadcrumbs
} from "@mui/material";
import Carousel from "react-elastic-carousel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { KeyOffRounded } from "@mui/icons-material";

const UbahLeasing = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  let [arrayImage, setArrayImage] = useState([]);
  let [arrayImageUrl, setArrayImageUrl] = useState([]);
  let [deleteGambarId, setDeleteGambarId] = useState([]);
  let [deleteGambar, setDeleteGambar] = useState([]);
  let [gambar, setGambar] = useState(null);
  let [gambarId, setGambarId] = useState(null);
  const [kodeLeasing, setKodeLeasing] = useState("");
  const [namaLeasing, setNamaLeasing] = useState("");
  const [alamatLeasing, setAlamatLeasing] = useState("");
  const [teleponLeasing, setTeleponLeasing] = useState("");
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

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1200, itemsToShow: 4 }
  ];

  useEffect(() => {
    getUserById();
    getUrlImg();
  }, [arrayImage]);

  const getUrlImg = () => {
    let tempArrayImageUrl = [];
    Object.keys(arrayImage).map(function (key, index) {
      tempArrayImageUrl.push(URL.createObjectURL(arrayImage[key]));
      setArrayImageUrl(tempArrayImageUrl);
    });
  };

  const hapusGambar = (img, i) => {
    setGambarId(
      gambarId.filter((val) => {
        if (val === gambarId[i] || gambarId.length === 1) {
          deleteGambarId.push(val);
        }
        return val !== gambarId[i];
      })
    );

    setGambar(
      gambar.filter((val) => {
        if (val === img || gambar.length === 1) {
          deleteGambar.push(val);
        }
        return val !== img;
      })
    );
  };

  const getUserById = async () => {
    if (id) {
      setLoading(true);
      const response = await axios.post(`${tempUrl}/leasings/${id}`, {
        id: user._id,
        token: user.token
      });
      setGambarId(response.data.gambarId);
      setGambar(response.data.gambar);
      setKodeLeasing(response.data.kodeLeasing);
      setNamaLeasing(response.data.namaLeasing);
      setAlamatLeasing(response.data.alamatLeasing);
      setTeleponLeasing(response.data.teleponLeasing);
      setLoading(false);
    }
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
            gambar.push(response.data.url);
            gambarId.push(response.data.public_id);
          })
          .catch((e) => {
            console.log(e);
          }));

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (e) => {
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

      try {
        setLoading(true);
        await axios.post(`${tempUrl}/updateLeasing/${id}`, {
          deleteGambar,
          deleteGambarId,
          gambarId: gambarId,
          gambar: gambar,
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
        <Typography color="text.primary">Ubah Leasing</Typography>
      </Breadcrumbs>
      <Box sx={container}>
        <Typography color="#757575">Master</Typography>
        <Typography variant="h4" sx={subTitleText}>
          Ubah Leasing
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
        <Divider sx={dividerStyle} />
        <Box sx={deleteButtonContainer}>
          <Typography variant="h6" sx={deleteButtonText}>
            Hapus Gambar
          </Typography>
        </Box>
        {gambar && gambarId.length !== 0 && (
          <Carousel breakPoints={breakPoints} sx={carouselStyle}>
            {gambar &&
              gambar.map((img, i) => (
                <Card sx={oldImageCard}>
                  <CardActionArea disableRipple>
                    <CardMedia
                      component="img"
                      height="100%"
                      src={img}
                      alt={namaLeasing}
                      sx={oldImageCardMedia}
                    />
                  </CardActionArea>
                  <CardActions sx={oldImageCardAction}>
                    <IconButton aria-label="delete">
                      <DeleteIcon
                        color="error"
                        onClick={() => hapusGambar(img, i)}
                      />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
          </Carousel>
        )}
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
              label="Nama"
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

const deleteButtonContainer = {
  display: "flex",
  justifyContent: "center",
  mt: 2
};

const deleteButtonText = {
  fontWeight: "300"
};

const carouselStyle = {
  display: "flex",
  height: "400px"
};

const oldImageCard = {
  m: "auto",
  mt: 2,
  width: "200px",
  height: "200px",
  display: "flex",
  flexDirection: "column"
};

const oldImageCardMedia = {
  display: "flex",
  maxHeight: "150px"
};

const oldImageCardAction = {
  display: "flex",
  justifyContent: "center",
  mt: "auto"
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
