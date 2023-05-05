import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import classNames from "classnames";

const CheckoutForm = () => {
  const [email, setEmail] = useState("");
  const [isShippingOpen, setIsShippingOpen] = useState(true);

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isReviewOrderOpen, setIsReviewOrderOpen] = useState(false);

  const toggleShipping = () => {
    setIsShippingOpen(!isShippingOpen);
  };

  const togglePayment = () => {
    setIsPaymentOpen(!isPaymentOpen);
  };
  const toggleReview = () => {
    setIsReviewOrderOpen(!isReviewOrderOpen);
  };

  const checkValue = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (/\D/.test(String.fromCharCode(charCode))) {
      e.preventDefault();
    }
  };

  const commonInput =
    "rounded ship-font shadow-inner shadow-grey-50 h-[30px] px-2 mb-2";
  const commonLabel = "ship-font text-sm";

  const states = [
    { name: "Alabama", abbr: "AL" },
    { name: "Alaska", abbr: "AK" },
    { name: "Arizona", abbr: "AZ" },
    { name: "Arkansas", abbr: "AR" },
    { name: "California", abbr: "CA" },
    { name: "Colorado", abbr: "CO" },
    { name: "Connecticut", abbr: "CT" },
    { name: "Delaware", abbr: "DE" },
    { name: "Florida", abbr: "FL" },
    { name: "Georgia", abbr: "GA" },
    { name: "Hawaii", abbr: "HI" },
    { name: "Idaho", abbr: "ID" },
    { name: "Illinois", abbr: "IL" },
    { name: "Indiana", abbr: "IN" },
    { name: "Iowa", abbr: "IA" },
    { name: "Kansas", abbr: "KS" },
    { name: "Kentucky", abbr: "KY" },
    { name: "Louisiana", abbr: "LA" },
    { name: "Maine", abbr: "ME" },
    { name: "Maryland", abbr: "MD" },
    { name: "Massachusetts", abbr: "MA" },
    { name: "Michigan", abbr: "MI" },
    { name: "Minnesota", abbr: "MN" },
    { name: "Mississippi", abbr: "MS" },
    { name: "Missouri", abbr: "MO" },
    { name: "Montana", abbr: "MT" },
    { name: "Nebraska", abbr: "NE" },
    { name: "Nevada", abbr: "NV" },
    { name: "New Hampshire", abbr: "NH" },
    { name: "New Jersey", abbr: "NJ" },
    { name: "New Mexico", abbr: "NM" },
    { name: "New York", abbr: "NY" },
    { name: "North Carolina", abbr: "NC" },
    { name: "North Dakota", abbr: "ND" },
    { name: "Ohio", abbr: "OH" },
    { name: "Oklahoma", abbr: "OK" },
    { name: "Oregon", abbr: "OR" },
    { name: "Pennsylvania", abbr: "PA" },
    { name: "Rhode Island", abbr: "RI" },
    { name: "South Carolina", abbr: "SC" },
    { name: "South Dakota", abbr: "SD" },
    { name: "Tennessee", abbr: "TN" },
    { name: "Texas", abbr: "TX" },
    { name: "Utah", abbr: "UT" },
    { name: "Vermont", abbr: "VT" },
    { name: "Virginia", abbr: "VA" },
    { name: "Washington", abbr: "WA" },
    { name: "West Virginia", abbr: "WV" },
    { name: "Wisconsin", abbr: "WI" },
    { name: "Wyoming", abbr: "WY" },
  ];

  const months = [
    { name: "January", int: 1 },
    { name: "February", int: 2 },
    { name: "March", int: 3 },
    { name: "April", int: 4 },
    { name: "May", int: 5 },
    { name: "June", int: 6 },
    { name: "July", int: 7 },
    { name: "August", int: 8 },
    { name: "September", int: 9 },
    { name: "October", int: 10 },
    { name: "November", int: 11 },
    { name: "December", int: 12 },
  ];

  const years = [
    { name: 2023 },
    { name: 2024 },
    { name: 2025 },
    { name: 2026 },
    { name: 2027 },
    { name: 2028 },
    { name: 2029 },
  ];

  const getItems = () => {
    const storedValues = localStorage.getItem("formValues");
    const initialValues = storedValues
      ? JSON.parse(storedValues)
      : {
          firstName: "",
          lastName: "",
          streetAddress: "",
          email: "",
          cardNum: "",
        };
    console.log(initialValues);
  };
  getItems();
  return (
    <div className="flex-col w-1/3 mr-16">
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          shippingAddress: "",
          shippingCity: "",
          shippingState: "",
          shippingZip: "",
          phone: "",
          email: "",
          cardName: "",
          cardNum: "",
          expMonth: "",
          expYear: "",
          cvv: "",
          billingSameAsShipping: true, // added a new field for the checkbox
          billingAddress: "",
          billingCity: "",
          billingState: "",
          billingZip: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          shippingAddress: Yup.string().required("Required street Address"),
          shippingCity: Yup.string().required("City Required"),
          shippingState: Yup.string().required("State Required"),
          shippingZip: Yup.string()
            .required("Zip Code Required")
            .min(5, "Zip must be 5 digits"),
          phone: Yup.string()
            .required("Phone Required")
            .min(10, "Zip must be 10 digits"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          cardName: Yup.string().required("Required"),
          cardNum: Yup.string()
            .min(16, "Must be 16 characters")
            .required("Required"),
          expMonth: Yup.string().required("Required"),
          expYear: Yup.string().required("Required"),
          cvv: Yup.string().min(3, "Zip must be 3 digits").required("Required"),
          // billingAddress: Yup.string().required("Required street Address"),
          // billingCity: Yup.string().required("City Required"),
          // billingState: Yup.string().required("State Required"),
          // billingZip: Yup.string()
          //   .required("Zip Code Required")
          //   .min(5, "Zip must be 5 digits"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            if (values.billingSameAsShipping) {
              // set the billing fields to the corresponding shipping fields
              values.billingAddress = values.shippingAddress;
              values.billingCity = values.shippingCity;
              values.billingState = values.shippingState;
              values.billingZip = values.shippingZip;
            }
            console.log(values.shippingState);
            console.log(values.billingState);

            const data = JSON.stringify(values);
            localStorage.setItem("formData", data);
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <h1 className="ship-font text-2xl mb-4 border-b-2 border-black pb-4" onClick={toggleShipping}>
              SHIPPING
            </h1>
            {isShippingOpen && (
              <div>
                <div className="flex justify-between">
                  <div className="flex flex-col mr-8">
                    <label
                      className={classNames(commonLabel, "")}
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <Field
                      className={classNames(commonInput, "w-60")}
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                    <ErrorMessage name="firstName" />
                  </div>
                  <div className="ship-font flex flex-col ">
                    <label
                      className={classNames(commonLabel, "w-60")}
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <Field
                      className={classNames(commonInput, "")}
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                    <ErrorMessage name="lastName" />
                  </div>
                </div>

                <div className="ship-font flex flex-col">
                  <label
                    className={classNames(commonLabel, "")}
                    htmlFor="shippingAddress"
                  >
                    Shipping Address
                  </label>
                  <Field
                    className={classNames(commonInput, "")}
                    type="text"
                    name="shippingAddress"
                    value={values.shippingAddress}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="shippingAddress" />
                </div>

                <div className="flex justify-between">
                  <div className="ship-font flex flex-col">
                    <label
                      className={classNames(commonLabel, "")}
                      htmlFor="shippingCity"
                    >
                      City
                    </label>
                    <Field
                      className={classNames(commonInput, "w-60")}
                      type="text"
                      name="shippingCity"
                      value={values.shippingCity}
                      onChange={handleChange}
                    />
                    <ErrorMessage name="shippingCity" />
                  </div>
                  <div className="ship-font flex flex-col">
                    <label
                      className={classNames(commonLabel, "")}
                      htmlFor="shippingState"
                    >
                      State
                    </label>
                    <Field
                      className={classNames(commonInput, "w-16")}
                      as="select"
                      name="shippingState"
                      value={values.shippingState}
                    >
                      <option value=""></option>
                      {states.map((state, index) => (
                        <option key={index} value={state.name}>
                          {state.abbr}
                        </option>
                      ))}
                    </Field>

                    <ErrorMessage name="shippingState" />
                  </div>
                  <div className="ship-font flex flex-col">
                    <label
                      className={classNames(commonLabel, "")}
                      htmlFor="shippingZip"
                    >
                      Zip Code
                    </label>
                    <Field
                      className={classNames(commonInput, "w-36")}
                      type="text"
                      name="shippingZip"
                      value={values.shippingZip}
                      onChange={handleChange}
                      onKeyPress={(e) => checkValue(e)}
                      maxLength={5}
                    />
                    <ErrorMessage name="shippingZip" />
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="ship-font flex flex-col">
                    <label
                      className={classNames(commonLabel, "")}
                      htmlFor="phone"
                    >
                      Phone
                    </label>
                    <Field
                      className={classNames(commonInput, "w-60")}
                      type="text"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      maxLength={10}
                      onKeyPress={(e) => checkValue(e)}
                    />
                    <ErrorMessage name="phone" />
                  </div>
                  <div className="ship-font flex flex-col">
                    <label
                      className={classNames(commonLabel, "")}
                      htmlFor="shippingZip"
                    >
                      Email
                    </label>
                    <Field
                      className={classNames(commonInput, "w-60")}
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    <ErrorMessage name="email" />
                  </div>
                </div>
              </div>
            )}




            <h1 className="ship-font text-2xl mb-4 border-b-2 border-black pb-4" onClick={togglePayment}>
              PAYMENT
            </h1>
            {isPaymentOpen && (
              <div>
                <div className="flex flex-col">
                  <label className={classNames(commonLabel, "")} htmlFor="cardName">Cardholder Name</label>
                  <Field
                  className={classNames(commonInput, "")}
                    type="text"
                    name="cardName"
                    value={values.cardName}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="cardName" />
                </div>
                <div className="flex flex-col">
                  <label className={classNames(commonLabel, "")} htmlFor="cardNum">Card Number</label>
                  <Field
                  className={classNames(commonInput, "")}
                    type="text"
                    name="cardNum"
                    value={values.cardNum}
                    onChange={handleChange}
                    maxLength={16}
                    onKeyPress={(e) => checkValue(e)}
                  />
                  <ErrorMessage name="cardNum" />
                </div>
                <div className="flex flex-col">
                  <label className={classNames(commonLabel, "")} htmlFor="expMonth">Exp Month</label>
                  <Field as="select" className={classNames(commonInput, "")} name="expMonth" value={values.expMonth}>
                    <option value="">--Select--</option>
                    {months.map((month, index) => (
                      <option key={index} value={month.name}>
                        {month.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="expMonth" />
                </div>
                <div className="flex flex-col">
                  <label className={classNames(commonLabel, "")} htmlFor="cardNum">Exp Year</label>
                  <Field as="select" className={classNames(commonInput, "")} name="expYear" value={values.expYear}>
                    <option value="">--Select--</option>
                    {years.map((year, index) => (
                      <option key={index} value={year.name}>
                        {year.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="expYear" />
                </div>
                <div className="flex flex-col">
                  <label className={classNames(commonLabel, "")} htmlFor="cvv">CVV</label>
                  <Field
                  className={classNames(commonInput, "")}
                    type="text"
                    name="cvv"
                    value={values.cvv}
                    maxLength={3}
                    onChange={handleChange}
                    onKeyPress={(e) => checkValue(e)}
                  />
                  <ErrorMessage name="cvv" />
                </div>
                <div className="flex flex-col">
                  <label className={classNames(commonLabel, "")} htmlFor="billingSameAsShipping">
                    <Field
                      type="checkbox"
                      name="billingSameAsShipping"
                      checked={values.billingSameAsShipping}
                      onChange={handleChange}
                    />
                    Billing Address Same as Shipping
                  </label>
                </div>
                {values.billingSameAsShipping ? null : (
                  <>
                    <div>
                      <label htmlFor="billingAddress">Billing Address</label>
                      <Field
                        type="text"
                        name="billingAddress"
                        value={values.billingAddress}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="billingCity">City</label>
                      <Field
                        type="text"
                        name="billingCity"
                        value={values.billingCity}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="billingState">State</label>
                      <Field
                        as="select"
                        name="billingState"
                        value={values.billingState}
                      >
                        <option value="">--Select--</option>
                        {states.map((state, index) => (
                          <option key={index} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <div>
                      <label htmlFor="billingZip">Zip Code</label>
                      <Field
                        type="text"
                        name="billingZip"
                        value={values.billingZip}
                        onChange={handleChange}
                        onKeyPress={(e) => checkValue(e)}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </Form>
        )}
      </Formik>
      <div>
        <h1 className="ship-font text-2xl mb-4 border-b-2 border-black pb-4" onClick={toggleReview}>REVIEW ORDER</h1>
        {isReviewOrderOpen && (
          <div>
            <p>
              By clicking the “Place Order” button, you confirm you you have
              read, understand, and accept our Terms of Sale, Privacy Policy,
              and Return Policy.
            </p>
            <button type="submit">PLACE ORDER</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
