import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card";

const AdminBody = () => {
  const { products } = useSelector((state) => state.products);

  return (
    <div className="container">
      <div className="row">
        <div className="card-deck">
          {products.map((product) => (
            <Card key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminBody;
