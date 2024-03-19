import "./Shop.scss"
import { useState } from "react";
import { useEffect } from "react";
import { apiGetProducts } from "../../../apis";
import { publicRoute } from "../../../routes";
import {Link} from "react-router-dom";
import ModalFilter from "../../../components/Modal/FIlter/Filter";
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Shop = () => {
    
    const [searchParams] = useSearchParams();
    const { category } = useParams();
    const [products, setProducts] = useState(null);
    const fetchProducts = async (params) => {
        const response = await apiGetProducts(params);
        if (!response.err) {
            setProducts(response)
        }
        
    }

    useEffect(() => {
        let params = [];
        for (let i of searchParams.entries()){
            params.push(i)
        };
        const queries = {};
        for(let i of params){
            queries[i[0]] = i[1]
        }
        fetchProducts({
            queries
        })
    }, [searchParams]);

    const [filter, setFilter] = useState(false);

    const toggleFilter = () => {
        setFilter(!filter);
    }

    return (
        <>
            <div className="main-container">
                <div className="shop-header">
                    <h2>Shop {category}</h2>
                    <div className="button-open-filter" onClick={toggleFilter}>
                        <span>Filter</span>
                        <i className="bi-sliders"></i>
                    </div>

                </div>
                
                <ModalFilter toggleFilter={toggleFilter} isOpen={filter}></ModalFilter>
                {
                    name? <h2 className="search-result">Search results for "{name}"</h2>
                    :null
                }
                <div className="product-container">
                    {products?.productList?.map((el) => {
                        return (
                            <div className="product-item" key={el.product_id}>
                                <div className="product-content">
                                    <div className="product-image">
                                        <img src={el.thumbnail} alt="IMG-PRODUCT" />

                                        <a href="#" className="quick-button">
                                            Quick View
                                        </a>
                                    </div>


                                    <div className="product-title">
                                        <Link to={`${el.product_id}`} className="product-name">
                                            {el.product_name}
                                        </Link>

                                        <span className="product-price">
                                            ${el.price}
                                        </span>
                                    </div>


                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
};

export default Shop;