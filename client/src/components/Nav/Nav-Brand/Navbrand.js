import './NavBrand.css'
import { Link } from 'react-router-dom';

const NavBrand = () => {
    return (
        <div className="navbrand__container">
            <h1 className="navbrand" aria-label="Bandai Store">
                <Link to="/">
                    <span className="brand-main">BANDAI</span>
                    <span className="brand-sub">STORE</span>
                </Link>
            </h1>
        </div>
    );
};
 
export default NavBrand;