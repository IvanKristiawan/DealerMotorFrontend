import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, TextField, Typography, Divider, Pagination } from "@mui/material";
import { ShowTableKecamatan } from "../../../../components/ShowTable";
import {
  SearchBar,
  Loader,
  usePagination,
  ButtonModifier
} from "../../../../components";
import { tempUrl } from "../../../../contexts/ContextProvider";
import { useStateContext } from "../../../../contexts/ContextProvider";

const TampilKecamatan = () => {
  const { user, dispatch } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { screenSize } = useStateContext();

  const [kodeWilayah, setKodeWilayah] = useState("");
  const [namaWilayah, setNamaWilayah] = useState("");
  const [kodeKecamatan, setKodeKecamatan] = useState("");
  const [namaKecamatan, setNamaKecamatan] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUser] = useState([]);
  const navigate = useNavigate();

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
      val.kodeWilayah.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.kodeKecamatan.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.namaKecamatan.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.namaWilayah.toUpperCase().includes(searchTerm.toUpperCase())
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
    const response = await axios.post(`${tempUrl}/kecamatans`, {
      id: user._id,
      token: user.token
    });
    setUser(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.post(`${tempUrl}/kecamatans/${id}`, {
        id: user._id,
        token: user.token
      });
      setKodeWilayah(response.data.kodeWilayah);
      setNamaWilayah(response.data.namaWilayah);
      setKodeKecamatan(response.data.kodeKecamatan);
      setNamaKecamatan(response.data.namaKecamatan);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/deleteKecamatan/${id}`, {
        id: user._id,
        token: user.token
      });
      getUsers();
      setKodeWilayah("");
      setNamaWilayah("");
      setKodeKecamatan("");
      setNamaKecamatan("");
      setLoading(false);
      navigate("/kecamatan");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Box sx={container}>
      <Typography color="#757575">Master</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Kecamatan
      </Typography>
      <Box sx={buttonModifierContainer}>
        <ButtonModifier
          id={id}
          kode={kodeWilayah}
          addLink={`/kecamatan/tambahKecamatan`}
          editLink={`/kecamatan/${id}/edit`}
          deleteUser={deleteUser}
          nameUser={kodeKecamatan}
        />
      </Box>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            id="outlined-basic"
            label="Kode Kecamatan"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={kodeKecamatan}
          />
          <TextField
            id="outlined-basic"
            label="Nama Kecamatan"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={namaKecamatan}
          />
        </Box>
        <Box sx={[showDataWrapper, { marginLeft: 4 }]}>
          <TextField
            id="outlined-basic"
            label="Kode Wilayah"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={kodeWilayah}
          />
          <TextField
            id="outlined-basic"
            label="Nama Wilayah"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={namaWilayah}
          />
        </Box>
      </Box>
      <Divider sx={dividerStyle} />
      <Box sx={searchBarContainer}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Box>
      <Box sx={tableContainer}>
        <ShowTableKecamatan
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

export default TampilKecamatan;

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
