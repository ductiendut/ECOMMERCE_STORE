import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import api from '../api';
import ReactLoading from 'react-loading';
import Category from '../components/Category/Category';

const CategoryView = () => {
    const param = useParams()
    const [ gunplaItems, setGunplaItems ] = useState()
    const [ figureItems, setFigureItems ] = useState()
    const [ modelKitItems, setModelKitItems ] = useState()
    const [ accessoryItems, setAccessoryItems ] = useState()
    const [ loading , setLoading ] = useState(true) 

    useEffect(() => {
        let active = true;
        api.get('/items')
            .then(res => {
                if(!active) return;
                setGunplaItems(res.data.filter((item) => item.category === 'gunpla'))
                setFigureItems(res.data.filter((item) => item.category === 'figure'))
                setModelKitItems(res.data.filter((item) => item.category === 'modelkit'))
                setAccessoryItems(res.data.filter((item) => item.category === 'accessory'))
                setLoading(false)
            })
            .catch(err => console.log('Category fetch error', err));
        window.scrollTo(0, 0);
        return () => { active = false };
    }, [param.id])
    
    return ( 
        <div className='d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto'>
            {loading && <ReactLoading type="balls" color='var(--color-accent)' height={100} width={100} className='m-auto'/>}
            { gunplaItems && param.id === 'gunpla' && <Category name="Gunpla" items={gunplaItems} category="gunpla"/>}
            { figureItems && param.id === 'figure' && <Category name="Figures" items={figureItems} category="figure"/>}
            { modelKitItems && param.id === 'modelkit' && <Category name="Model Kits" items={modelKitItems} category="modelkit"/>}
            { accessoryItems && param.id === 'accessory' && <Category name="Phụ kiện" items={accessoryItems} category="accessory"/>}
        </div>
     );
}
 
export default CategoryView;