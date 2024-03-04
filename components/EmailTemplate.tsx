const EmailTemplate = ({ firstName }) => {
  return (
    <div>
      <div style={{ backgroundColor: "yellow", width: "100px", height: "100px" }}></div>
      <h1>firstName: {firstName}</h1>
    </div>
  );
};
export default EmailTemplate;
