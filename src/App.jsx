import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import {
  Login,
  TampilTipe,
  TambahTipe,
  UbahTipe,
  TampilWarna,
  TambahWarna,
  UbahWarna,
  TampilWilayah,
  TambahWilayah,
  UbahWilayah,
  TampilKecamatan,
  TambahKecamatan,
  UbahKecamatan,
  TampilDealer,
  TambahDealer,
  UbahDealer,
  TampilMarketing,
  TambahMarketing,
  UbahMarketing,
  TampilSurveyor,
  TambahSurveyor,
  UbahSurveyor,
  TampilCabang,
  TambahCabang,
  UbahCabang,
  TampilLeasing,
  TambahLeasing,
  UbahLeasing,
  ProfilUser,
  UbahProfilUser,
  DaftarUser,
  TambahUser,
  UbahUser
} from "./pages/index";
import { AuthContext } from "./contexts/AuthContext";

const App = () => {
  const USERRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user) {
      return children;
    }

    return <Navigate to="/unauthorized" />;
  };
  const MGRRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (user && user.tipeUser === "MGR") {
      return children;
    }

    return <Navigate to="/unauthorized" />;
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={null} />
          {/* Login */}
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Login />} />
          {/* Tipe */}
          <Route
            path="/tipe"
            element={
              <USERRoute>
                <TampilTipe />
              </USERRoute>
            }
          />
          <Route
            path="/tipe/tambahTipe"
            element={
              <USERRoute>
                <TambahTipe />
              </USERRoute>
            }
          />
          <Route
            path="/tipe/:id"
            element={
              <USERRoute>
                <TampilTipe />
              </USERRoute>
            }
          />
          <Route
            path="/tipe/:id/edit"
            element={
              <USERRoute>
                <UbahTipe />
              </USERRoute>
            }
          />
          {/* Warna */}
          <Route
            path="/warna"
            element={
              <USERRoute>
                <TampilWarna />
              </USERRoute>
            }
          />
          <Route
            path="/warna/:id"
            element={
              <USERRoute>
                <TampilWarna />
              </USERRoute>
            }
          />
          <Route
            path="/warna/tambahWarna"
            element={
              <USERRoute>
                <TambahWarna />
              </USERRoute>
            }
          />
          <Route
            path="/warna/:id/edit"
            element={
              <USERRoute>
                <UbahWarna />
              </USERRoute>
            }
          />
          {/* Wilayah */}
          <Route
            path="/wilayah"
            element={
              <USERRoute>
                <TampilWilayah />
              </USERRoute>
            }
          />
          <Route
            path="/wilayah/:id"
            element={
              <USERRoute>
                <TampilWilayah />
              </USERRoute>
            }
          />
          <Route
            path="/wilayah/tambahWilayah"
            element={
              <USERRoute>
                <TambahWilayah />
              </USERRoute>
            }
          />
          <Route
            path="/wilayah/:id/edit"
            element={
              <USERRoute>
                <UbahWilayah />
              </USERRoute>
            }
          />
          {/* Kecamatan */}
          <Route
            path="/kecamatan"
            element={
              <USERRoute>
                <TampilKecamatan />
              </USERRoute>
            }
          />
          <Route
            path="/kecamatan/:id"
            element={
              <USERRoute>
                <TampilKecamatan />
              </USERRoute>
            }
          />
          <Route
            path="/kecamatan/tambahKecamatan"
            element={
              <USERRoute>
                <TambahKecamatan />
              </USERRoute>
            }
          />
          <Route
            path="/kecamatan/:id/edit"
            element={
              <USERRoute>
                <UbahKecamatan />
              </USERRoute>
            }
          />
          {/* Dealer */}
          <Route
            path="/dealer"
            element={
              <USERRoute>
                <TampilDealer />
              </USERRoute>
            }
          />
          <Route
            path="/dealer/:id"
            element={
              <USERRoute>
                <TampilDealer />
              </USERRoute>
            }
          />
          <Route
            path="/dealer/tambahDealer"
            element={
              <USERRoute>
                <TambahDealer />
              </USERRoute>
            }
          />
          <Route
            path="/dealer/:id/edit"
            element={
              <USERRoute>
                <UbahDealer />
              </USERRoute>
            }
          />
          {/* Marketing */}
          <Route
            path="/marketing"
            element={
              <USERRoute>
                <TampilMarketing />
              </USERRoute>
            }
          />
          <Route
            path="/marketing/:id"
            element={
              <USERRoute>
                <TampilMarketing />
              </USERRoute>
            }
          />
          <Route
            path="/marketing/tambahMarketing"
            element={
              <USERRoute>
                <TambahMarketing />
              </USERRoute>
            }
          />
          <Route
            path="/marketing/:id/edit"
            element={
              <USERRoute>
                <UbahMarketing />
              </USERRoute>
            }
          />
          {/* Surveyor */}
          <Route
            path="/surveyor"
            element={
              <USERRoute>
                <TampilSurveyor />
              </USERRoute>
            }
          />
          <Route
            path="/surveyor/:id"
            element={
              <USERRoute>
                <TampilSurveyor />
              </USERRoute>
            }
          />
          <Route
            path="/surveyor/tambahSurveyor"
            element={
              <USERRoute>
                <TambahSurveyor />
              </USERRoute>
            }
          />
          <Route
            path="/surveyor/:id/edit"
            element={
              <USERRoute>
                <UbahSurveyor />
              </USERRoute>
            }
          />
          {/* Cabang */}
          <Route
            path="/cabang"
            element={
              <USERRoute>
                <TampilCabang />
              </USERRoute>
            }
          />
          <Route
            path="/cabang/:id"
            element={
              <USERRoute>
                <TampilCabang />
              </USERRoute>
            }
          />
          <Route
            path="/cabang/tambahCabang"
            element={
              <USERRoute>
                <TambahCabang />
              </USERRoute>
            }
          />
          <Route
            path="/cabang/:id/edit"
            element={
              <USERRoute>
                <UbahCabang />
              </USERRoute>
            }
          />
          {/* Leasing */}
          <Route
            path="/leasing"
            element={
              <USERRoute>
                <TampilLeasing />
              </USERRoute>
            }
          />
          <Route
            path="/leasing/:id"
            element={
              <USERRoute>
                <TampilLeasing />
              </USERRoute>
            }
          />
          <Route
            path="/leasing/tambahLeasing"
            element={
              <USERRoute>
                <TambahLeasing />
              </USERRoute>
            }
          />
          <Route
            path="/leasing/:id/edit"
            element={
              <USERRoute>
                <UbahLeasing />
              </USERRoute>
            }
          />
          {/* Profil User */}
          <Route
            path="/profilUser"
            element={
              <USERRoute>
                <ProfilUser />
              </USERRoute>
            }
          />
          <Route
            path="/profilUser/:id/edit"
            element={
              <USERRoute>
                <UbahProfilUser />
              </USERRoute>
            }
          />
          {/* Daftar User */}
          <Route
            path="/daftarUser"
            element={
              <MGRRoute>
                <DaftarUser />
              </MGRRoute>
            }
          />
          <Route
            path="/daftarUser/:id"
            element={
              <MGRRoute>
                <DaftarUser />
              </MGRRoute>
            }
          />
          <Route
            path="/daftarUser/:id/edit"
            element={
              <MGRRoute>
                <UbahUser />
              </MGRRoute>
            }
          />
          <Route
            path="/daftarUser/tambahUser"
            element={
              <MGRRoute>
                <TambahUser />
              </MGRRoute>
            }
          />
          <Route path="*" element={<p>Halaman tidak ditemukan!</p>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
