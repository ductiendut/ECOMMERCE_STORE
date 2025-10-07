import { useState, useEffect } from 'react';
import api from '../../../api'; 
import RelatedCard from '../../Card/RelatedCard/RelatedCard';
import './Related.css';

const Related = (props) => {
    
    const [ gunplaItems, setGunplaItems ] = useState()
    const [ figureItems, setFigureItems ] = useState()
    const [ modelKitItems, setModelKitItems ] = useState()
    const [ accessoryItems, setAccessoryItems ] = useState()

    useEffect(() => {
        api.get('/items')
            .then(res => {
                setGunplaItems(res.data.filter((item) => item.category === 'gunpla'))
                setFigureItems(res.data.filter((item) => item.category === 'figure'))
                setModelKitItems(res.data.filter((item) => item.category === 'modelkit'))
                setAccessoryItems(res.data.filter((item) => item.category === 'accessory'))
            })
            .catch(err => console.log('Related fetch error', err))
    }, [])
    
    return ( 
            <div className="related__products">
                <div className="related__header__container">
                    <div className="related__header">
                        <h2>Recommended Products</h2>
                    </div>
                    <div className="related__header__line">
                            
                    </div>
                </div>
                <div className="related__card__container">
                    <div className="related__product__card">
                        { gunplaItems && props.category === 'gunpla' && gunplaItems.map((item) => <RelatedCard key={item._id} item={item}/>)}
                        { figureItems && props.category === 'figure' && figureItems.map((item) => <RelatedCard key={item._id} item={item}/>)}
                        { modelKitItems && props.category === 'modelkit' && modelKitItems.map((item) => <RelatedCard key={item._id} item={item}/>)}
                        { accessoryItems && props.category === 'accessory' && accessoryItems.map((item) => <RelatedCard key={item._id} item={item}/>)}
                        
                    </div>
                </div>
            </div>
     );
}
 
export default Related;