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
import EditIcon from "@mui/icons-material/Edit";

const UbahBeli = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [kodeBeli, setKodeBeli] = useState("");
  const [tanggalBeli, setTanggalBeli] = useState("");
  const [kodeSupplier, setKodeSupplier] = useState("");
  const [jumlahBeli, setJumlahBeli] = useState("");
  const [ppnBeli, setPpnBeli] = useState("");
  const [error, setError] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const supplierOptions = suppliers.map((supplier) => ({
    label: `${supplier.kodeSupplier} - ${supplier.namaSupplier}`
  }));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    getSupplier();
    getUserById();
  }, []);

  const getSupplier = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/suppliers`, {
      id: user._id,
      token: user.token
    });
    setSuppliers(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/belis/${id}`, {
      id: user._id,
      token: user.token
    });
    setKodeBeli(response.data.noBeli);
    setTanggalBeli(response.data.tanggalBeli);
    setJumlahBeli(response.data.jumlahBeli);
    setKodeSupplier(response.data.kodeSupplier);
    setPpnBeli(response.data.ppnBeli);
    setLoading(false);
  };

  const updateUser = async (e) => {
    e.preventDefault();

    if (
      tanggalBeli.length === 0 ||
      kodeSupplier.length === 0 ||
      jumlahBeli.length === 0
    ) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        setLoading(true);
        await axios.post(`${tempUrl}/updateBeli/${id}`, {
          tanggalBeli,
          kodeSupplier,
          jumlahBeli,
          ppnBeli: ppnBeli ? ppnBeli : 0,
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
        Ubah Beli
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={textFieldContainer}>
        <Box sx={textFieldWrapper}>
          <TextField
            id="outlined-basic"
            label="Kode Beli"
            variant="outlined"
            value={kodeBeli}
            InputProps={{
              readOnly: true
            }}
          />
          <TextField
            error={error && tanggalBeli.length === 0 && true}
            helperText={
              error && tanggalBeli.length === 0 && "Tanggal harus diisi!"
            }
            id="outlined-basic"
            label="Tanggal"
            variant="outlined"
            sx={textFieldStyle}
            value={tanggalBeli}
            onChange={(e) => setTanggalBeli(e.target.value.toUpperCase())}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={supplierOptions}
            renderInput={(params) => (
              <TextField
                error={error && kodeSupplier.length === 0 && true}
                helperText={
                  error &&
                  kodeSupplier.length === 0 &&
                  "Kode Supplier harus diisi!"
                }
                {...params}
                label="Kode Supplier"
              />
            )}
            onInputChange={(e, value) =>
              setKodeSupplier(value.split(" ", 1)[0])
            }
            defaultValue={{ label: kodeSupplier }}
            sx={textFieldStyle}
          />
          <Box sx={jumlahContainer}>
            <Typography sx={jumlahText}>
              Jumlah
              {jumlahBeli !== 0 &&
                !isNaN(parseInt(jumlahBeli)) &&
                ` : Rp ${parseInt(jumlahBeli).toLocaleString()}`}
            </Typography>
            <TextField
              error={error && jumlahBeli.length === 0 && true}
              helperText={
                error && jumlahBeli.length === 0 && "Jumlah harus diisi!"
              }
              id="outlined-basic"
              variant="outlined"
              value={jumlahBeli}
              onChange={(e) => setJumlahBeli(e.target.value)}
            />
          </Box>
          <TextField
            id="outlined-basic"
            label="PPN"
            variant="outlined"
            sx={textFieldStyle}
            value={ppnBeli}
            onChange={(e) => setPpnBeli(e.target.value.toUpperCase())}
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
  );
};

export default UbahBeli;

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

const jumlahContainer = {
  marginTop: 2.5,
  display: "flex",
  flexDirection: "column"
};

const jumlahText = {
  fontWeight: "500",
  color: "gray"
};
