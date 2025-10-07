import Carousel from 'react-bootstrap/Carousel';
import './ItemCarousel.css'
import { buildImageUrl } from '../../../api';

const ProductCarousel = (props) => {
  if(!props.item) return null;
  const first = props.item.image?.[0]?.filename;
  const second = props.item.image?.[1]?.filename || first;
  return (
      <div className="product__carousel__container">
        <div className="product__carousel">
          <Carousel variant="dark" interval={4000}>
            <Carousel.Item>
            <div className="carousel__image__container">
                {first && <img className="carousel__image" src={buildImageUrl(props.item.category, first)} alt={props.item.name}/>}
            </div>
            </Carousel.Item>  
            <Carousel.Item>
            <div className="carousel__image__container">
                {second && <img className="carousel__image" src={buildImageUrl(props.item.category, second)} alt={props.item.name}/>}
              </div>
            </Carousel.Item>   
            {/* <Carousel.Item>
            <div className="carousel__image__container">
                <img className="carousel__image" src={props.item?.image?.[2]?.url || props.item?.image?.[2]?.filename ? `${process.env.REACT_APP_API_BASE_URL || ''}/public/${props.item.category}/${props.item.image[2].filename}` : ''} alt="item"/>
              </div>
            </Carousel.Item> */}
          </Carousel>
        </div>
      </div>
     );
}
 
export default ProductCarousel;