import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { TabTitle } from '../../utils/General';
import api from "../../api";
import ShopCategory from './Container/ShopCategory';
import './Shop.css';
import ReactLoading from 'react-loading';

const Shop = () => {
    TabTitle("Shop - BANDAI STORE")
    const [ gunplaItems, setGunplaItems ] = useState()
    const [ figureItems, setFigureItems ] = useState()
    const [ modelKitItems, setModelKitItems ] = useState()
    const [ accessoryItems, setAccessoryItems ] = useState()
    const [ loading , setLoading ] = useState(true) 

    const location = useLocation();
    const selectedCategory = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return params.get('category');
    }, [location.search]);

    useEffect(() => {
        api.get('/items')
            .then(res => {
                setGunplaItems(res.data.filter((item) => item.category === "gunpla"))
                setFigureItems(res.data.filter((item) => item.category === "figure" ))
                setModelKitItems(res.data.filter((item) => item.category === "modelkit"))
                setAccessoryItems(res.data.filter((item) => item.category === "accessory"))
                setLoading(false)
            })
            .catch(err => console.log('Shop fetch error', err))
        window.scrollTo(0, 0)
    
    }, [])

    // Auto scroll to category section (simple delay for render)
    useEffect(() => {
        if(!selectedCategory) return;
        const idMap = {
            gunpla: 'shop-section-gunpla',
            figure: 'shop-section-figure',
            modelkit: 'shop-section-modelkit',
            accessory: 'shop-section-accessory'
        };
        const elId = idMap[selectedCategory];
        if(elId){
            const el = document.getElementById(elId);
            if(el){
                setTimeout(()=> el.scrollIntoView({behavior:'smooth', block:'start'}), 150);
            }
        }
    }, [selectedCategory, loading]);

    return ( 
        <div className="shop__contianer">
            {loading && <ReactLoading type="balls" color='var(--color-accent)'  height={100} width={100} className='container h-100 w-10 justify-self-center align-self-center m-auto'/>}
            {gunplaItems && <div id="shop-section-gunpla"><ShopCategory name="Gunpla" key="gunpla" items={gunplaItems}/></div>}
            {figureItems && <div id="shop-section-figure"><ShopCategory name="Figures" key="figure" items={figureItems}/></div>}
            {modelKitItems && <div id="shop-section-modelkit"><ShopCategory name="Model Kits" key="modelkit" items={modelKitItems}/></div>}
            {accessoryItems && <div id="shop-section-accessory"><ShopCategory name="Phụ kiện" key="accessory" items={accessoryItems}/></div>}
        </div>
     );
}
 
export default Shop;