import { Alert } from "react-bootstrap";

function ErrorAlert(props) {
  return (
    <Alert variant="danger" dismissible>
      <p className="mb-0">
        Oops! Something went wrong in <strong>{props.title}</strong>, Please try again!
      </p>
    </Alert>
  );
}

export default ErrorAlert;
