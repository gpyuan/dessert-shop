import "./ContactForm.css";

const ContactForm = ({
  data = {},
  errors = {},
  onChange,
  onBlur,
  disabled,
}) => {
  return (
    <div className="contact-form">
      <label className="form-label">
        01.姓名
        <input
          type="text"
          name="name"
          className={`form-input ${errors.name ? "input-error" : ""}`}
          placeholder="例:王立倫"
          value={data.name}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </label>

      <label className="form-label">
        02.電子郵件
        <input
          type="email"
          name="email"
          className={`form-input ${errors.email ? "input-error" : ""}`}
          placeholder="例:123@gmail.com"
          value={data.email}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </label>

      <label className="form-label">
        03.手機號碼
        <input
          type="tel"
          name="phone"
          inputMode="numeric"
          pattern="[0-9]*"
          className={`form-input ${errors.phone ? "input-error" : ""}`}
          placeholder="例:0912345678"
          value={data.phone}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}
      </label>
    </div>
  );
};

export default ContactForm;
