import MenuSVG from '../assets/hamburger.svg'
import LoginSVG from '../assets/login.svg'

export const Navbar = () => {
  return (
    <nav className="navbar">
        <img src={MenuSVG}/>
        <img src={LoginSVG}/>
    </nav>
  )
}
