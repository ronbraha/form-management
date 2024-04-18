import Path from "routes/paths.js";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <ul className="navbar">
        {Object.entries(Path).map(([key, path]) => (
          <li className="nav-item" key={key}>
            <NavLink className="link" to={path}>
              {key.replaceAll("-", " ")}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
