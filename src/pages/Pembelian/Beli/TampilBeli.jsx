import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Divider,
  Pagination,
  Button
} from "@mui/material";
import { ShowTableBeli } from "../../../components/ShowTable";
import { Loader, usePagination, ButtonModifier } from "../../../components";
import { tempUrl } from "../../../contexts/ContextProvider";
import { useStateContext } from "../../../contexts/ContextProvider";

const TampilBeli = () => {
  const { user, dispatch } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const { screenSize } = useStateContext();
  const [noBeli, setNoBeli] = useState("");
  const [tanggalBeli, setTanggalBeli] = useState("");
  const [kodeSupplier, setKodeSupplier] = useState("");
  const [jumlahBeli, setJumlahBeli] = useState("");
  const [ppnBeli, setPpnBeli] = useState("");
  const [aBelis, setABelis] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 20;

  // Get current posts
  const indexOfLastPost = page * PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - PER_PAGE;
  const currentPosts = aBelis.slice(indexOfFirstPost, indexOfLastPost);

  const count = Math.ceil(aBelis.length / PER_PAGE);
  const _DATA = usePagination(aBelis, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    getSupplier();
    getAPembelianStoks();
    id && getUserById();
  }, [id]);

  const getSupplier = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/supplierMainInfo`, {
      id: user._id,
      token: user.token
    });
    setSuppliers(response.data);
    setLoading(false);
  };

  const getAPembelianStoks = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/aBelis`, {
      id: user._id,
      token: user.token
    });
    setABelis(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.post(`${tempUrl}/belis/${id}`, {
        id: user._id,
        token: user.token
      });
      setNoBeli(response.data.noBeli);
      setTanggalBeli(response.data.tanggalBeli);
      setJumlahBeli(response.data.jumlahBeli);
      setKodeSupplier(response.data.kodeSupplier);
      setPpnBeli(response.data.ppnBeli);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      for (let aBeli of aBelis) {
        if (aBeli.noBeli === noBeli) {
          await axios.post(`${tempUrl}/deleteABeli/${aBeli._id}`, {
            id: user._id,
            token: user.token
          });
        }
      }
      await axios.post(`${tempUrl}/deleteBeli/${id}`, {
        id: user._id,
        token: user.token
      });
      setLoading(false);
      navigate("/daftarBeli");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => navigate("/daftarBeli")}
        sx={{ marginRight: 2 }}
      >
        {"< Kembali"}
      </Button>
      <Box sx={container}>
        <Typography color="#757575">Pembelian</Typography>
        <Typography variant="h4" sx={subTitleText}>
          Beli
        </Typography>
        <Box sx={buttonModifierContainer}>
          <ButtonModifier
            id={id}
            kode={"test"}
            addLink={`/daftarBeli/beli/${id}/tambahABeli`}
            editLink={`/daftarBeli/beli/${id}/edit`}
            deleteUser={deleteUser}
            nameUser={noBeli}
          />
        </Box>
        <Divider sx={dividerStyle} />
        <Box sx={textFieldContainer}>
          <Box sx={textFieldWrapper}>
            <TextField
              id="outlined-basic"
              label="Nomor"
              variant="filled"
              sx={textFieldStyle}
              InputProps={{
                readOnly: true
              }}
              value={noBeli}
            />
            <TextField
              id="outlined-basic"
              label="Tanggal"
              variant="filled"
              sx={textFieldStyle}
              InputProps={{
                readOnly: true
              }}
              value={tanggalBeli}
            />
            <TextField
              id="outlined-basic"
              label="Kode Supplier"
              variant="filled"
              sx={textFieldStyle}
              InputProps={{
                readOnly: true
              }}
              value={`${kodeSupplier} - ${suppliers
                .filter((supplier) => supplier.kodeSupplier === kodeSupplier)
                .map((sup) => ` ${sup.namaSupplier}`)}`}
            />
          </Box>
          <Box sx={[textFieldWrapper, { marginLeft: 4 }]}>
            <TextField
              id="outlined-basic"
              label="Jumlah"
              variant="filled"
              sx={textFieldStyle}
              InputProps={{
                readOnly: true
              }}
              value={jumlahBeli.toLocaleString()}
            />
            <TextField
              id="outlined-basic"
              label="PPN"
              variant="filled"
              sx={textFieldStyle}
              InputProps={{
                readOnly: true
              }}
              value={ppnBeli.toLocaleString()}
            />
          </Box>
        </Box>
        <Divider sx={dividerStyle} />
        <Box sx={tableContainer}>
          <ShowTableBeli
            id={id}
            currentPosts={currentPosts}
            nomorNota={noBeli}
          />
        </Box>
        <Box sx={tableContainer}>
          <Pagination
            count={count}
            page={page}
            onChange={handleChange}
            color="primary"
            size={screenSize <= 600 ? "small" : "large"}
          />
        </Box>
      </Box>
    </>
  );
};

export default TampilBeli;

const container = {
  pt: 4
};

const subTitleText = {
  fontWeight: "900"
};

const buttonModifierContainer = {
  mt: 4,
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center"
};

const dividerStyle = {
  pt: 4
};

const textFieldContainer = {
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
  display: "flex",
  mt: 4
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center"
};