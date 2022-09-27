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
  Autocomplete,
  Snackbar,
  Alert
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const TambahABeli = () => {
  const { user, dispatch } = useContext(AuthContext);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [kodeTipe, setKodeTipe] = useState("");
  const [tahun, setTahun] = useState("");
  const [namaWarna, setNamaWarna] = useState("");
  const [noRangka, setNoRangka] = useState("");
  const [noMesin, setNoMesin] = useState("");
  const [nopol, setNopol] = useState("");
  const [namaStnk, setNamaStnk] = useState("");
  const [tglStnk, setTglStnk] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [tipes, setTipes] = useState([]);
  const [warnas, setWarnas] = useState([]);
  const [belis, setBelis] = useState([]);
  const [loading, setLoading] = useState(false);

  const tipeOptions = tipes.map((tipe) => ({
    label: `${tipe.kodeTipe} - ${tipe.namaTipe}`
  }));

  const warnaOptions = warnas.map((warna) => ({
    label: `${warna.namaWarna}`
  }));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getTipes();
    getWarnas();
    getBelis();
  }, []);

  const getTipes = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/tipes`, {
      id: user._id,
      token: user.token
    });
    setTipes(response.data);
    setLoading(false);
  };

  const getWarnas = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/warnas`, {
      id: user._id,
      token: user.token
    });
    setWarnas(response.data);
    setLoading(false);
  };

  const getBelis = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/belis/${id}`, {
      id: user._id,
      token: user.token
    });
    setBelis(response.data);
    setLoading(false);
  };

  const saveUser = async (e) => {
    e.preventDefault();
    if (
      kodeTipe.length === 0 ||
      tahun.length === 0 ||
      namaWarna.length === 0 ||
      noRangka.length === 0 ||
      noMesin.length === 0 ||
      nopol.length === 0 ||
      namaStnk.length === 0 ||
      tglStnk.length === 0
    ) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/saveABeli`, {
          noBeli: belis.noBeli,
          kodeTipe,
          tahun,
          namaWarna,
          noRangka,
          noMesin,
          nopol,
          namaStnk,
          tglStnk,
          id: user._id,
          token: user.token
        });
        setLoading(false);
        navigate(`/daftarBeli/beli/${id}`);
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
      <Typography color="#757575">Pembelian</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Tambah Barang Beli
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={textFieldContainer}>
        <Box sx={textFieldWrapper}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={tipeOptions}
            renderInput={(params) => (
              <TextField
                error={error && kodeTipe.length === 0 && true}
                helperText={
                  error && kodeTipe.length === 0 && "Kode Tipe harus diisi!"
                }
                {...params}
                label="Kode Tipe"
              />
            )}
            onInputChange={(e, value) =>
              setKodeTipe(`${value.split(" ", 1)[0]} ${value.split(" ")[1]}`)
            }
            sx={textFieldStyle}
          />
          <TextField
            error={error && tahun.length === 0 && true}
            helperText={error && tahun.length === 0 && "Tahun harus diisi!"}
            id="outlined-basic"
            label="Tahun"
            variant="outlined"
            value={tahun}
            onChange={(e) => setTahun(e.target.value.toUpperCase())}
            sx={textFieldStyle}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={warnaOptions}
            renderInput={(params) => (
              <TextField
                error={error && namaWarna.length === 0 && true}
                helperText={
                  error && namaWarna.length === 0 && "Nama Warna harus diisi!"
                }
                {...params}
                label="Warna"
              />
            )}
            onInputChange={(e, value) => setNamaWarna(value)}
            sx={textFieldStyle}
          />
          <TextField
            error={error && noRangka.length === 0 && true}
            helperText={
              error && noRangka.length === 0 && "No. Rangka harus diisi!"
            }
            id="outlined-basic"
            label="No Rangka"
            variant="outlined"
            value={noRangka}
            onChange={(e) => setNoRangka(e.target.value.toUpperCase())}
            sx={textFieldStyle}
          />
        </Box>
        <Box sx={[textFieldWrapper, { marginLeft: 4 }]}>
          <TextField
            error={error && noMesin.length === 0 && true}
            helperText={
              error && noMesin.length === 0 && "No. Mesin harus diisi!"
            }
            id="outlined-basic"
            label="No Mesin"
            variant="outlined"
            value={noMesin}
            onChange={(e) => setNoMesin(e.target.value.toUpperCase())}
            sx={textFieldStyle}
          />
          <TextField
            error={error && nopol.length === 0 && true}
            helperText={error && nopol.length === 0 && "Nopol harus diisi!"}
            id="outlined-basic"
            label="Nopol"
            variant="outlined"
            value={nopol}
            onChange={(e) => setNopol(e.target.value.toUpperCase())}
            sx={textFieldStyle}
          />
          <TextField
            error={error && namaStnk.length === 0 && true}
            helperText={
              error && namaStnk.length === 0 && "Nama Stnk harus diisi!"
            }
            id="outlined-basic"
            label="Nama Stnk"
            variant="outlined"
            value={namaStnk}
            onChange={(e) => setNamaStnk(e.target.value.toUpperCase())}
            sx={textFieldStyle}
          />
          <TextField
            error={error && tglStnk.length === 0 && true}
            helperText={
              error && tglStnk.length === 0 && "Tanggal Stnk harus diisi!"
            }
            id="outlined-basic"
            label="Tanggal Stnk"
            variant="outlined"
            value={tglStnk}
            onChange={(e) => setTglStnk(e.target.value.toUpperCase())}
            sx={textFieldStyle}
          />
        </Box>
      </Box>
      <Box sx={textFieldStyle}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate(`/daftarBeli/beli/${id}`)}
          sx={{ marginRight: 2 }}
        >
          {"< Kembali"}
        </Button>
        <Button variant="contained" startIcon={<SaveIcon />} onClick={saveUser}>
          Simpan
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
  );
};

export default TambahABeli;

const container = {
  pt: 4
};

const subTitleText = {
  fontWeight: "900"
};

const dividerStyle = {
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
  maxWidth: {
    md: "40vw"
  }
};

const textFieldStyle = {
  mt: 4
};

const alertBox = {
  width: "100%"
};
