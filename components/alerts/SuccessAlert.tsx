import { Alert } from "react-bootstrap";

function SuccessAlert(props) {
  return (
    <Alert variant="success" dismissible>
      <p className="mb-0">
        Hooray! <strong>{props.title}</strong> is {props.action} successfully!
      </p>
    </Alert>
  );
}

export default SuccessAlert;
