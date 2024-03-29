import { Form } from "react-bootstrap";
import { useState } from "react";

function ServiceStatus({
  width,
  option,
}: {
  width: string;
  option: string;
}) {
  // Service Status
  const [selectedOption, setSelectedOption] = useState(option);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const getColor = () => {
    switch (selectedOption) {
      case "Complete":
        return "text-success";
      case "For Release":
        return "text-info";
      case "Ongoing":
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
      style={{ width: width as string }}
      size="sm"
    >
      <option value="Pending" className="text-danger fw-bold">
        Pending
      </option>
      <option value="Ongoing" className="text-warning fw-bold">
        Ongoing
      </option>
      <option value="For Release" className="text-info fw-bold">
        For Release
      </option>
      <option value="Complete" className="text-success fw-bold">
        Complete
      </option>
    </Form.Select>
  );
}

export default ServiceStatus;
