import "./ContactForm.css";

const ContactForm = ({ data = {}, errors = {}, onChange, onBlur }) => {
  return (
    <div className="contact-form">
      <label className="contact-form-label">
        01.姓名
        <input
          type="text"
          name="name"
          className={`contact-form-input ${errors.name ? "input-error" : ""}`}
          placeholder="姓名"
          value={data.name}
          onChange={onChange}
          onBlur={onBlur}
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </label>

      <label className="contact-form-label">
        02.電子郵件
        <input
          type="email"
          name="email"
          className={`contact-form-input ${errors.email ? "input-error" : ""}`}
          placeholder="123@gmail.com"
          value={data.email}
          onChange={onChange}
          onBlur={onBlur}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </label>

      <label className="contact-form-label">
        03.手機號碼
        <input
          type="tel"
          name="phone"
          inputMode="numeric"
          pattern="[0-9]*"
          className={`contact-form-input ${errors.phone ? "input-error" : ""}`}
          placeholder="0912345678"
          value={data.phone}
          onChange={onChange}
          onBlur={onBlur}
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}
      </label>
    </div>
  );
};

export default ContactForm;
