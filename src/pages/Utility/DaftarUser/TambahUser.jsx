import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { tempUrl } from "../../../contexts/ContextProvider";
import { Loader } from "../../../components";
import {
  Box,
  Typography,
  Divider,
  Alert,
  Button,
  TextField,
  Snackbar,
  Paper
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const TambahUser = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [tipeUser, setTipeUser] = useState("");
  const [periode, setPeriode] = useState("");
  const [kodeKwitansi, setKodeKwitansi] = useState("");
  const [noTerakhir, setNoTerakhir] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const saveUser = async (e) => {
    if (
      username.length === 0 ||
      password.length === 0 ||
      tipeUser.length === 0 ||
      periode.length === 0 ||
      kodeKwitansi.length === 0
    ) {
      setError(true);
      setOpen(!open);
    } else {
      try {
        const res = await axios.post(`${tempUrl}/auth/register`, {
          username,
          password,
          tipeUser,
          periode,
          kodeKwitansi,
          noTerakhir
        });
        navigate("/daftarUser");
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Paper sx={container} elevation={3}>
      <Typography color="#757575">User</Typography>
      <Typography variant="h4" sx={subTitleText}>
        Tambah User
      </Typography>
      <Divider sx={dividerStyle} />
      <Box sx={showDataContainer}>
        <Box sx={showDataWrapper}>
          <TextField
            error={error && username.length === 0 && true}
            helperText={
              error && username.length === 0 && "Username harus diisi!"
            }
            id="outlined-basic"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value.toUpperCase())}
          />
          <TextField
            error={error && tipeUser.length === 0 && true}
            helperText={
              error && tipeUser.length === 0 && "Tipe User harus diisi!"
            }
            id="outlined-basic"
            label="Tipe User"
            variant="outlined"
            sx={spacingTop}
            value={tipeUser}
            onChange={(e) => setTipeUser(e.target.value.toUpperCase())}
          />
          <TextField
            error={error && periode.length === 0 && true}
            helperText={error && periode.length === 0 && "Periode harus diisi!"}
            id="outlined-basic"
            label="Periode"
            variant="outlined"
            sx={spacingTop}
            value={periode}
            onChange={(e) => setPeriode(e.target.value.toUpperCase())}
          />
        </Box>
        <Box sx={[showDataWrapper, { marginLeft: 4 }]}>
          <TextField
            error={error && kodeKwitansi.length === 0 && true}
            helperText={
              error && kodeKwitansi.length === 0 && "Kode Kwitansi harus diisi!"
            }
            id="outlined-basic"
            label="Kode Kwitansi"
            variant="outlined"
            value={kodeKwitansi}
            onChange={(e) => setKodeKwitansi(e.target.value.toUpperCase())}
          />
          <TextField
            id="outlined-basic"
            label="No Terakhir"
            variant="outlined"
            sx={spacingTop}
            value={noTerakhir}
            onChange={(e) => setNoTerakhir(e.target.value.toUpperCase())}
          />
          <TextField
            error={error && password.length === 0 && true}
            helperText={
              error && password.length === 0 && "Password harus diisi!"
            }
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            sx={spacingTop}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
      </Box>
      <Box sx={spacingTop}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/daftarUser")}
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
    </Paper>
  );
};

export default TambahUser;

const container = {
  p: 4,
  backgroundColor: "white",
  borderRadius: "20px"
};

const subTitleText = {
  fontWeight: "900"
};

const dividerStyle = {
  mt: 2
};

const showDataContainer = {
  mt: 4,
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "row"
  }
};

const showDataWrapper = {
  display: "flex",
  flex: 1,
  flexDirection: "column",
  maxWidth: {
    md: "40vw"
  }
};

const spacingTop = {
  mt: 4
};

const alertBox = {
  width: "100%"
};

const beforeLink = {
  cursor: "pointer",
  "&:hover": { color: "blue" }
};
