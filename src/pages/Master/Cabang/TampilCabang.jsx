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
import { ShowTableCabang } from "../../../components/ShowTable";
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

const TampilCabang = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { screenSize } = useStateContext();
  const [gambar, setGambar] = useState([]);
  const [kodeCabang, setKodeCabang] = useState("");
  const [namaCabang, setNamaCabang] = useState("");
  const [alamatCabang, setAlamatCabang] = useState("");
  const [teleponCabang, setTeleponCabang] = useState("");
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
      val.kodeCabang.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.namaCabang.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.alamatCabang.toUpperCase().includes(searchTerm.toUpperCase()) ||
      val.teleponCabang.toUpperCase().includes(searchTerm.toUpperCase())
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
    const response = await axios.post(`${tempUrl}/cabangForTable`, {
      id: user._id,
      token: user.token
    });
    setUser(response.data);
    setLoading(false);
  };

  const getUserById = async () => {
    if (id) {
      const response = await axios.post(`${tempUrl}/cabangs/${id}`, {
        id: user._id,
        token: user.token
      });
      setGambar(response.data.gambar);
      setKodeCabang(response.data.kodeCabang);
      setNamaCabang(response.data.namaCabang);
      setAlamatCabang(response.data.alamatCabang);
      setTeleponCabang(response.data.teleponCabang);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      await axios.post(`${tempUrl}/deleteCabang/${id}`, {
        id: user._id,
        token: user.token
      });
      getUsers();
      setGambar([]);
      setKodeCabang("");
      setNamaCabang("");
      setAlamatCabang("");
      setTeleponCabang("");
      setLoading(false);
      navigate("/cabang");
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
        Cabang
      </Typography>
      <Box sx={buttonModifierContainer}>
        <ButtonModifier
          id={id}
          kode={kodeCabang}
          addLink={`/cabang/tambahCabang`}
          editLink={`/cabang/${id}/edit`}
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
                    alt={namaCabang}
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
            label="Kode Cabang"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={kodeCabang}
          />
          <TextField
            id="outlined-basic"
            label="Nama Cabang"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={namaCabang}
          />
        </Box>
        <Box sx={textFieldBox}>
          <TextField
            id="outlined-basic"
            label="Alamat Cabang"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={alamatCabang}
          />
          <TextField
            id="outlined-basic"
            label="Telepon Cabang"
            variant="filled"
            sx={textFieldStyle}
            InputProps={{
              readOnly: true
            }}
            value={teleponCabang}
          />
        </Box>
      </Box>
      <Divider sx={dividerStyle} />
      <Box sx={searchBarContainer}>
        <SearchBar setSearchTerm={setSearchTerm} />
      </Box>
      <Box sx={tableContainer}>
        <ShowTableCabang currentPosts={currentPosts} searchTerm={searchTerm} />
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

export default TampilCabang;

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
