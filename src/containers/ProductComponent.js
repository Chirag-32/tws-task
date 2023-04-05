import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct } from "../redux/actions/productsActions";

const ProductComponent = () => {
  const data = useSelector((state) => state);
  const { allProducts, product } = data;
  const isProductAdded = Object.keys(product)?.length > 0;
  const dispatch = useDispatch();
  const addToCart = (product) => {
    dispatch(selectedProduct(product));
  };
  const renderList = allProducts.products.map((product) => {
    const { id, title, image, price, category } = product;
    return (
      <div className='four wide column' key={id}>
        <div className='ui link cards'>
          <div className='card'>
            <div className='image'>
              <img src={image} alt={title} />
            </div>
            <div className='content'>
              <div className='header'>{title}</div>
              <div className='meta price'>$ {price}</div>
              <div className='meta'>{category}</div>
              <div className='center '>
                <button
                  className='cart-btn'
                  onClick={() => addToCart(product)}
                  disabled={isProductAdded}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return <>{renderList}</>;
};

export default ProductComponent;
