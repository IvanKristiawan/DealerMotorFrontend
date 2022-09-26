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
import { ShowTableRegister } from "../../../components/ShowTable";
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

const TampilRegister = () => {
  const { user, dispatch } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { screenSize } = useStateContext();

  const [noRegister, setNoRegister] = useState("");
  const [tanggalRegister, setTanggalRegister] = useState("");
  const [namaRegister, setNamaRegister] = useState("");
  const [almRegister, setAlmRegister] = useState("");
  const [tlpRegister, setTlpRegister] = useState("");
  const [noKtpRegister, setNoKtpRegister] = useState("");
  const [almKtpRegister, setAlmKtpRegister] = useState("");
  const [noKKRegister, setNoKKRegister] = useState("");
  const [namaPjmRegister, setNamaPjmRegister] = useState("");
  const [almPjmRegister, setAlmPjmRegister] = useState("");
  const [tlpPjmRegister, setTlpPjmRegister] = useState("");
  const [hubunganRegister, setHubunganRegister] = useState("");
  const [noKtpPjmRegister, setNoKtpPjmRegister] = useState("");
  const [pkjRegister, setPkjRegister] = useState("");
  const [namaRefRegister, setNamaRefRegister] = useState("");
  const [almRefRegister, setAlmRefRegister] = useState("");
  const [tlpRefRegister, setTlpRefRegister] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUser] = useState([]);
  const navigate = useNavigate();

  const columns = [
    [
      { title: "No", field: "noRegister" },
      { title: "Tgl", field: "tanggalRegister" },
      { title: "Nama", field: "namaRegister" },
      { title: "Alamat", field: "almRegister" },
      { title: "Tlp", field: "tlpRegister" },
      { title: "No. KTP", field: "noKtpRegister" },
      { title: "Alm. KTP", field: "almKtpRegister" },
      { title: "No. KK", field: "noKKRegister" }
    ],
    [
      { title: "Nama Pjm", field: "namaPjmRegister" },
      { title: "Alm. Pjm", field: "almPjmRegister" },
      { title: "Tlp. Pjm", field: "tlpPjmRegisterer" },
      { title: "Hubungan", field: "hubunganRegister" },
      { title: "No. KTP Pjm", field: "noKtpPjmRegister" },
      { title: "Pekerjaan Pjm", field: "pkjRegister" },
      { title: "Nama Ref", field: "namaRefRegister" },
      { title: "Alm. Ref", field: "almRefRegister" },
      { title: "Tlp. Ref", field: "tlpRefRegister" }
    ]
  ];

  const columns2 = [
    { title: "Nama Pjm", field: "namaPjmRegister" },
    { title: "Alm. Pjm", field: "almPjmRegister" },
    { title: "Tlp. Pjm", field: "tlpPjmRegisterer" },
    { title: "Hubungan", field: "hubunganRegister" },
    { title: "No. KTP Pjm", field: "noKtpPjmRegister" },
    { title: "Pekerjaan Pjm", field: "pkjRegister" },
    { title: "Nama Ref", field: "namaRefRegister" },
    { title: "Alm. Ref", field: "almRefRegister" },
    { title: "Tlp. Ref", field: "tlpRefRegister" }
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
      val.noRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.tanggalRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.namaRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.almRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.tlpRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.noKtpRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.almKtpRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.noKKRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.namaPjmRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.almPjmRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.tlpPjmRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.hubunganRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.noKtpPjmRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.pkjRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.namaRefRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.almRefRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.tlpRefRegister.toUpperCase().includes(searchTerm.toUpperCase())
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
    const response = await axios.post(`${tempUrl}/registers`, {
      id: user._id,
      token: user.token
    });
    setUser(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.post(`${tempUrl}/registers/${id}`, {
        id: user._id,
        token: user.token
      });
      setNoRegister(response.data.noRegister);
      setTanggalRegister(response.data.tanggalRegister);
      setNamaRegister(response.data.namaRegister);
      setAlmRegister(response.data.almRegister);
      setTlpRegister(response.data.tlpRegister);
      setNoKtpRegister(response.data.noKtpRegister);
      setAlmKtpRegister(response.data.almKtpRegister);
      setNoKKRegister(response.data.noKKRegister);
      setNamaPjmRegister(response.data.namaPjmRegister);
      setAlmPjmRegister(response.data.almPjmRegister);
      setTlpPjmRegister(response.data.tlpPjmRegister);
      setHubunganRegister(response.data.hubunganRegister);
      setNoKtpPjmRegister(response.data.noKtpPjmRegister);
      setPkjRegister(response.data.pkjRegister);
      setNamaRefRegister(response.data.namaRefRegister);
      setAlmRefRegister(response.data.almRefRegister);
      setTlpRefRegister(response.data.tlpRefRegister);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/deleteRegister/${id}`, {
        id: user._id,
        token: user.token
      });
      getUsers();
      setNoRegister("");
      setTanggalRegister("");
      setNamaRegister("");
      setAlmRegister("");
      setTlpRegister("");
      setNoKtpRegister("");
      setAlmKtpRegister("");
      setNoKKRegister("");
      setNamaPjmRegister("");
      setAlmPjmRegister("");
      setTlpPjmRegister("");
      setHubunganRegister("");
      setNoKtpPjmRegister("");
      setPkjRegister("");
      setNamaRefRegister("");
      setAlmRefRegister("");
      setTlpRefRegister("");
      setLoading(false);
      navigate("/register");
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
    const doc = new jsPDF("l", "mm", [297, 210]);
    doc.setFontSize(12);
    doc.text(`MEGA MOTOR - JAKARTA`, 15, 10);
    doc.text(`TANGERANG`, 15, 15);
    doc.setFontSize(16);
    doc.text(`Daftar Register Penjualan`, 90, 30);
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
    doc.autoTable({
      margin: { top: 45 },
      columns: columns2.map((col) => ({ ...col, dataKey: col.field })),
      body: users,
      headStyles: {
        fillColor: [117, 117, 117],
        color: [0, 0, 0]
      }
    });
    doc.save(`daftarRegisterPenjualan.pdf`);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Penjualan</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Register Penjualan
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
          kode={noRegister}
          addLink={`/register/tambahRegister`}
          editLink={`/register/${id}/edit`}
          deleteUser={deleteUser}
          nameUser={noRegister}
        />
      </Box>
      {noRegister.length !== 0 && (
        <>
          <Divider sx={dividerStyle} />
          <Box sx={showDataContainer}>
            <Box sx={showDataWrapper}>
              <TextField
                id="outlined-basic"
                label="No"
                variant="filled"
                sx={textFieldStyle}
                InputProps={{
                  readOnly: true
                }}
                value={noRegister}
              />
              <TextField
                id="outlined-basic"
                label="Tanggal"
                variant="filled"
                sx={textFieldStyle}
                InputProps={{
                  readOnly: true
                }}
                value={tanggalRegister}
              />
              <TextField
                id="outlined-basic"
                label="Nama Register"
                variant="filled"
                sx={textFieldStyle}
                InputProps={{
                  readOnly: true
                }}
                value={namaRegister}
              />
              <TextField
                id="outlined-basic"
                label="Alamat Register"
                variant="filled"
                sx={textFieldStyle}
                InputProps={{
                  readOnly: true
                }}
                value={almRegister}
              />
              <TextField
                id="outlined-basic"
                label="Telepon Register"
                variant="filled"
                sx={textFieldStyle}
                InputProps={{
                  readOnly: true
                }}
                value={tlpRegister}
              />
              <TextField
                id="outlined-basic"
                label="No. KTP Register"
                variant="filled"
                sx={textFieldStyle}
                InputProps={{
                  readOnly: true
                }}
                value={noKtpRegister}
              />
              <TextField
                id="outlined-basic"
                label="Alamat KTP Register"
                variant="filled"
                sx={textFieldStyle}
                InputProps={{
                  readOnly: true
                }}
                value={almKtpRegister}
              />
              <TextField
                id="outlined-basic"
                label="No. KK Register"
                variant="filled"
                sx={textFieldStyle}
                InputProps={{
                  readOnly: true
                }}
                value={noKKRegister}
              />
              <TextField
                id="outlined-basic"
                label="Nama Penjamin"
                variant="filled"
                sx={textFieldStyle}
                InputProps={{
                  readOnly: true
                }}
                value={namaPjmRegister}
              />
            </Box>
            <Box sx={[showDataWrapper, { marginLeft: 4 }]}>
              <TextField
                id="outlined-basic"
                label="Alamat Penjamin"
                variant="filled"
                sx={textFieldStyle}
                InputProps={{
                  readOnly: true
                }}
                value={almPjmRegister}
              />
              <TextField
                id="outlined-basic"
                label="Telepon Penjamin"
                variant="filled"
                sx={textFieldStyle}
                InputProps={{
                  readOnly: true
                }}
                value={tlpPjmRegister}
              />
              <TextField
                id="outlined-basic"
                label="Hubungan Penjamin"
                variant="filled"
                sx={textFieldStyle}
                InputProps={{
                  readOnly: true
                }}
                value={hubunganRegister}
              />
              <TextField
                id="outlined-basic"
                label="No. KTP Penjamin"
                variant="filled"
                sx={textFieldStyle}
                InputProps={{
                  readOnly: true
                }}
                value={noKtpPjmRegister}
              />
              <TextField
                id="outlined-basic"
                label="Pekerjaan Penjamin"
                variant="filled"
                sx={textFieldStyle}
                InputProps={{
                  readOnly: true
                }}
                value={pkjRegister}
              />
              <TextField
                id="outlined-basic"
                label="Nama Referensi"
                variant="filled"
                sx={textFieldStyle}
                InputProps={{
                  readOnly: true
                }}
                value={namaRefRegister}
              />
              <TextField
                id="outlined-basic"
                label="Alamat Referensi"
                variant="filled"
                sx={textFieldStyle}
                InputProps={{
                  readOnly: true
                }}
                value={almRefRegister}
              />
              <TextField
                id="outlined-basic"
                label="Telepon Referensi"
                variant="filled"
                sx={textFieldStyle}
                InputProps={{
                  readOnly: true
                }}
                value={tlpRefRegister}
              />
            </Box>
          </Box>
        </>
      )}
      <Divider sx={dividerStyle} />
      <Box sx={searchBarContainer}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Box>
      <Box sx={tableContainer}>
        <ShowTableRegister
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
    </Box>
  );
};

export default TampilRegister;

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
