import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct } from "../../redux/actions/productActions";

const Card = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className="col-md-4 my-3">
      {console.log(product)}
      <div className="card h-100">
        <Link to="#">
          <img
            className="img-fluid w-100"
            src={`/uploads/${product.fileName}`}
            alt="product"
          />
        </Link>
        <div className="card-body text-center">
          <h5>{product.productName}</h5>
          <hr />
          <h6 className="mb-3">
            <span className="text-secondary mr-2">
              {product.productPrice.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </span>
          </h6>
          <p>
            {product.productDescription.length > 60
              ? product.productDescription.substring(0, 60) + "..."
              : product.productDescription.substring(0, 60)}
          </p>
          <Link
            to={`/admin/edit/product/${product._id}`}
            type="button"
            className="btn btn-secondary btn-sm mr-1 my-1"
          >
            <i className="far fa-edit pr-1"></i>Edit
          </Link>
          <button
            type="button"
            className="btn btn-danger btn-sm "
            onClick={() => dispatch(deleteProduct(product._id))}
          >
            <i className="far fa-trash-alt pr-1"></i>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
