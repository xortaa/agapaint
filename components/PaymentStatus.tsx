import { Form } from "react-bootstrap";
import { useState } from "react";

function ServiceStatus(sProps) {
  // Service Status
  const [selectedOption, setSelectedOption] = useState("1");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getColor = () => {
    return selectedOption === "2" ? "text-success" : "text-danger";
  };
  return (
   <Form.Select
      value={selectedOption}
      onChange={handleChange}
      className={`fw-bold ${getColor()} `}
      style={{ width: sProps.width as string}}
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
