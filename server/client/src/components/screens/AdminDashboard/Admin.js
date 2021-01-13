import React, { useEffect } from "react";

import AdminHeader from "./AdminHeader";
import AdminActionButtons from "./AdminActionButtons";
import AdminCategoryModal from "./AdminCategoryModal";
import AdminProductModal from "./AdminProductModal";
import { useDispatch } from "react-redux";
import { getCategories } from "../../../redux/actions/categoryAction";
import { getProducts } from "../../../redux/actions/productActions";
import AdminBody from "./AdminBody";

const Admin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return (
    <section>
      <AdminHeader />
      <AdminActionButtons />
      <AdminCategoryModal />
      <AdminProductModal />
      <AdminBody />
    </section>
  );
};

export default Admin;
