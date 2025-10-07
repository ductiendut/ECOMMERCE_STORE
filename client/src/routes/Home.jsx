import { Fragment, useEffect, useState } from "react";
import api from "../api";
import Landing from "../components/Landing/Landing";
import FeaturedItems from "../components/Featured/Items/FetauredItems";
import FeaturedCategories from "../components/Featured/Categories/FeaturedCategories";
import { TabTitle } from "../utils/General";


const Home = () => {
    const [ featuredItems, setFeaturedItems ] = useState();
    TabTitle("Home - BANDAI STORE");

    useEffect(() => {
        let isMounted = true;
        api.get('/items')
            .then(res => {
                if(!isMounted) return;
                const all = res.data || [];
                // Strategy: lấy 1-2 sản phẩm mới nhất mỗi category chính (gunpla, figure, modelkit, accessory)
                const byCat = all.reduce((acc, it) => {
                    acc[it.category] = acc[it.category] || [];
                    acc[it.category].push(it);
                    return acc;
                }, {});
                Object.keys(byCat).forEach(c => byCat[c].sort((a,b)=> (new Date(b.createdAt||0)) - (new Date(a.createdAt||0))));
                const pick = [];
                const order = ['gunpla','figure','modelkit','accessory'];
                order.forEach(cat => {
                    if(byCat[cat]) pick.push(...byCat[cat].slice(0,2)); // 2 mỗi category
                });
                // fallback nếu tổng < 8 thì bổ sung thêm từ danh sách còn lại
                if(pick.length < 8){
                    const ids = new Set(pick.map(i=>i._id));
                    for(const it of all){
                        if(pick.length >= 8) break;
                        if(!ids.has(it._id)) pick.push(it);
                    }
                }
                setFeaturedItems(pick);
            })
            .catch(err => console.log('Fetch items error', err));
        window.scrollTo(0, 0);
        return () => { isMounted = false };
    }, [])

    return ( 
        <Fragment>
            <Landing />
            <FeaturedCategories />
            <FeaturedItems items={featuredItems}/>
        </Fragment>
    );
}
 
export default Home;