import './Footer.css';

const year = new Date().getFullYear();

// Footer đơn giản mới (đã xoá toàn bộ code cũ theo yêu cầu)
const Footer = () => {
    return (
        <footer className="ft">
            <div className="ft__inner">
                <div className="ft__brand">
                    <h2 className="ft__logo">BANDAI <span>STORE</span></h2>
                    <p className="ft__tag">Kho mô hình & figure chính hãng.</p>
                </div>
                <nav className="ft__links">
                    <a href="/shop">Shop</a>
                    <a href="/shop?cat=gunpla">Gunpla</a>
                    <a href="/shop?cat=figure">Figures</a>
                    <a href="/shop?cat=modelkit">Model Kits</a>
                    <a href="/shop?cat=accessory">Phụ kiện</a>
                </nav>
                <div className="ft__contact">
                    <p>Email: <a href="mailto:ductiendut@gmail.com">ductiendut@gmail.com</a></p>
                    <p>Địa chỉ: Liên Chiểu, Đà Nẵng</p>
                </div>
            </div>
            <div className="ft__bottom">© {year} BANDAI STORE</div>
        </footer>
    );
};

export default Footer;