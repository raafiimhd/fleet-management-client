import "./CustomTextField.css";

const CustomTextField = ({
  title = "",
  hintText = "Enter text here",
  onChange,
  value = "",
  type = "text",
  error = "",
  name = "default",
  textRight = "",
  required = false,
  mWidth = "",
  multiline = false,
  readonly = false,
  rows = 4,
  isBelow = false,
  remarkTitle = "",
  ...props
}) => {
  const renderField = () => {
    if (type === "color") {
      return (
        <input
          type="color"
          value={value}
          onChange={onChange}
          name={name}
          readOnly={readonly}
          {...props}
        />
      );
    }

    if (multiline) {
      return (
        <textarea
          placeholder={hintText}
          value={value}
          name={name}
          onChange={onChange}
          rows={rows}
          readOnly={readonly}
          {...props}
        />
      );
    }

    return (
      <input
        type={type}
        placeholder={hintText}
        value={value}
        name={name}
        readOnly={readonly}
        onChange={onChange}
        {...props}
      />
    );
  };

  const containerClass = "title-field";

  return (
    <div className={containerClass} style={{ maxWidth: mWidth }}>
      {title && (
        <label>
          {title} {required && <span className="required">*</span>}
        </label>
      )}
      {renderField()}
      {error && <span className="error">{error}</span>}
    </div>
  );
};

export default CustomTextField;
