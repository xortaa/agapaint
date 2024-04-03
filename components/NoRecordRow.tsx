import { Image } from "react-bootstrap";
import logo from "@/public/assets/logo/logoDark.png";

function NoRecordRow({ colSpan, message}) {
  return (
    <td colSpan={colSpan} className="text-center p-3 pb-0">
      <Image src={logo.src} fluid width={30} className="p-0" style={{ opacity: 0.2 }} />
      <p className="fs-5 text-secondary pt-0 pb-0 mb-0">No Record Found</p>
      <p className="text-secondary pt-0 pb-0 mb-0 small">{message}</p>
    </td>
  );
}

export default NoRecordRow;
