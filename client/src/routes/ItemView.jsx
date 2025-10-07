import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import api from '../api';
import ReactLoading from 'react-loading';
import Item from '../components/Item/Item';

const ProductView = (props) => {
    const param = useParams()
    const [ item, setItem ] = useState()
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0);
        let mounted = true;
        api.get(`/items/${param.id}`)
            .then(res => { if(mounted){ setItem(res.data); setLoading(false);} })
            .catch(err => console.log('Item fetch error', err));
        return () => { mounted = false };
    }, [param.id]);
    
    return (
            <div className="d-flex min-vh-100 w-100 justify-content-center align-items-center m-auto">
                {loading && <ReactLoading type="balls" color='var(--color-accent)' height={100} width={100} className='m-auto'/>}
                {item && <Item item={item}/>}
            </div>
     );
}
 
export default ProductView;