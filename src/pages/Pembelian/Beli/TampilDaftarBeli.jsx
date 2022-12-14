import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { Box, Typography, Divider, Pagination, Paper } from "@mui/material";
import { ShowTableDaftarBeli } from "../../../components/ShowTable";
import {
  SearchBar,
  Loader,
  usePagination,
  ButtonModifier
} from "../../../components";
import { tempUrl } from "../../../contexts/ContextProvider";
import { useStateContext } from "../../../contexts/ContextProvider";

const TampilDaftarBeli = () => {
  const { user, dispatch } = useContext(AuthContext);
  const { screenSize } = useStateContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUser] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const kode = null;

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
      val.noBeli.includes(searchTerm) ||
      val.tanggalBeli.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.kodeSupplier.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.jumlahBeli.toString().includes(searchTerm) ||
      val.ppnBeli.toString().toUpperCase().includes(searchTerm.toUpperCase())
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
    getSupplier();
    getUsers();
  }, []);

  const getSupplier = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/supplierMainInfo`, {
      id: user._id,
      token: user.token
    });
    setSuppliers(response.data);
    setLoading(false);
  };

  const getUsers = async () => {
    setLoading(true);
    const response = await axios.post(`${tempUrl}/belis`, {
      id: user._id,
      token: user.token
    });
    setUser(response.data);
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Paper sx={container} elevation={3}>
      <Typography color="#757575">Pembelian</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Daftar Beli
      </Typography>
      <Box sx={buttonModifierContainer}>
        <ButtonModifier
          id={"/"}
          kode={kode}
          addLink={`/daftarBeli/beli/tambahBeli`}
          editLink={`/`}
          deleteUser={"/"}
        />
      </Box>
      <Divider sx={dividerStyle} />
      <Box sx={searchBarContainer}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Box>
      <Box sx={tableContainer}>
        <ShowTableDaftarBeli
          currentPosts={currentPosts}
          searchTerm={searchTerm}
          suppliers={suppliers}
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

export default TampilDaftarBeli;

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
