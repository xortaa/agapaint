import { Form } from "react-bootstrap";
import { useState, useEffect } from "react";

function ServiceStatus(sProps) {
  // Service Status
  const [selectedOption, setSelectedOption] = useState("1");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const [maxOptionLength, setMaxOptionLength] = useState(0);

  useEffect(() => {
    const options = ["Awaiting", "Paid"];
    const maxLength = Math.max(...options.map((option) => option.length));
    setMaxOptionLength(maxLength);
  }, []);

  const getColor = () => {
    return selectedOption === "2" ? "text-success" : "text-danger";
  };
  return (
    <Form.Select
      value={selectedOption}
      onChange={handleChange}
      className={`fw-bold ${getColor()} `}
      style={{ width: `${maxOptionLength}em` }}
      size="sm"
    >
      <option value="1" className="text-danger fw-bold">
        Awaiting
      </option>
      <option value="2" className="text-success fw-bold">
        Paid
      </option>
    </Form.Select>
  );
}

export default ServiceStatus;
