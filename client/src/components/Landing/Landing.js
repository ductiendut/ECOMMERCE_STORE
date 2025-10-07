import './Landing.css'
// Using existing placeholder until a Gundam hero image is added
import land from '../../asset/brand/gundam.jpg'
import { Link } from "react-router-dom"
import { Button } from "@mui/material";

const Landing = () => {
    return ( 
        <div className="landing__container">
            <div className="landing__header__container">
                <div className="landing__header">
                    <h3 className="landing__header__discount">MÔ HÌNH GUNDAM & FIGURE CHÍNH HÃNG</h3>
                    <h1 className="landing__header__main">Khám phá kho đồ chơi Bandai</h1>
                    <Link to="/shop">
                        <Button variant='outlined' sx={[ {width: '190px', height: '50px', borderRadius: '20px' , fontWeight: '700', backgroundColor: 'var(--color-accent)', borderColor: 'var(--color-accent)', color: '#fff' }, {'&:hover': {  backgroundColor: 'transparent' , color: 'var(--color-accent)', borderColor: 'var(--color-accent)'}}]}>MUA NGAY</Button>
                    </Link>
                </div>
            </div>
            <div className="landing__image__container">
                <img className="landing__image" src={land} alt=""/>
            </div>
        </div>
     );
}
 
export default Landing;