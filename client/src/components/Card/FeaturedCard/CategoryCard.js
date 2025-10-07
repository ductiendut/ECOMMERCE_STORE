import { Link, useNavigate } from 'react-router-dom';
import './CategoryCard.css'
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import api, { buildImageUrl } from '../../../api';

const CategoryCard = (props) => { 
    const { data } = props;
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const slug = (data?.url || '').split('/').pop(); // expects /category/<slug>

    useEffect(() => {
        let active = true;
        if(!slug){
            setLoading(false);
            return;
        }
        setLoading(true);
        api.get(`/items?category=${slug}`)
           .then(res => { if(active) setItems((res.data||[]).slice(0,2)); })
           .catch(()=>{})
           .finally(()=> { if(active) setLoading(false); });
        return () => { active = false };
    }, [slug]);

    // Decide what to show inside banner area
    let bannerContent;
    if(items.length === 0){
        bannerContent = (
            <img
                src={data.image || '/assets/categories/fallback-category.svg'}
                alt={data.name || ''}
                className="product__img"
                onError={(e)=>{ if(!e.target.dataset.fallback){ e.target.dataset.fallback='1'; e.target.src='/assets/categories/fallback-category.svg'; }} }
            />
        );
    } else if(items.length === 1){
        bannerContent = (
            <img
                src={buildImageUrl(items[0].category, items[0].image?.[0]?.filename)}
                alt={items[0].name}
                className="product__img"
            />
        );
    } else { // 2 items -> simple split layout
        bannerContent = (
            <div className="category__mosaic">
                {items.map((it, idx) => (
                    <img key={it._id || idx} src={buildImageUrl(it.category, it.image?.[0]?.filename)} alt={it.name} className="category__mosaic__img" />
                ))}
            </div>
        );
    }

    const goToShopCategory = () => {
        if(slug) navigate(`/shop?category=${slug}`);
    }

    return (
        <div className="category__card__card" style={{cursor:'pointer'}} onClick={goToShopCategory}>
            <div className="category__image">
               {bannerContent}
               {loading && <div className="category__loading">Loading...</div>}
            </div>
            <div className="category__card__detail">
                <div className="category__name">
                    <span>{data.name}</span>
                </div>
                <div className="category__card__action" onClick={(e)=>{ e.stopPropagation(); }}>
                    <Link to={`/shop?category=${slug}`} style={{textDecoration:'none'}}>
                        <Button variant='outlined' sx={[{'&:hover': { backgroundColor: 'var(--color-accent)', borderColor: 'var(--color-accent)', color: '#fff'}, borderRadius: '20px' , borderColor: 'var(--color-accent)', backgroundColor: 'var(--color-accent)' , color: '#fff', fontWeight: '700'}]}>XEM SẢN PHẨM</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
 
export default CategoryCard;