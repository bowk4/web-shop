import React from "react";
import { Route, Routes } from "react-router-dom";
import AccessoriesPage from "../pages/AccessoriesPage/AccessoriesPage";
import PhonesPage from "../pages/PhonesPage/PhonesPage";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
import TabletsPage from "../pages/TabletsPage/TabletsPage";
import CartPage from "../pages/CartPage/CartPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import HomePage from "../pages/HomePage/HomePage";
import WrongRoute from "../pages/WrongRoutePage/WrongRoute";
import SingleProductPage from "../pages/SIngleProductPage/SingleProductPage";
import SingleAccessoriesPage from "../pages/SingleAccessoriesPage/SingleAccessoriesPage";
import RightsPage from "../pages/RightsPage/RightsPage";
import ContactsPage from "../pages/ContactsPage/ContactsPage";
import UserPage from "../pages/UserPage/UserPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import UserUpdatePass from "../pages/UserPage/UserUpdatePass/UserUpdatePass";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import UserDataInformation from "../pages/UserPage/UserDataInformation/UserDataInformation";
import AdminPage from "../pages/AdminPage/AdminPage";
import OrdersPage from "../pages/OrdersPage/OrdersPage";
import { ProtectedRoute } from "../helpers/protectedRoute.js";

const RootRouters = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/accessories" element={<AccessoriesPage />} />
      <Route
        path="/accessories/:accessoryId"
        element={<SingleAccessoriesPage />}
      />
      <Route path="/phones" element={<PhonesPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/phones/:modelId" element={<SingleProductPage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/tablets" element={<TabletsPage />} />
      <Route path="/tablets/:modelId" element={<SingleProductPage />} />
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route path="/update-information" element={<UserDataInformation />} />
      <Route path="/update-password" element={<UserUpdatePass />} />
      <Route path="/rights" element={<RightsPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/contacts" element={<ContactsPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="*" element={<WrongRoute />} />
    </Routes>
  );
};

export default RootRouters;
