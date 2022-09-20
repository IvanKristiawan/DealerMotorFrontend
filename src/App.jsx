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
  TampilAgama,
  TambahAgama,
  UbahAgama,
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
  UbahMarketing
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
          {/* Agama */}
          <Route
            path="/agama"
            element={
              <USERRoute>
                <TampilAgama />
              </USERRoute>
            }
          />
          <Route
            path="/agama/:id"
            element={
              <USERRoute>
                <TampilAgama />
              </USERRoute>
            }
          />
          <Route
            path="/agama/tambahAgama"
            element={
              <USERRoute>
                <TambahAgama />
              </USERRoute>
            }
          />
          <Route
            path="/agama/:id/edit"
            element={
              <USERRoute>
                <UbahAgama />
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
          <Route path="*" element={<p>Halaman tidak ditemukan!</p>} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
