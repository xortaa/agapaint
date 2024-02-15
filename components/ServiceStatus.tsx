import { Form } from "react-bootstrap";
import { useState } from "react";

function ServiceStatus(sProps) {
  // Service Status
  const [selectedOption, setSelectedOption] = useState("1");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    sProps.onChange(event.target.value);
  };

  const getColor = () => {
    switch (selectedOption) {
      case "4":
        return "text-success";
      case "3":
        return "text-info";
      case "2":
        return "text-warning";
      default:
        return "text-danger";
    }
  };

  return (
    <Form.Select
      value={selectedOption}
      onChange={handleChange}
      className={`fw-bold ${getColor()} `}
      style={{ width: sProps.width as string }}
      size="sm"
    >
      <option value="1" className="text-danger fw-bold">
        Pending
      </option>
      <option value="2" className="text-warning fw-bold">
        Ongoing
      </option>
      <option value="3" className="text-info fw-bold">
        For Release
      </option>
      <option value="4" className="text-success fw-bold">
        Complete
      </option>
    </Form.Select>
  );
}

export default ServiceStatus;
