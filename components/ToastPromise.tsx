import { Bounce, ToastContainer } from "react-toastify";

function ToastPromise() {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      limit={5}
      hideProgressBar={false}
      newestOnTop
      rtl={false}
      // pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      transition={Bounce}
      stacked
    />
  );
}

export default ToastPromise;
