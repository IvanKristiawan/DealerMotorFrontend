import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import {
  namaPerusahaan,
  lokasiPerusahaan,
  kotaPerusahaan
} from "../../../constants/GeneralSetting";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Divider,
  Pagination,
  Button,
  Paper
} from "@mui/material";
import { ShowTableSupplier } from "../../../components/ShowTable";
import {
  SearchBar,
  Loader,
  usePagination,
  ButtonModifier
} from "../../../components";
import { tempUrl } from "../../../contexts/ContextProvider";
import { useStateContext } from "../../../contexts/ContextProvider";
import jsPDF from "jspdf";
import "jspdf-autotable";
import PrintIcon from "@mui/icons-material/Print";

const TampilSupplier = () => {
  const { user, dispatch } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { screenSize } = useStateContext();

  const [kodeSupplier, setKodeSupplier] = useState("");
  const [namaSupplier, setNamaSupplier] = useState("");
  const [alamatSupplier, setAlamatSupplier] = useState("");
  const [kotaSupplier, setKotaSupplier] = useState("");
  const [teleponSupplier, setTeleponSupplier] = useState("");
  const [picSupplier, setPicSupplier] = useState("");
  const [npwpSupplier, setNpwpSupplier] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUser] = useState([]);
  const navigate = useNavigate();

  const columns = [
    { title: "Kode", field: "kodeSupplier" },
    { title: "Nama Supplier", field: "namaSupplier" },
    { title: "Alamat", field: "alamatSupplier" },
    { title: "Kota", field: "kotaSupplier" },
    { title: "Telepon", field: "teleponSupplier" },
    { title: "PIC", field: "picSupplier" },
    { title: "NPWP", field: "npwpSupplier" }
  ];

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  const PER_PAGE = 20;

  // Get current posts
  const indexOfLastPost = page * PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - PER_PAGE;
  const tempPosts = users.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (
      val.kodeSupplier.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.namaSupplier.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.alamatSupplier.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.kotaSupplier.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.teleponSupplier.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.picSupplier.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.npwpSupplier.toUpperCase().includes(searchTerm.toUpperCase())
    ) {
      return val;
    }
  });
  const currentPosts = tempPosts.slice(indexOfFirstPost, indexOfLastPost);

  const count = Math.ceil(tempPosts.length / PER_PAGE);
  const _DATA = usePagination(users, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    getUsers();
    id && getUserById();
  }, [id]);

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/suppliers`, {
      id: user._id,
      token: user.token
    });
    setUser(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.post(`${tempUrl}/suppliers/${id}`, {
        id: user._id,
        token: user.token
      });
      setKodeSupplier(response.data.kodeSupplier);
      setNamaSupplier(response.data.namaSupplier);
      setAlamatSupplier(response.data.alamatSupplier);
      setKotaSupplier(response.data.kotaSupplier);
      setTeleponSupplier(response.data.teleponSupplier);
      setPicSupplier(response.data.picSupplier);
      setNpwpSupplier(response.data.npwpSupplier);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/deleteSupplier/${id}`, {
        id: user._id,
        token: user.token
      });
      getUsers();
      setKodeSupplier("");
      setNamaSupplier("");
      setAlamatSupplier("");
      setKotaSupplier("");
      setTeleponSupplier("");
      setPicSupplier("");
      setNpwpSupplier("");
      setLoading(false);
      navigate("/supplier");
    } catch (error) {
      console.log(error);
    }
  };

  const downloadPdf = () => {
    var date = new Date();
    var current_date =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    var current_time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text(`${namaPerusahaan} - ${kotaPerusahaan}`, 15, 10);
    doc.text(`${lokasiPerusahaan}`, 15, 15);
    doc.setFontSize(16);
    doc.text(`Daftar Supplier`, 90, 30);
    doc.setFontSize(10);
    doc.text(
      `Dicetak Oleh: ${user.username} | Tanggal : ${current_date} | Jam : ${current_time}`,
      15,
      280
    );
    doc.setFontSize(12);
    doc.autoTable({
      margin: { top: 45 },
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: users,
      headStyles: {
        fillColor: [117, 117, 117],
        color: [0, 0, 0]
      }
    });
    doc.save(`daftarSupplier.pdf`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Paper sx={container} elevation={3}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Supplier
      </Typography>
      <Box sx={buttonModifierContainer}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<PrintIcon />}
          onClick={() => downloadPdf()}
        >
          Cetak
        </Button>
      </Box>
      <Box sx={buttonModifierContainer}>
        <ButtonModifier
          id={id}
          kode={kodeSupplier}
          addLink={`/supplier/tambahSupplier`}
          editLink={`/supplier/${id}/edit`}
          deleteUser={deleteUser}
          nameUser={kodeSupplier}
        />
      </Box>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            id="outlined-basic"
            label="Kode"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={kodeSupplier}
          />
          <TextField
            id="outlined-basic"
            label="Nama Supplier"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={namaSupplier}
          />
          <TextField
            id="outlined-basic"
            label="Alamat Supplier"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={alamatSupplier}
          />
          <TextField
            id="outlined-basic"
            label="Kota Supplier"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={kotaSupplier}
          />
        </Box>
        <Box sx={[showDataWrapper, { marginLeft: 4 }]}>
          <TextField
            id="outlined-basic"
            label="Telepon Supplier"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={teleponSupplier}
          />
          <TextField
            id="outlined-basic"
            label="PIC Supplier"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={picSupplier}
          />
          <TextField
            id="outlined-basic"
            label="NPWP Supplier"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={npwpSupplier}
          />
        </Box>
      </Box>
      <Divider sx={dividerStyle} />
      <Box sx={searchBarContainer}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Box>
      <Box sx={tableContainer}>
        <ShowTableSupplier
          currentPosts={currentPosts}
          searchTerm={searchTerm}
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
    </Paper>
  );
};

export default TampilSupplier;

const container = {
  p: 4,
  backgroundColor: "white",
  borderRadius: "20px"
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

const showDataContainer = {
  mt: 4,
  display: "flex",
  flexWrap: "wrap"
};

const showDataWrapper = {
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

const searchBarContainer = {
  pt: 6,
  display: "flex",
  justifyContent: "center"
};

const tableContainer = {
  pt: 4,
  display: "flex",
  justifyContent: "center"
};
