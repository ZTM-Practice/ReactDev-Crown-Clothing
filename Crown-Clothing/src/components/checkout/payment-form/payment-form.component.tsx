import { useState, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCartPrice } from "../../../store/cart/cart.selector";
import { selectCurrentUser } from "../../../store/user/user.selector";
import { clearCart } from "../../../store/cart/cart.action";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import Button, { BUTTON_TYPE_CLASSES } from "../../ui/button/button.component";
import styles from "./style.module.scss";

const ifValidCardElement = (card: StripeCardElement | null): card is StripeCardElement => card !== null;

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const amount = useSelector(selectCartPrice);
    const user = useSelector(selectCurrentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create_payment_intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ amount: amount * 100 }),
        }).then(res => res.json());

        const { paymentIntent: { client_secret } } = response;

        const cardDetails = elements.getElement(CardElement);

        if(!ifValidCardElement(cardDetails)) return;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardDetails,
                billing_details: {
                    name: user ? user.displayName : 'Guest',
                }
            }
        });

        setIsProcessingPayment(false);

        if(paymentResult.error){
            alert(paymentResult.error);
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded'){
                alert('Payment Successful');
                dispatch(clearCart());
                navigate('/');
            }
        }
    }

    return (
        <div className={styles.paymentFormContainer}>
            <form className={styles.formContainer} onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                <Button 
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                    isLoading={isProcessingPayment}
                >
                    Pay Now
                </Button>
            </form>
        </div>
    )
};

export default PaymentForm;
