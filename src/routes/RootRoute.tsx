import { BrowserRouter, Route, Routes } from "react-router-dom";
import Category from "../pages/Category/Category";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Paper from "../pages/Paper/Paper";
import Product from "../pages/Product/Product";
import Table from "../pages/Table/Table";
import User from "../pages/User/User";
import { GlobalProvider } from "../providers/GlobalProvider";
import { SidebarProvider } from "../providers/SidebarProvider";
import { RegistrationRoute } from "./Modules/RegistrationRoute";

const RootRoute = () => {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <SidebarProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="registration" element={<RegistrationRoute />}>
              <Route path="product" element={<Product />} />
              <Route path="category" element={<Category />} />
              <Route path="table" element={<Table />} />
              <Route path="paper" element={<Paper />} />
              <Route path="user" element={<User />} />
            </Route>
          </Routes>
        </SidebarProvider>
      </GlobalProvider>
    </BrowserRouter>
  );
};

export default RootRoute;
