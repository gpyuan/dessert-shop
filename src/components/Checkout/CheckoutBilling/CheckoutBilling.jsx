import "./CheckoutBilling.css";
import ContactForm from "../../Checkout/ContactForm";

const CheckoutBilling = ({ billingData, onChange, errors, onBlur }) => {
  return (
    <section className="checkout-billing">
      <ContactForm
        data={billingData}
        errors={errors}
        onChange={onChange}
        onBlur={onBlur}
      />
    </section>
  );
};

export default CheckoutBilling;
