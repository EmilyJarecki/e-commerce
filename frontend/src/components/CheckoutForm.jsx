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

  const contToPay = () => {
    setIsShippingOpen(!isShippingOpen);
    setIsPaymentOpen(!isPaymentOpen);
    console.log("cont");
  };

  const contToReview = () =>{
    setIsPaymentOpen(!isPaymentOpen)
    setIsReviewOrderOpen(!isReviewOrderOpen)
  }

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
    "rounded ship-font shadow-inner shadow-grey-50 h-[30px] px-2 text-black";
  const commonLabel = "ship-font text-sm mt-2";

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
    { name: "Jan", int: 1 },
    { name: "Feb", int: 2 },
    { name: "Mar", int: 3 },
    { name: "Apr", int: 4 },
    { name: "May", int: 5 },
    { name: "June", int: 6 },
    { name: "July", int: 7 },
    { name: "Aug", int: 8 },
    { name: "Sept", int: 9 },
    { name: "Oct", int: 10 },
    { name: "Nov", int: 11 },
    { name: "Dec", int: 12 },
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
    <div className="flex-col w-[500px] mr-16 mx:w-1/2 lg:w-2/3 lg:mr-0  md:w-full md:px-4">
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
          billingFirstName: "",
          billingLastName: "",
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
          shippingAddress: Yup.string().required("Required"),
          shippingCity: Yup.string().required("Required"),
          shippingState: Yup.string().required("Required"),
          shippingZip: Yup.string()
            .required("Required")
            .min(5, "Zip must be 5 digits"),
          phone: Yup.string()
            .required("Required")
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
          cvv: Yup.string().min(3, "Must be 3 digits").required("Required"),
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
            //takes you to new page
            window.location.href = "/success";
            const data = JSON.stringify(values);
            localStorage.setItem("formData", data);
            localStorage.removeItem('cart');
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <h1
              className="ship-font text-2xl mb-4 border-b-2 border-black pb-4"
              onClick={toggleShipping}
            >
              SHIPPING
            </h1>
            {isShippingOpen && (
              <div>
                <div className="flex justify-between sm:flex-col">
                  {/* first name */}
                  <div
                    className={classNames(
                      commonLabel,
                      "flex flex-col text-red-500"
                    )}
                  >
                    <label
                      className={classNames(commonLabel, "text-black")}
                      htmlFor="firstName"
                    >
                      First Name
                    </label>
                    <Field
                      className={classNames(commonInput, "w-60 sm:w-full")}
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                    <ErrorMessage
                      className={classNames(commonLabel, "")}
                      name="firstName"
                    />
                  </div>
                  {/* last name */}
                  <div
                    className={classNames(
                      commonLabel,
                      "flex flex-col  text-red-500"
                    )}
                  >
                    <label
                      className={classNames(commonLabel, "text-black")}
                      htmlFor="lastName"
                    >
                      Last Name
                    </label>
                    <Field
                      className={classNames(commonInput, "w-60 sm:w-full")}
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                    <ErrorMessage name="lastName" />
                  </div>
                </div>
                  {/* shipping address */}
                <div
                  className={classNames(
                    commonLabel,
                    "flex flex-col  text-red-500"
                  )}
                >
                  <label
                    className={classNames(commonLabel, "text-black")}
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
                {/* city, state, zipcode */}
                <div className="flex justify-between sm:flex-wrap">
                  <div
                    className={classNames(
                      commonLabel,
                      "flex flex-col  text-red-500"
                    )}
                  >
                    <label
                      className={classNames(commonLabel, "text-black")}
                      htmlFor="shippingCity"
                    >
                      City
                    </label>
                    <Field
                      className={classNames(commonInput, "w-60 sm:w-full")}
                      type="text"
                      name="shippingCity"
                      value={values.shippingCity}
                      onChange={handleChange}
                    />
                    <ErrorMessage name="shippingCity" />
                  </div>

                  <div
                    className={classNames(
                      commonLabel,
                      "flex flex-col  text-red-500"
                    )}
                  >
                    <label
                      className={classNames(commonLabel, "text-black")}
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
                  <div
                    className={classNames(
                      commonLabel,
                      "flex flex-col  text-red-500"
                    )}
                  >
                    <label
                      className={classNames(commonLabel, "text-black")}
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
                {/* phone & email*/}
                <div className="flex justify-between sm:flex-col">
                  <div
                    className={classNames(
                      commonLabel,
                      "flex flex-col  text-red-500"
                    )}
                  >
                    <label
                      className={classNames(commonLabel, "text-black")}
                      htmlFor="phone"
                    >
                      Phone
                    </label>
                    <Field
                      className={classNames(commonInput, "w-60 sm:w-full")}
                      type="text"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      maxLength={10}
                      onKeyPress={(e) => checkValue(e)}
                    />
                    <ErrorMessage name="phone" />
                  </div>
                  <div
                    className={classNames(
                      commonLabel,
                      "flex flex-col  text-red-500"
                    )}
                  >
                    <label
                      className={classNames(commonLabel, "text-black")}
                      htmlFor="shippingZip"
                    >
                      Email
                    </label>
                    <Field
                      className={classNames(commonInput, "w-60 sm:w-full")}
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                    <ErrorMessage name="email" />
                  </div>
                </div>

                <button 
                type="submit" 
                className="ship-font text-base font-medium button-class px-6 py-2 rounded-lg mt-6"
                onClick={contToPay}
                >
                  CONTINUE TO PAYMENT
                  </button>
              </div>
            )}







            <h1
              className="ship-font text-2xl mb-4 border-b-2 border-black py-4"
              onClick={togglePayment}
            >
              PAYMENT
            </h1>
            {isPaymentOpen && (
              <div>
                <div
                  className={classNames(
                    commonLabel,
                    "flex flex-col  text-red-500"
                  )}
                >
                  <label
                    className={classNames(commonLabel, "text-black")}
                    htmlFor="cardName"
                  >
                    Cardholder Name
                  </label>
                  <Field
                    className={classNames(commonInput, "")}
                    type="text"
                    name="cardName"
                    value={values.cardName}
                    onChange={handleChange}
                  />
                  <ErrorMessage name="cardName" />
                </div>

                <div className="flex justify-between sm:flex-wrap">
                  <div
                    className={classNames(
                      commonLabel,
                      "flex flex-col  text-red-500"
                    )}
                  >
                    <label
                      className={classNames(commonLabel, "text-black")}
                      htmlFor="cardNum"
                    >
                      Card Number
                    </label>
                    <Field
                      className={classNames(commonInput, "sm:w-full")}
                      type="text"
                      name="cardNum"
                      value={values.cardNum}
                      onChange={handleChange}
                      maxLength={16}
                      onKeyPress={(e) => checkValue(e)}
                    />
                    <ErrorMessage name="cardNum" />
                  </div>
                  <div
                    className={classNames(
                      commonLabel,
                      "flex flex-col  text-red-500"
                    )}
                  >
                    <label
                      className={classNames(commonLabel, "text-black")}
                      htmlFor="expMonth"
                    >
                      Exp Month
                    </label>
                    <Field
                      as="select"
                      className={classNames(commonInput, "w-24")}
                      name="expMonth"
                      value={values.expMonth}
                    >
                      <option value=""></option>
                      {months.map((month, index) => (
                        <option key={index} value={month.name}>
                          {month.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="expMonth" />
                  </div>
                  <div
                    className={classNames(
                      commonLabel,
                      "flex flex-col  text-red-500"
                    )}
                  >
                    <label
                      className={classNames(commonLabel, "text-black")}
                      htmlFor="cardNum"
                    >
                      Exp Year
                    </label>
                    <Field
                      as="select"
                      className={classNames(commonInput, "w-24")}
                      name="expYear"
                      value={values.expYear}
                    >
                      <option value=""></option>
                      {years.map((year, index) => (
                        <option key={index} value={year.name}>
                          {year.name}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name="expYear" />
                  </div>
                  <div
                    className={classNames(
                      commonLabel,
                      "flex flex-col  text-red-500"
                    )}
                  >
                    <label
                      className={classNames(commonLabel, "text-black")}
                      htmlFor="cvv"
                    >
                      CVV
                    </label>
                    <Field
                      className={classNames(commonInput, "w-24")}
                      type="text"
                      name="cvv"
                      value={values.cvv}
                      maxLength={3}
                      onChange={handleChange}
                      onKeyPress={(e) => checkValue(e)}
                    />
                    <ErrorMessage name="cvv" />
                  </div>
                </div>

                <div className={classNames(commonLabel, "flex flex-col ")}>
                  <label
                    className={classNames(commonLabel, "")}
                    htmlFor="billingSameAsShipping"
                  >
                    <Field
                      type="checkbox"
                      name="billingSameAsShipping"
                      checked={values.billingSameAsShipping}
                      onChange={(e) =>
                        handleChange({
                          target: {
                            name: e.target.name,
                            value: e.target.checked,
                          },
                        })
                      }
                    />
                    Billing address same as shipping
                  </label>
                </div>
                <button 
                type="button" 
                className="ship-font text-base font-medium button-class px-6 py-2 rounded-lg mt-6"
                onClick={contToReview}
                >
                  CONTINUE TO REVIEW
                  </button>

                {values.billingSameAsShipping ? null : (
                  <>
                    <div className="flex justify-between">
                      <div
                        className={classNames(
                          commonLabel,
                          "flex flex-col text-red-500"
                        )}
                      >
                        <label
                          className={classNames(commonLabel, "text-black")}
                          htmlFor="billingFirstName"
                        >
                          First Name
                        </label>
                        <Field
                          className={classNames(commonInput, "w-60")}
                          type="text"
                          name="billingFirstName"
                          value={values.billingFirstName}
                          onChange={handleChange}
                        />
                        {/* <ErrorMessage
                          className={classNames(commonLabel, "")}
                          name="billingFirstName"
                        /> */}
                      </div>
                      <div
                        className={classNames(
                          commonLabel,
                          "flex flex-col  text-red-500"
                        )}
                      >
                        <label
                          className={classNames(commonLabel, "text-black")}
                          htmlFor="billingLastName"
                        >
                          Last Name
                        </label>
                        <Field
                          className={classNames(commonInput, "w-60")}
                          type="text"
                          name="billingLastName"
                          value={values.billingLastName}
                          onChange={handleChange}
                        />
                        {/* <ErrorMessage name="billingLastName" /> */}
                      </div>
                    </div>
                    <div
                      className={classNames(
                        commonLabel,
                        "flex flex-col  text-red-500"
                      )}
                    >
                      <label
                        className={classNames(commonLabel, "text-black")}
                        htmlFor="billingAddress"
                      >
                        Billing Address
                      </label>
                      <Field
                        className={classNames(commonInput, "")}
                        type="text"
                        name="billingAddress"
                        value={values.billingAddress}
                        onChange={handleChange}
                      />
                    </div>

                    <div
                      className={classNames(
                        commonLabel,
                        "flex flex-col  text-red-500"
                      )}
                    >
                      <label
                        className={classNames(commonLabel, "text-black")}
                        htmlFor="billingCity"
                      >
                        City
                      </label>
                      <Field
                        className={classNames(commonInput, "")}
                        type="text"
                        name="billingCity"
                        value={values.billingCity}
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      className={classNames(
                        commonLabel,
                        "flex flex-col  text-red-500"
                      )}
                    >
                      <label
                        className={classNames(commonLabel, "text-black")}
                        htmlFor="billingState"
                      >
                        State
                      </label>
                      <Field
                        className={classNames(commonInput, "")}
                        as="select"
                        name="billingState"
                        value={values.billingState}
                      >
                        <option value=""></option>
                        {states.map((state, index) => (
                          <option key={index} value={state.name}>
                            {state.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <div
                      className={classNames(
                        commonLabel,
                        "flex flex-col  text-red-500"
                      )}
                    >
                      <label
                        className={classNames(commonLabel, "text-black")}
                        htmlFor="billingZip"
                      >
                        Zip Code
                      </label>
                      <Field
                        className={classNames(commonInput, "")}
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
            <div>
              <h1
                className="ship-font text-2xl mb-4 border-b-2 border-black py-4"
                onClick={toggleReview}
              >
                REVIEW ORDER
              </h1>
              {isReviewOrderOpen && (
                <div>
                  <p className="ship-font text-base mb-4">
                    By clicking the “Place Order” button, you confirm you you
                    have read, understand, and accept our <span className="purple-link-color underline">Terms of Sale</span>, <span className="purple-link-color underline">Privacy
                    Policy</span>, and <span className="purple-link-color underline">Return Policy</span>.
                  </p>
                  <button
                    className="ship-font text-base font-medium button-class px-6 py-2 rounded-lg"
                    type="submit"
                  >
                    PLACE ORDER
                  </button>
                </div>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CheckoutForm;
