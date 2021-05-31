import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripePaymentButton = ({price}) => {
    console.log(price)
    const publishableKey = 'pk_test_51IwxQPFWUiJ0dHJqZoOfPKFMEpkDY8W2FkACHV8qoK0OzuZuE6aXxoU3TTp7geAXK9bUHKgWtj416ZKmwmMgi5y200VBlJDpoM'
    const stripePrice = price*100

    const onToken = token => {
        console.log(token)
        alert(token)
    }

    return (
        <StripeCheckout
            token={onToken}
            stripeKey={publishableKey}
            label='Pay With Stripe'
            name='Clothing Ecommerce'
            shippingAddress
            billingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is $${price}`}
            amount={stripePrice}
        />
    )
}

export default StripePaymentButton