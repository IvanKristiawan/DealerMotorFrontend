import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  TextField,
  Typography,
  Divider,
  Pagination,
  Card,
  CardActionArea,
  CardMedia
} from "@mui/material";
import { ShowTableLeasing } from "../../../components/ShowTable";
import {
  SearchBar,
  Loader,
  usePagination,
  ButtonModifier
} from "../../../components";
import Carousel from "react-elastic-carousel";
import { tempUrl } from "../../../contexts/ContextProvider";
import { useStateContext } from "../../../contexts/ContextProvider";
import { AuthContext } from "../../../contexts/AuthContext";

const TampilLeasing = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { screenSize } = useStateContext();
  const [gambar, setGambar] = useState([]);
  const [kodeLeasing, setKodeLeasing] = useState("");
  const [namaLeasing, setNamaLeasing] = useState("");
  const [alamatLeasing, setAlamatLeasing] = useState("");
  const [teleponLeasing, setTeleponLeasing] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUser] = useState([]);
  const navigate = useNavigate();

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 3 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 5 }
  ];

  const [loading, setLoading] = useState(false);
  let [page, setPage] = useState(1);
  let PER_PAGE = 20;

  // Get current posts
  const indexOfLastPost = page * PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - PER_PAGE;
  const tempPosts = users.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (
      val.kodeLeasing.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.namaLeasing.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.alamatLeasing.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.teleponLeasing.toUpperCase().includes(searchTerm.toUpperCase())
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
    const response = await axios.post(`${tempUrl}/leasingForTable`, {
      id: user._id,
      token: user.token
    });
    setUser(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.post(`${tempUrl}/leasings/${id}`, {
        id: user._id,
        token: user.token
      });
      setGambar(response.data.gambar);
      setKodeLeasing(response.data.kodeLeasing);
      setNamaLeasing(response.data.namaLeasing);
      setAlamatLeasing(response.data.alamatLeasing);
      setTeleponLeasing(response.data.teleponLeasing);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/deleteLeasing/${id}`, {
        id: user._id,
        token: user.token
      });
      getUsers();
      setGambar([]);
      setKodeLeasing("");
      setNamaLeasing("");
      setAlamatLeasing("");
      setTeleponLeasing("");
      setLoading(false);
      navigate("/leasing");
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
        Leasing
      </Typography>
      <Box sx={buttonModifierContainer}>
        <ButtonModifier
          id={id}
          kode={kodeLeasing}
          addLink={`/leasing/tambahLeasing`}
          editLink={`/leasing/${id}/edit`}
          deleteUser={deleteUser}
        />
      </Box>
      <Divider sx={dividerStyle} />

      {gambar.length !== 0 && (
        <Carousel breakPoints={breakPoints} sx={carouselStyle}>
          {gambar.length !== 0 &&
            gambar.map((img) => (
              <Card sx={carouselCard}>
                <CardActionArea disableRipple>
                  <CardMedia
                    component="img"
                    height="100%"
                    src={img}
                    alt={namaLeasing}
                  />
                </CardActionArea>
              </Card>
            ))}
        </Carousel>
      )}

      <Box sx={textFieldContainer}>
        <Box sx={textFieldWrapper}>
          <TextField
            id="outlined-basic"
            label="Kode Leasing"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={kodeLeasing}
          />
          <TextField
            id="outlined-basic"
            label="Nama Leasing"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={namaLeasing}
          />
        </Box>
        <Box sx={textFieldBox}>
          <TextField
            id="outlined-basic"
            label="Alamat Leasing"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={alamatLeasing}
          />
          <TextField
            id="outlined-basic"
            label="Telepon Leasing"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={teleponLeasing}
          />
        </Box>
      </Box>
      <Divider sx={dividerStyle} />
      <Box sx={searchBarContainer}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Box>
      <Box sx={tableContainer}>
        <ShowTableLeasing currentPosts={currentPosts} searchTerm={searchTerm} />
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

export default TampilLeasing;

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

const carouselStyle = {
  display: "flex",
  height: "200px"
};

const carouselCard = {
  m: "auto",
  mt: 2,
  width: "200px",
  height: "200px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
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
  mr: {
    xs: 0,
    sm: 10
  }
};

const textFieldStyle = {
  display: "flex",
  mt: 4
};

const textFieldBox = {
  display: "flex",
  flex: 1,
  flexDirection: "column"
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
