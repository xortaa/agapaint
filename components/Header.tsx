// Header.tsx
import { Image } from "react-bootstrap";
import headerStyles from "@/styles/header.module.scss";

function Header({ imgSrc, headerText, textColor}) {
   return (
      <header className={headerStyles.head}>
         <Image src={imgSrc} alt="" />
         <div className={headerStyles.textOverlay}>
         <h1 className={`fw-bold display-4 ${textColor}`}>{headerText}</h1>
         </div>
      </header>
   );
}

export default Header;