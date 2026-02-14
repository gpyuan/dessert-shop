import "./CheckoutBilling.css";
import ContactForm from "../../Checkout/ContactForm";
import { useCheckout } from "../../../context/CheckoutContext";

const CheckoutBilling = () => {
  const { billingData, handleBillingChange, handleBillingBlur, billingErrors } =
    useCheckout();

  return (
    <section className="checkout-billing">
      <ContactForm
        data={billingData}
        errors={billingErrors}
        onChange={handleBillingChange}
        onBlur={handleBillingBlur}
      />
    </section>
  );
};

export default CheckoutBilling;
