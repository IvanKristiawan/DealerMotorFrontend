import * as React from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const tdTable = {
  border: "1px solid #dddddd",
  textAlign: "left",
  padding: "8px"
};

const thTable = {
  border: "1px solid #dddddd",
  textAlign: "left",
  padding: "8px",
  backgroundColor: "gray",
  color: "white"
};

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  }
});

export function ShowTableTipe({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Kode</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nama Tipe</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>No. Rangka</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>No. Mesin</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Isi (cc)</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Merk</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.kodeTipe
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.namaTipe
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.noRangka
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.noMesin
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.isi.toUpperCase().includes(searchTerm.toUpperCase()) ||
                  val.merk.toUpperCase().includes(searchTerm.toUpperCase())
                ) {
                  return val;
                }
              })
              .map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "gray" },
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    navigate(`/tipe/${user._id}`);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {user.kodeTipe}
                  </TableCell>
                  <TableCell>{user.namaTipe}</TableCell>
                  <TableCell>{user.noRangka}</TableCell>
                  <TableCell>{user.noMesin}</TableCell>
                  <TableCell>{user.isi}</TableCell>
                  <TableCell>{user.merk}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export function ShowTableWarna({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Nama Warna</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.namaWarna.toUpperCase().includes(searchTerm.toUpperCase())
                ) {
                  return val;
                }
              })
              .map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "gray" },
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    navigate(`/warna/${user._id}`);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {user.namaWarna}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export function ShowTableWilayah({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Kode</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nama Wilayah</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.kodeWilayah
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.namaWilayah
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase())
                ) {
                  return val;
                }
              })
              .map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "gray" },
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    navigate(`/wilayah/${user._id}`);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {user.kodeWilayah}
                  </TableCell>
                  <TableCell>{user.namaWilayah}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export function ShowTableKecamatan({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Kode Kecamatan</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nama Kecamatan</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Kode Wilayah</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nama Wilayah</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.kodeWilayah
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.kodeKecamatan
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.namaKecamatan
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.namaWilayah
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase())
                ) {
                  return val;
                }
              })
              .map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "gray" },
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    navigate(`/kecamatan/${user._id}`);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {user.kodeKecamatan}
                  </TableCell>
                  <TableCell>{user.namaKecamatan}</TableCell>
                  <TableCell>{user.kodeWilayah}</TableCell>
                  <TableCell>{user.namaWilayah}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export function ShowTableDealer({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Kode</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nama Dealer</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Alamat</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Telepon</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>PIC</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.kodeDealer
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.namaDealer
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.alamatDealer
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.teleponDealer
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.PICDealer.toUpperCase().includes(searchTerm.toUpperCase())
                ) {
                  return val;
                }
              })
              .map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "gray" },
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    navigate(`/dealer/${user._id}`);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {user.kodeDealer}
                  </TableCell>
                  <TableCell>{user.namaDealer}</TableCell>
                  <TableCell>{user.alamatDealer}</TableCell>
                  <TableCell>{user.teleponDealer}</TableCell>
                  <TableCell>{user.PICDealer}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export function ShowTableMarketing({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Kode</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nama Marketing</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Telepon Marketing
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.kodeMarketing
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.namaMarketing
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.teleponMarketing
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase())
                ) {
                  return val;
                }
              })
              .map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "gray" },
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    navigate(`/marketing/${user._id}`);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {user.kodeMarketing}
                  </TableCell>
                  <TableCell>{user.namaMarketing}</TableCell>
                  <TableCell>{user.teleponMarketing}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export function ShowTableSurveyor({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Kode</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nama Surveyor</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Telepon Surveyor
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Jenis Surveyor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.kodeSurveyor
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.namaSurveyor
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.teleponSurveyor
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.jenisSurveyor
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase())
                ) {
                  return val;
                }
              })
              .map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "gray" },
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    navigate(`/surveyor/${user._id}`);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {user.kodeSurveyor}
                  </TableCell>
                  <TableCell>{user.namaSurveyor}</TableCell>
                  <TableCell>{user.teleponSurveyor}</TableCell>
                  <TableCell>{user.jenisSurveyor}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export function ShowTableUser({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Username</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tipe User</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Periode</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Kode Kwitansi</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>No Terakhir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.username
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.tipeUser
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.periode
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.kodeKwitansi
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.noTerakhir
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase())
                ) {
                  return val;
                }
              })
              .map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "gray" },
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    navigate(`/daftarUser/${user._id}`);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {user.username}
                  </TableCell>
                  <TableCell>{user.tipeUser}</TableCell>
                  <TableCell>{user.periode}</TableCell>
                  <TableCell>{user.kodeKwitansi}</TableCell>
                  <TableCell>{user.noTerakhir}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export function ShowTableCabang({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Kode Cabang</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nama Cabang</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Alamat Cabang</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Telepon Cabang</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>PIC</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.kodeCabang
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.namaCabang
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.alamatCabang
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.teleponCabang
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.picCabang.toUpperCase().includes(searchTerm.toUpperCase())
                ) {
                  return val;
                }
              })
              .map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "gray" },
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    navigate(`/cabang/${user._id}`);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {user.kodeCabang}
                  </TableCell>
                  <TableCell>{user.namaCabang}</TableCell>
                  <TableCell>{user.alamatCabang}</TableCell>
                  <TableCell>{user.teleponCabang}</TableCell>
                  <TableCell>{user.picCabang}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export function ShowTableLeasing({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Kode Leasing</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nama Leasing</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Alamat Leasing</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Telepon Leasing</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.kodeLeasing
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.namaLeasing
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.alamatLeasing
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.teleponLeasing
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase())
                ) {
                  return val;
                }
              })
              .map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "gray" },
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    navigate(`/leasing/${user._id}`);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {user.kodeLeasing}
                  </TableCell>
                  <TableCell>{user.namaLeasing}</TableCell>
                  <TableCell>{user.alamatLeasing}</TableCell>
                  <TableCell>{user.teleponLeasing}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export function ShowTableSupplier({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Kode</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nama Supplier</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Alamat</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Kota</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Telepon</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>PIC</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>NPWP</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.kodeSupplier
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.namaSupplier
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.alamatSupplier
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.kotaSupplier
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.teleponSupplier
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.picSupplier
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.npwpSupplier
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase())
                ) {
                  return val;
                }
              })
              .map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "gray" },
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    navigate(`/supplier/${user._id}`);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {user.kodeSupplier}
                  </TableCell>
                  <TableCell>{user.namaSupplier}</TableCell>
                  <TableCell>{user.alamatSupplier}</TableCell>
                  <TableCell>{user.kotaSupplier}</TableCell>
                  <TableCell>{user.teleponSupplier}</TableCell>
                  <TableCell>{user.picSupplier}</TableCell>
                  <TableCell>{user.npwpSupplier}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export function ShowTableDaftarBeli({ currentPosts, searchTerm, suppliers }) {
  let navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>No. Beli</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Kode Supplier</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Jumlah</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>PPN</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Potongan</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Lama</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tanggal</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Jatuh Tempo</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Jenis</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts
              .filter((val) => {
                if (searchTerm === "") {
                  return val;
                } else if (
                  val.noBeli.includes(searchTerm) ||
                  val.tanggalBeli
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.kodeSupplier
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.jumlahBeli.toString().includes(searchTerm) ||
                  val.ppnBeli
                    .toString()
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.potongan
                    .toString()
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.lama
                    .toString()
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.jenisBeli
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase()) ||
                  val.jatuhTempo
                    .toUpperCase()
                    .includes(searchTerm.toUpperCase())
                ) {
                  return val;
                }
              })
              .map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "gray" },
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    navigate(`/daftarBeli/beli/${user._id}`);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {user.noBeli}
                  </TableCell>
                  <TableCell>
                    {user.kodeSupplier} -
                    {suppliers
                      .filter(
                        (supplier) =>
                          supplier.kodeSupplier === user.kodeSupplier
                      )
                      .map((sup) => ` ${sup.namaSupplier}`)}
                  </TableCell>
                  <TableCell>{user.jumlahBeli.toLocaleString()}</TableCell>
                  <TableCell>{user.ppnBeli.toLocaleString()}</TableCell>
                  <TableCell>{user.potongan.toLocaleString()}</TableCell>
                  <TableCell>{user.lama.toLocaleString()}</TableCell>
                  <TableCell>{user.tanggalBeli}</TableCell>
                  <TableCell>{user.jatuhTempo}</TableCell>
                  <TableCell>{user.jenisBeli}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}

export function ShowTableBeli({ id, currentPosts, nomorNota }) {
  let navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Kode Tipe</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tahun</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Warna</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>No. Rangka</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>No. Mesin</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nopol</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Nama STNK</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tgl. STNK</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Jenis</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Harga Satuan</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>PPN</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Tanggal Jual</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>No. Jual</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPosts
              .filter((val) => {
                if (val.noBeli === nomorNota) {
                  return val;
                }
              })
              .map((aBeli, index) => (
                <TableRow
                  key={aBeli.kodeStok}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { bgcolor: "gray" },
                    cursor: "pointer"
                  }}
                  onClick={() => {
                    navigate(`/daftarBeli/beli/${id}/${aBeli._id}`);
                  }}
                >
                  <TableCell component="th" scope="row">
                    {aBeli.kodeTipe}
                  </TableCell>
                  <TableCell>{aBeli.tahun}</TableCell>
                  <TableCell>{aBeli.namaWarna}</TableCell>
                  <TableCell>{aBeli.noRangka}</TableCell>
                  <TableCell>{aBeli.noMesin}</TableCell>
                  <TableCell>{aBeli.nopol}</TableCell>
                  <TableCell>{aBeli.namaStnk}</TableCell>
                  <TableCell>{aBeli.tglStnk}</TableCell>
                  <TableCell>{aBeli.jenisABeli}</TableCell>
                  <TableCell>{aBeli.hargaSatuan.toLocaleString()}</TableCell>
                  <TableCell>{aBeli.ppnABeli.toLocaleString()}</TableCell>
                  <TableCell>{aBeli.tanggalJual}</TableCell>
                  <TableCell>{aBeli.noJual}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
}
