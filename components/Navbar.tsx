import SigninButton from '@/components/auth/SigninButton';
import LogoutButton from './auth/LogoutButton';
import CheckSessionButton from './auth/CheckSessionButton';
const Navbar = () => {
  return (
    <div style={{display: "flex"}}>
      <SigninButton />
      <LogoutButton /> 
      <CheckSessionButton />
    </div>
  )
}
export default Navbar