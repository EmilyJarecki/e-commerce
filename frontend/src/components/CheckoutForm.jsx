import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CheckoutForm = () => {
  const [email, setEmail] = useState("");
  const [isShippingOpen, setIsShippingOpen] = useState(false);

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const toggleShipping = () => {
    setIsShippingOpen(!isShippingOpen);
  };

  const togglePayment = () => {
    setIsPaymentOpen(!isPaymentOpen);
  };

  const checkValue = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (/\D/.test(String.fromCharCode(charCode))) {
      e.preventDefault();
    }
  };

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
    // <>
    //   <Formik
    //     initialValues={{
    //       firstName: "",
    //       lastName: "",
    //       streetAddress: "",
    //       city: "",
    //       state: "",
    //       zip: "",
    //       phone: "",
    //       email: "",
    //     }}
    //     validationSchema={Yup.object({
    //       firstName: Yup.string()
    //         .max(15, "Must be 15 characters or less")
    //         .required("Required"),
    //       lastName: Yup.string()
    //         .max(20, "Must be 20 characters or less")
    //         .required("Required"),
    //       streetAddress: Yup.string().required("Required street Address"),
    //       city: Yup.string().required("City Required"),
    //       state: Yup.string().required("State Required"),
    //       zip: Yup.string()
    //         .required("Zip Code Required")
    //         .min(5, "Zip must be 5 digits"),
    //       phone: Yup.string()
    //         .required("Phone Required")
    //         .min(10, "Zip must be 10 digits"),
    //       email: Yup.string()
    //         .email("Invalid email address")
    //         .required("Required"),
    //     })}
    //     onSubmit={(values, { setSubmitting }) => {
    //       setTimeout(() => {
    //         setEmail(values.email); // update email state with the entered email address
    //         localStorage.setItem("formValues", JSON.stringify(values)); // store form values in local storage
    //         console.log(values);
    //         setSubmitting(false);
    //         // setIsPaymentOpen(true);
    //         //   localStorage.setItem('cart', [""])
    //       }, 400);
    //     }}
    //   >
    //     <Form>
    //       <div className="flex flex-col border-solid border-2 border-green-600 ">
    //         <h1
    //           className="text-4xl font-bold underline yellow"
    //           // onClick={toggleShipping}
    //         >
    //           Shipping
    //         </h1>
    //         <>
    //           <label htmlFor="firstName">First Name</label>
    //           <Field
    //             className="h-9 border-solid border-2 border-sky-500 w-64"
    //             name="firstName"
    //             type="text"
    //           />
    //           <ErrorMessage name="firstName" />

    //           <label htmlFor="lastName">Last Name</label>
    //           <Field
    //             className="h-9 border-solid border-2 border-sky-500 w-64"
    //             name="lastName"
    //             type="text"
    //           />
    //           <ErrorMessage name="lastName" />

    //           <label htmlFor="streetAddress">Street Address</label>
    //           <Field
    //             className="h-9 border-solid border-2 border-sky-500 w-64"
    //             name="streetAddress"
    //             type="text"
    //           />
    //           <ErrorMessage name="streetAddress" />

    //           <label htmlFor="city">City</label>
    //           <Field
    //             className="h-9 border-solid border-2 border-sky-500 w-64"
    //             name="city"
    //             type="text"
    //           />
    //           <ErrorMessage name="city" />

    //           {/* State */}
    //           <label htmlFor="state">Select a state:</label>
    //           <Field as="select" name="state" id="state">
    //             <option value="">--Select--</option>
    //             {states.map((state, index) => (
    //               <option key={index} value={state.abbr}>
    //                 {state.name}
    //               </option>
    //             ))}
    //           </Field>

    //           <label htmlFor="zip">ZIP Code</label>
    //           <Field
    //             className="h-9 border-solid border-2 border-sky-500 w-64"
    //             name="zip"
    //             type="text"
    //             maxLength={5}
    //             onKeyPress={(e) => checkValue(e)}
    //           />
    //           <ErrorMessage className="text-sky-400" name="zip" />

    //           <label htmlFor="phone">Mobile Number</label>
    //           <Field
    //             className="h-9 border-solid border-2 border-sky-500 w-64"
    //             name="phone"
    //             type="text"
    //             maxLength={10}
    //             onKeyPress={(e) => checkValue(e)}
    //           />
    //           <ErrorMessage name="phone" />

    //           <label htmlFor="email">Email Address</label>
    //           <Field
    //             className="h-9 border-solid border-2 border-sky-500 w-64"
    //             name="email"
    //             type="email"
    //           />
    //           <ErrorMessage name="email" />
    //         </>
    //         {/* )} */}
    //       </div>
    //       <button type="submit">Continue to Payment</button>
    //     </Form>
    //   </Formik>
    //   <Formik
    //     initialValues={{
    //       cardName: "",
    //       cardNum: "",
    //       expMonth: "",
    //       expYear: "",
    //       cvv: "",
    //     }}
    //     validationSchema={Yup.object({
    //       cardName: Yup.string().required("Required"),
    //       cardNum: Yup.string()
    //         .min(16, "Must be 16 characters")
    //         .required("Required"),
    //       expMonth: Yup.string().required("Required"),
    //       expYear: Yup.string()
    //         .max(15, "Must be 15 characters or less")
    //         .required("Required"),
    //       cvv: Yup.string().min(3, "Zip must be 3 digits").required("Required"),
    //     })}
    //     onSubmit={(values, { setSubmitting }) => {
    //       setTimeout(() => {
    //         // alert(JSON.stringify(values, null, 2));
    //         localStorage.setItem("paymentValues", JSON.stringify(values)); // store form values in local storage
    //         console.log(values);
    //         setSubmitting(false);
    //         //   localStorage.setItem('cart', [""])
    //       }, 400);
    //     }}
    //   >
    //     <Form>
    //       <div className="flex flex-col border-solid border-2 border-sky-500 w-64">
    //         <h1 onClick={togglePayment}>Payment</h1>
    //         {isPaymentOpen && (
    //           <>
    //             <label htmlFor="cardName">Cardholder's Name</label>
    //             <Field
    //               className="h-9 border-solid border-2 border-sky-500 w-64"
    //               name="cardName"
    //               type="text"
    //             />
    //             <ErrorMessage name="cardName" />

    //             <label htmlFor="cardNum">Card Number</label>
    //             <Field
    //               name="cardNum"
    //               className="h-9 border-solid border-2 border-sky-500 w-64"
    //               type="text"
    //               maxLength={16}
    //               onKeyPress={(e) => checkValue(e)}
    //             />
    //             <ErrorMessage name="cardNum" />

    //             <label htmlFor="expMonth">Exp. Month</label>
    //             <Field as="select" name="expMonth" id="expMonth">
    //               <option value="">--Select--</option>
    //               {months.map((month, index) => (
    //                 <option key={index} value={month.int}>
    //                   {month.name}
    //                 </option>
    //               ))}
    //             </Field>

    //             <label htmlFor="state">Exp. Year</label>
    //             <Field as="select" name="expYear" id="expYear">
    //               <option value="">--Select--</option>
    //               {years.map((year, index) => (
    //                 <option key={index} value={year.name}>
    //                   {year.name}
    //                 </option>
    //               ))}
    //             </Field>
    //             <label htmlFor="cvv">CVV</label>
    //             <Field
    //               className="h-9 border-solid border-2 border-sky-500 w-64"
    //               name="cvv"
    //               type="text"
    //               maxLength={3}
    //               onKeyPress={(e) => checkValue(e)}
    //             />
    //             <ErrorMessage name="cvv" />
    //           </>
    //         )}
    //       </div>

    //       <button type="submit">Submit</button>
    //     </Form>
    //   </Formik>
    //   <div>
    //     <h1>REVIEW ORDER</h1>
    //     <p>
    //       By clicking the “Place Order” button, you confirm you you have read,
    //       understand, and accept our Terms of Sale, Privacy Policy, and Return
    //       Policy.
    //     </p>
    //   </div>
    //   <div>_______________________________________*************************________________________________</div>
    //   <div>
    //     <h1>Shipping Information</h1>
    //     <Formik
    //       initialValues={{
    //         shippingAddress: "",
    //         shippingCity: "",
    //         shippingState: "",
    //         shippingZip: "",
    //         billingSameAsShipping: true, // added a new field for the checkbox
    //         billingAddress: "",
    //         billingCity: "",
    //         billingState: "",
    //         billingZip: "",
    //       }}
    //       onSubmit={(values, { setSubmitting }) => {
    //         setTimeout(() => {
    //           if (values.billingSameAsShipping) {
    //             // set the billing fields to the corresponding shipping fields
    //             values.billingAddress = values.shippingAddress;
    //             values.billingCity = values.shippingCity;
    //             values.billingState = values.shippingState;
    //             values.billingZip = values.shippingZip;
    //           }
    //           const data = JSON.stringify(values);
    //           localStorage.setItem('shippingData', data);
    //           setSubmitting(false);
    //         }, 400);
    //       }}
    //     >
    //       {({ values, handleChange }) => (
    //         <Form>
    //           <div>
    //             <label htmlFor="shippingAddress">Shipping Address</label>
    //             <Field
    //               type="text"
    //               name="shippingAddress"
    //               value={values.shippingAddress}
    //               onChange={handleChange}
    //             />
    //           </div>
    //           <div>
    //             <label htmlFor="shippingCity">City</label>
    //             <Field
    //               type="text"
    //               name="shippingCity"
    //               value={values.shippingCity}
    //               onChange={handleChange}
    //             />
    //           </div>
    //           <div>
    //             <label htmlFor="shippingState">State</label>
    //             <Field
    //               type="text"
    //               name="shippingState"
    //               value={values.shippingState}
    //               onChange={handleChange}
    //             />
    //           </div>
    //           <div>
    //             <label htmlFor="shippingZip">Zip Code</label>
    //             <Field
    //               type="text"
    //               name="shippingZip"
    //               value={values.shippingZip}
    //               onChange={handleChange}
    //             />
    //           </div>
    //           <div>
    //             <label htmlFor="billingSameAsShipping">
    //               <Field
    //                 type="checkbox"
    //                 name="billingSameAsShipping"
    //                 checked={values.billingSameAsShipping}
    //                 onChange={handleChange}
    //               />
    //               Billing Address Same as Shipping
    //             </label>
    //           </div>
    //           {values.billingSameAsShipping ? null : (
    //             <>
    //               <div>
    //                 <label htmlFor="billingAddress">Billing Address</label>
    //                 <Field
    //                   type="text"
    //                   name="billingAddress"
    //                   value={values.billingAddress}
    //                   onChange={handleChange}
    //                 />
    //               </div>
    //               <div>
    //                 <label htmlFor="billingCity">City</label>
    //                 <Field
    //                   type="text"
    //                   name="billingCity"
    //                   value={values.billingCity}
    //                   onChange={handleChange}
    //                 />
    //               </div>
    //               <div>
    //                 <label htmlFor="billingState">State</label>
    //                 <Field
    //                   type="text"
    //                   name="billingState"
    //                   value={values.billingState}
    //                   onChange={handleChange}
    //                 />
    //               </div>
    //               <div>
    //                 <label htmlFor="billingZip">Zip Code</label>
    //                 <Field
    //                   type="text"
    //                   name="billingZip"
    //                   value={values.billingZip}
    //                   onChange={handleChange}
    //                 />
    //               </div>
    //             </>
    //           )}
    //           <button type="submit">Submit</button>
    //         </Form>
    //       )}
    //     </Formik>
    //   </div>
    // </>
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
        email: Yup.string().email("Invalid email address").required("Required"),
        billingAddress: Yup.string().required("Required street Address"),
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
          console.log(values.shippingState)
          console.log(values.billingState)

          const data = JSON.stringify(values);
          localStorage.setItem("formData", data);
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ values, handleChange }) => (
        <Form>
          <div>
            <label htmlFor="firstName">First Name</label>
            <Field
              type="text"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
            />
            <ErrorMessage name="firstName" />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <Field
              type="text"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
            />
            <ErrorMessage name="lastName" />
          </div>
          <div>
            <label htmlFor="shippingAddress">Shipping Address</label>
            <Field
              type="text"
              name="shippingAddress"
              value={values.shippingAddress}
              onChange={handleChange}
            />
            <ErrorMessage name="shippingAddress" />
          </div>
          <div>
            <label htmlFor="shippingCity">City</label>
            <Field
              type="text"
              name="shippingCity"
              value={values.shippingCity}
              onChange={handleChange}
            />
            <ErrorMessage name="shippingCity" />
          </div>
          <div>
            <label htmlFor="shippingState">State</label>
            <Field as="select" name="shippingState" value={values.shippingState}>
               <option value="">--Select--</option>
                 {states.map((state, index) => (
                  <option key={index} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </Field>
            {/* <Field
              type="text"
              name="shippingState"
              value={values.shippingState}
              onChange={handleChange}
            /> */}
            <ErrorMessage name="shippingState" />
          </div>
          <div>
            <label htmlFor="shippingZip">Zip Code</label>
            <Field
              type="text"
              name="shippingZip"
              value={values.shippingZip}
              onChange={handleChange}
              onKeyPress={(e) => checkValue(e)}
            />
            <ErrorMessage name="shippingZip" />
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <Field
              type="text"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onKeyPress={(e) => checkValue(e)}
            />
            <ErrorMessage name="phone" />
          </div>
          <div>
            <label htmlFor="shippingZip">Email</label>
            <Field
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <ErrorMessage name="email" />
          </div>
          <div>
            <label htmlFor="billingSameAsShipping">
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
                {/* <ErrorMessage name="billingAddress" /> */}
              </div>
              <div>
                <label htmlFor="billingCity">City</label>
                <Field
                  type="text"
                  name="billingCity"
                  value={values.billingCity}
                  onChange={handleChange}
                />
                {/* <ErrorMessage name="billingCity" /> */}
              </div>
              <div>
                <label htmlFor="billingState">State</label>
                <Field as="select" name="billingState" value={values.billingState}>
               <option value="">--Select--</option>
                 {states.map((state, index) => (
                  <option key={index}  value={state.name}>
                    {state.name}
                  </option>
                ))}
              </Field>
                {/* <Field
                  type="text"
                  name="billingState"
                  value={values.billingState}
                  onChange={handleChange}
                /> */}
                {/* <ErrorMessage name="billingState" /> */}
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
                {/* <ErrorMessage name="billingZip" /> */}
              </div>
            </>
          )}
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default CheckoutForm;
