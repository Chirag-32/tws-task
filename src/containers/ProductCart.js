import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form } from "formik";
import {
  selectedProduct,
  removeSelectedProduct,
  setCustomerInformation,
} from "../redux/actions/productsActions";
import * as Yup from "yup";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { useHistory } from "react-router-dom";

const initialValues = {
  email: "",
  first_name: "",
  last_name: "",
  phone: "",
};

const signUpValidationSchema = () =>
  Yup.object().shape({
    first_name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .min(3, "Must be 3 characters")
      .matches(/[A-Za-z]+/g, "First Name must contain character only")
      .required("First Name is Required*"),
    last_name: Yup.string()
      .max(20, "Must be 20 characters or less")
      .min(3, "Must be 3 characters")
      .matches(/[A-Za-z]+/g, "Last Name must contain character only")
      .required("Last Name is Required*"),
    email: Yup.string().required("Email is required*").email("invalid email"),
    phone: Yup.string().required("Phone Number is required*"),
  });

const ProductCart = () => {
  let product = useSelector((state) => state.product);
  const { image, title, price, category, description } = product;
  const dispatch = useDispatch();
  const history = useHistory()
  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(selectedProduct(response.data));
  };
  const handleSubmit = (formValues) => {
    dispatch(setCustomerInformation(formValues));
    history.push('/review-order')
  };

  useEffect(() => {
    if (product.id && product.id !== "") fetchProductDetail(product.id);
  }, [product.id]);
  return (
    <div className='ui container'>
      {Object.keys(product).length === 0 ? (
        <div>No Product Added, Please add a Product</div>
      ) : (
        <>
          <div className='ui placeholder segment'>
            <div className='ui two column stackable center aligned'>
              <div className='middle aligned row'>
                <div className='column rp'>
                  <h1><span>Product Name:   </span> {title}</h1>
                  <h2>
                    <span>Product Price:   </span>
                    <a className='ui teal tag label'>${price}</a>
                  </h2>
                  <h3 className='ui brown block header'>{category}</h3>
                  <p>{description}</p>
                </div>
              </div>
            </div>
          </div>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
            validationSchema={() => signUpValidationSchema()}
          >
            {({
              errors,
              values,
              touched,
              handleBlur,
              handleChange,
              setFieldValue,
              dirty,
              isValid,
            }) => (
              <Form className='ui form'>
                <h2>Enter Information</h2>
                <div className='row'>
                  <div className='col-12 my-4 field'>
                    <label>Email</label>
                    <input
                      className='form-control'
                      name='email'
                      label='Email addess'
                      type='text'
                      onChange={handleChange}
                      value={values.email}
                      onBlur={handleBlur}
                    />
                    {touched.email && errors.email && (
                      <span className='error-text text-danger'>
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-6 mb-4 field'>
                    <label>First Name</label>
                    <input
                      className='form-control'
                      name='first_name'
                      label="First name"
                      type="text"
                      onChange={handleChange}
                      value={values.first_name}
                      onBlur={handleBlur}
                    />
                    {touched.first_name && errors.first_name && (
                      <span className='error-text text-danger'>
                        {errors.first_name}
                      </span>
                    )}
                  </div>

                  <div className='col-md-6 mb-4 field'>
                    <label>Last Name</label>

                    <input
                      className='form-control'
                      name='last_name'
                      label='Last name'
                      type='text'
                      onChange={handleChange}
                      value={values.last_name}
                      onBlur={handleBlur}
                    />
                    {touched.last_name && errors.last_name && (
                      <span className='error-text text-danger'>
                        {errors.last_name}
                      </span>
                    )}
                  </div>
                </div>
                <div className='row'>
                  <div
                    className={
                      !!values.phone === false
                        ? "phone-input position-relative col-md-12 mb-4"
                        : "phone-input position-relative mb-4 filled col-md-12 field"
                    }
                  >
                    <label>Phone number</label>
                    <PhoneInput
                      value={values.phone}
                      defaultCountry='US'
                      smartCaret
                      onChange={(e) => setFieldValue("phone", e)}
                      required
                      onBlur={handleBlur}
                      name='phone'
                      maxLength={14}
                      className='form-control'
                    />
                    {touched.phone && errors.phone && (
                      <span className='error-text text-danger'>
                        {errors.phone}
                      </span>
                    )}
                    {values.phone &&
                      !errors.phone &&
                      isValidPhoneNumber(values.phone) === false && (
                        <span className='error-text text-danger'>
                          Invalid Phone Number
                        </span>
                      )}

                    <div className='form-input-text'>
                      Standard call, messaging or data rates may apply.
                    </div>
                  </div>
                </div>

                <div className='d-flex align-items-center justify-content-between mt-4'>
                  <button
                    className='btn submit-btn ui button'
                    
                    type='submit'
                    disabled={
                      !dirty ||
                      !isValid ||
                      (values.phone && !isValidPhoneNumber(values.phone))
                    }
                  >
                    Review Order
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
};

export default ProductCart;
