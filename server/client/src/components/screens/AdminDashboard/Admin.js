import React from "react";

import AdminHeader from "./AdminHeader";
import AdminActionButtons from "./AdminActionButtons";
import AdminCategoryModal from "./AdminCategoryModal";
import AdminFoodModal from "./AdminFoodModal";
const Admin = () => {
  return (
    <section>
      <AdminHeader />
      <AdminActionButtons />
      <AdminCategoryModal />
      <AdminFoodModal />
    </section>
  );
};

export default Admin;
