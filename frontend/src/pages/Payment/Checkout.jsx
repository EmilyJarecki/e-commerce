import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import PaymentForm from "../../components/PaymentForm"

const PUBLIC_KEY = "pk_test_51MUwy7BILcMIJazePMKJbzaLVS4dOEPRjfc7gVjWlQkMwlpHy8bHI9rCTfpa0S4U0PfoFGEXtgGmCpxjbCpPrWsV00AXa11iIl"

// loadStripe returns a Promise that resolves with a newly created Stripe object
const stripePromise = loadStripe(PUBLIC_KEY)

export default function Checkout() {
	return (
        <div>
		{/* The Elements provider allows you to use Element components and access the Stripe object in any nested component. */}
		{/* Element components include: */}
		{/* LinkAuthenticationElement */}
		{/* PaymentElement */}
		{/* TODO: work on splitting this up */}
		{/* CardNumberElement */}
		{/* CardExpiryElement */}
		{/* CardCvcElement  */}
		{/* CardElement: A flexible single-line input that collects all necessary card details. */}
		<h1>The Checkout Form</h1>
        <Elements stripe={stripePromise} >
			{/* our form that we are passing in */}
			<PaymentForm />
		</Elements>
        </div>
	)
}