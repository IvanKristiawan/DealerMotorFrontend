import * as React from "react";
import { useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

export function ShowTableTipe({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
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
                val.kodeTipe.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.namaTipe.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.noRangka.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.noMesin.toUpperCase().includes(searchTerm.toUpperCase()) ||
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
                  "&:hover": { bgcolor: "#eeeeee" },
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
  );
}

export function ShowTableWarna({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
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
                  "&:hover": { bgcolor: "#eeeeee" },
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
  );
}

export function ShowTableAgama({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Kode</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nama Agama</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentPosts
            .filter((val) => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.kodeAgama
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.namaAgama.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
                  cursor: "pointer"
                }}
                onClick={() => {
                  navigate(`/agama/${user._id}`);
                }}
              >
                <TableCell component="th" scope="row">
                  {user.kodeAgama}
                </TableCell>
                <TableCell>{user.namaAgama}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableWilayah({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
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
                val.namaWilayah.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
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
  );
}

export function ShowTableKecamatan({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
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
                val.namaWilayah.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
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
  );
}

export function ShowTableDealer({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
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
                  "&:hover": { bgcolor: "#eeeeee" },
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
  );
}

export function ShowTableMarketing({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Kode</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nama Marketing</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Telepon Marketing</TableCell>
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
                  "&:hover": { bgcolor: "#eeeeee" },
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
  );
}

export function ShowTableSurveyor({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Kode</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Nama Surveyor</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Telepon Surveyor</TableCell>
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
                  "&:hover": { bgcolor: "#eeeeee" },
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
                <TableCell>
                  {user.jenisSurveyor === "C"
                    ? "C - CMO"
                    : user.jenisSurveyor === "S"
                    ? "S - Surveyor"
                    : ""}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export function ShowTableUser({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
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
                val.username.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.tipeUser.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.periode.toUpperCase().includes(searchTerm.toUpperCase()) ||
                val.kodeKwitansi
                  .toUpperCase()
                  .includes(searchTerm.toUpperCase()) ||
                val.noTerakhir.toUpperCase().includes(searchTerm.toUpperCase())
              ) {
                return val;
              }
            })
            .map((user, index) => (
              <TableRow
                key={user._id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { bgcolor: "#eeeeee" },
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
  );
}

export function ShowTableCabang({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
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
                  "&:hover": { bgcolor: "#eeeeee" },
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
  );
}

export function ShowTableLeasing({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
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
                  "&:hover": { bgcolor: "#eeeeee" },
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
  );
}

export function ShowTableRegister({ currentPosts, searchTerm }) {
  let navigate = useNavigate();
  return (
    <table>
      <tr>
        <th style={thTable}>No</th>
        <th style={thTable}>Tanggal</th>
        <th style={thTable}>Nama</th>
        <th style={thTable}>Alamat</th>
        <th style={thTable}>Telepon</th>
        <th style={thTable}>No. KTP</th>
        <th style={thTable}>Alm. KTP</th>
        <th style={thTable}>No. KK</th>
        <th style={thTable}>Nama Penjamin</th>
      </tr>
      <tr>
        <th style={thTable}></th>
        <th style={thTable}>Alm. Penjamin</th>
        <th style={thTable}>Tlp. Penjamin</th>
        <th style={thTable}>Hubungan</th>
        <th style={thTable}>No. KTP Penjamin</th>
        <th style={thTable}>Pekerjaan Penjamin</th>
        <th style={thTable}>Nama Ref.</th>
        <th style={thTable}>Alm. Ref.</th>
        <th style={thTable}>Tlp. Ref.</th>
      </tr>
      {currentPosts
        .filter((val) => {
          if (searchTerm === "") {
            return val;
          } else if (
            val.noRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
            val.tanggalRegister
              .toUpperCase()
              .includes(searchTerm.toUpperCase()) ||
            val.namaRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
            val.almRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
            val.tlpRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
            val.noKtpRegister
              .toUpperCase()
              .includes(searchTerm.toUpperCase()) ||
            val.almKtpRegister
              .toUpperCase()
              .includes(searchTerm.toUpperCase()) ||
            val.noKKRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
            val.namaPjmRegister
              .toUpperCase()
              .includes(searchTerm.toUpperCase()) ||
            val.almPjmRegister
              .toUpperCase()
              .includes(searchTerm.toUpperCase()) ||
            val.tlpPjmRegister
              .toUpperCase()
              .includes(searchTerm.toUpperCase()) ||
            val.hubunganRegister
              .toUpperCase()
              .includes(searchTerm.toUpperCase()) ||
            val.noKtpPjmRegister
              .toUpperCase()
              .includes(searchTerm.toUpperCase()) ||
            val.pkjRegister.toUpperCase().includes(searchTerm.toUpperCase()) ||
            val.namaRefRegister
              .toUpperCase()
              .includes(searchTerm.toUpperCase()) ||
            val.almRefRegister
              .toUpperCase()
              .includes(searchTerm.toUpperCase()) ||
            val.tlpRefRegister.toUpperCase().includes(searchTerm.toUpperCase())
          ) {
            return val;
          }
        })
        .map((user, index) => (
          <>
            <tr
              style={{
                cursor: "pointer",
                height: "100px",
                backgroundColor: index % 2 === 0 && "#dddddd"
              }}
              onClick={() => {
                navigate(`/register/${user._id}`);
              }}
            >
              <td style={tdTable}>{user.noRegister}</td>
              <td style={tdTable}>{user.tanggalRegister}</td>
              <td style={tdTable}>{user.namaRegister}</td>
              <td style={tdTable}>{user.almRegister}</td>
              <td style={tdTable}>{user.tlpRegister}</td>
              <td style={tdTable}>{user.noKtpRegister}</td>
              <td style={tdTable}>{user.almKtpRegister}</td>
              <td style={tdTable}>{user.noKKRegister}</td>
              <td style={tdTable}>{user.namaPjmRegister}</td>
            </tr>
            <tr
              style={{
                cursor: "pointer",
                height: "100px",
                backgroundColor: index % 2 === 0 && "#dddddd"
              }}
              onClick={() => {
                navigate(`/register/${user._id}`);
              }}
            >
              <td style={tdTable}></td>
              <td style={tdTable}>{user.almPjmRegister}</td>
              <td style={tdTable}>{user.tlpPjmRegister}</td>
              <td style={tdTable}>{user.hubunganRegister}</td>
              <td style={tdTable}>{user.noKtpPjmRegister}</td>
              <td style={tdTable}>{user.pkjRegister}</td>
              <td style={tdTable}>{user.namaRefRegister}</td>
              <td style={tdTable}>{user.almRefRegister}</td>
              <td style={tdTable}>{user.tlpRefRegister}</td>
            </tr>
          </>
        ))}
    </table>
    // <TableContainer component={Paper} sx={{ width: "100%" }}>
    //   <Table aria-label="simple table" sx={{ width: "3000px" }}>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell sx={{ fontWeight: "bold" }}>No</TableCell>
    //         <TableCell sx={{ fontWeight: "bold" }}>Tanggal</TableCell>
    //         <TableCell sx={{ fontWeight: "bold" }}>Nama</TableCell>
    //         <TableCell sx={{ fontWeight: "bold" }}>Alamat</TableCell>
    //         <TableCell sx={{ fontWeight: "bold" }}>Telepon</TableCell>
    //         <TableCell sx={{ fontWeight: "bold" }}>No. KTP</TableCell>
    //         <TableCell sx={{ fontWeight: "bold" }}>Alamat KTP</TableCell>
    //         <TableCell sx={{ fontWeight: "bold" }}>No KK</TableCell>
    //         <TableCell sx={{ fontWeight: "bold" }}>Nama Penjamin</TableCell>
    //         <TableCell sx={{ fontWeight: "bold" }}>Alamat Penjamin</TableCell>
    //         <TableCell sx={{ fontWeight: "bold" }}>Telepon Penjamin</TableCell>
    //         <TableCell sx={{ fontWeight: "bold" }}>Hubungan Penjamin</TableCell>
    //         <TableCell sx={{ fontWeight: "bold" }}>No. KTP Penjamin</TableCell>
    //         <TableCell sx={{ fontWeight: "bold" }}>Nama Penjamin</TableCell>
    //         <TableCell sx={{ fontWeight: "bold" }}>
    //           Pekerjaan Penjamin
    //         </TableCell>
    //         <TableCell sx={{ fontWeight: "bold" }}>Nama Referensi</TableCell>
    //         <TableCell sx={{ fontWeight: "bold" }}>Alamat Referensi</TableCell>
    //         <TableCell sx={{ fontWeight: "bold" }}>Telepon Referensi</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {currentPosts
    //         .filter((val) => {
    //           if (searchTerm === "") {
    //             return val;
    //           } else if (
    //             val.noRegister
    //               .toUpperCase()
    //               .includes(searchTerm.toUpperCase()) ||
    //             val.tanggalRegister
    //               .toUpperCase()
    //               .includes(searchTerm.toUpperCase()) ||
    //             val.namaRegister
    //               .toUpperCase()
    //               .includes(searchTerm.toUpperCase()) ||
    //             val.almRegister
    //               .toUpperCase()
    //               .includes(searchTerm.toUpperCase()) ||
    //             val.tlpRegister
    //               .toUpperCase()
    //               .includes(searchTerm.toUpperCase()) ||
    //             val.noKtpRegister
    //               .toUpperCase()
    //               .includes(searchTerm.toUpperCase()) ||
    //             val.almKtpRegister
    //               .toUpperCase()
    //               .includes(searchTerm.toUpperCase()) ||
    //             val.noKKRegister
    //               .toUpperCase()
    //               .includes(searchTerm.toUpperCase()) ||
    //             val.namaPjmRegister
    //               .toUpperCase()
    //               .includes(searchTerm.toUpperCase()) ||
    //             val.almPjmRegister
    //               .toUpperCase()
    //               .includes(searchTerm.toUpperCase()) ||
    //             val.tlpPjmRegister
    //               .toUpperCase()
    //               .includes(searchTerm.toUpperCase()) ||
    //             val.hubunganRegister
    //               .toUpperCase()
    //               .includes(searchTerm.toUpperCase()) ||
    //             val.noKtpPjmRegister
    //               .toUpperCase()
    //               .includes(searchTerm.toUpperCase()) ||
    //             val.pkjRegister
    //               .toUpperCase()
    //               .includes(searchTerm.toUpperCase()) ||
    //             val.namaRefRegister
    //               .toUpperCase()
    //               .includes(searchTerm.toUpperCase()) ||
    //             val.almRefRegister
    //               .toUpperCase()
    //               .includes(searchTerm.toUpperCase()) ||
    //             val.tlpRefRegister
    //               .toUpperCase()
    //               .includes(searchTerm.toUpperCase())
    //           ) {
    //             return val;
    //           }
    //         })
    //         .map((user, index) => (
    //           <TableRow
    //             key={user._id}
    //             sx={{
    //               "&:last-child td, &:last-child th": { border: 0 },
    //               "&:hover": { bgcolor: "#eeeeee" },
    //               cursor: "pointer"
    //             }}
    //             onClick={() => {
    //               navigate(`/register/${user._id}`);
    //             }}
    //           >
    //             <TableCell component="th" scope="row">
    //               {user.noRegister}
    //             </TableCell>
    //             <TableCell>{user.tanggalRegister}</TableCell>
    //             <TableCell>{user.namaRegister}</TableCell>
    //             <TableCell>{user.almRegister}</TableCell>
    //             <TableCell>{user.tlpRegister}</TableCell>
    //             <TableCell>{user.noKtpRegister}</TableCell>
    //             <TableCell>{user.almKtpRegister}</TableCell>
    //             <TableCell>{user.noKKRegister}</TableCell>
    //             <TableCell>{user.namaPjmRegister}</TableCell>
    //             <TableCell>{user.almPjmRegister}</TableCell>
    //             <TableCell>{user.tlpPjmRegister}</TableCell>
    //             <TableCell>{user.hubunganRegister}</TableCell>
    //             <TableCell>{user.noKtpPjmRegister}</TableCell>
    //             <TableCell>{user.pkjRegister}</TableCell>
    //             <TableCell>{user.namaRefRegister}</TableCell>
    //             <TableCell>{user.almRefRegister}</TableCell>
    //             <TableCell>{user.tlpRefRegister}</TableCell>
    //           </TableRow>
    //         ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
}
