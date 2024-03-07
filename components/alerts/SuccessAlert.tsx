import { Alert } from "react-bootstrap";

function SuccessAlert({title, action}: {title: string, action: string}) {
  return (
    <Alert variant="success" dismissible>
      <p className="mb-0">
        Hooray! <strong>{title}</strong> is {action} successfully!
      </p>
    </Alert>
  );
}

export default SuccessAlert;
