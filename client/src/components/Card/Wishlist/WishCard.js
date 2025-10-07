import { useContext } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton } from '@mui/material';
import './WishCard.css'
import { Button } from '@mui/material';
import { WishItemsContext } from '../../../Context/WishItemsContext';
import { buildImageUrl } from '../../../api';

const WishCard = (props) => {

    const wishItems = useContext(WishItemsContext)

    const handelRemoveItem = () => {
        wishItems.removeItem(props.item)
    }

    const handelAddToCart = () => {
        wishItems.addToCart(props.item)
    };

    return ( 
        <div className="wishcard">
             <div className="wish__remove__item__icon">
                <IconButton>
                    <HighlightOffIcon onClick={handelRemoveItem}/>
                </IconButton>
            </div>
            <div className="wish__item__image">
                <img src={buildImageUrl(props.item.category, props.item.image?.[0]?.filename)} alt={props.item.name} className="wish__image"/>
            </div>
            <div className="wish__item__name">{props.item.name}</div>
            <div className="wish__item__price">${props.item.price}</div>
            <div className="add__to__cart">
                <Button variant='outlined' onClick={handelAddToCart} sx={[{'&:hover': { backgroundColor: 'var(--color-accent)', borderColor: 'var(--color-accent)', color: '#fff'}, borderColor: 'var(--color-accent)', backgroundColor: "var(--color-accent)" , color: "#fff"}]}>Add to cart</Button>
            </div>
        </div>
     );
}
 
export default WishCard;