import React from "react";
import { Placeholder } from "react-bootstrap";

function PlaceholderRow(props) {
  return Array.from({ length: 3 }).map((_, trIndex) => (
    <tr key={trIndex}>
      {Array.from({ length: props.col }).map((_, tdIndex) => (
        <td key={tdIndex}>
          <Placeholder animation="glow">
            <Placeholder xs={6} size="lg" />
          </Placeholder>
        </td>
      ))}
    </tr>
  ));
}

export default PlaceholderRow;
