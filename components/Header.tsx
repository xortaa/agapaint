// Header.tsx
import { Image } from "react-bootstrap";
import headerStyles from "@/styles/header.module.scss";

function Header(hprops) {
   return (
      <header className={headerStyles.head}>
         <Image src={hprops.img} alt="" />
         <div className={headerStyles.textOverlay}>
         <h1 className={`fw-bold display-4 ${hprops.color}`}>{hprops.text}</h1>
         </div>
      </header>
   );
}

export default Header;