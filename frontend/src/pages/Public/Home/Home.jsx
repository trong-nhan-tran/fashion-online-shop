import "./Home.scss";
import {Link} from "react-router-dom";
import { publicRoute } from "../../../routes";
const HomePage = () =>{
    return(
    <>
        <div className="home-container">
            <div className="fullbleed-img">
                <img className="fullbleed-img-nomarl" src="images/home/Coats_Women_2x.webp" alt=""/>
                <img className="fullbleed-img-mobile" src="images/home/Coats_Women_Mobile_2x.webp" alt=""/>

                <div className="content-text">
                    <span className="content-txt-header">The New Puffers</span>
                    <p className="content-txt-paragraph">
                        Sporty protection from the cold in new matte or shine textures.
                    </p>
                    <div className="content-button-container">
                        <div className="content-button">
                            <Link to={`${publicRoute.PUBLIC}women`}>Shop Women`s</Link>
                        </div>
                        <div className="content-button">
                            <Link  to={`${publicRoute.PUBLIC}men`}>Shop Men's</Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="product-carousel-category">
                <div className="carousel-category-item">
                    <img src="/images/home/carousel-category/1.webp" alt="" />
                    <div className="category-item-txt">
                        <span className="category-item-txt-header" >New Arrivals</span>
                        <span className="category-item-txt-button">
                            <a href=""><span>Shop</span> Women's</a>
                            <a href=""><span>Shop</span> Men's</a>
                        </span>
                    </div>
                </div>
                <div className="carousel-category-item">
                    <img src="/images/home/carousel-category/2.webp" alt="" />
                    <div className="category-item-txt">
                        <span className="category-item-txt-header" >Essentials</span>
                        <span className="category-item-txt-button">
                            <a href=""><span>Shop</span> Women's</a>
                            <a href=""><span>Shop</span> Men's</a>
                        </span>
                    </div>
                </div>
                <div className="carousel-category-item">
                    <img src="/images/home/carousel-category/3.webp" alt="" />
                    <div className="category-item-txt">
                        <span className="category-item-txt-header" >Bestsellers</span>
                        <span className="category-item-txt-button">
                            <a href=""><span>Shop</span> Women's</a>
                            <a href=""><span>Shop</span> Men's</a>
                        </span>
                    </div>
                </div>
                <div className="carousel-category-item">
                    <img src="/images/home/carousel-category/4.webp" alt="" />
                    <div className="category-item-txt">
                        <div className="category-item-txt-header" >Fall Collection</div>
                        <div className="category-item-txt-button">
                            <a href=""><span>Shop</span> Women's</a>
                            <a href=""><span>Shop</span> Men's</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="four-option-cloth">
                <div className="option-cloth-item">
                    <img src="/images/home/four-option/Sweaters_2x.webp" alt="" />
                    <div className="cloth-item-txt">
                        <span className="cloth-item-txt-header">New Sweaters</span>
                        <p className="cloth-item-txt-paragraph">
                            Layer on luxurious merino and soft cotton 
                            <br />
                            knits. Timeless polish for your everyday life.
                        </p>
                        <div className="cloth-item-button-container">
                            <div className="cloth-item-button">
                                <a href="">Shop Women's Sweaters</a>
                            </div>
                            <div className="cloth-item-button">
                                <a href="">Shop Men's Sweaters</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="option-cloth-item">
                    <img src="/images/home/four-option/Outerwear_2x.webp" alt="" />
                    <div className="cloth-item-txt">
                        <span className="cloth-item-txt-header">The Outerwear Edit</span>
                        <p className="cloth-item-txt-paragraph">
                            Sherpa-lined coat and tailored wool  
                            <br />
                            overcoats. New warmth for the season.
                        </p>
                        <div className="cloth-item-button-container">
                            <div className="cloth-item-button">
                                <a href="">Shop Women's Coats + Jackets</a>
                            </div>
                            <div className="cloth-item-button">
                                <a href="">Shop Men's Coats + Jackets</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="option-cloth-item">
                    <img src="/images/home/four-option/Bottoms_2x.webp" alt="" />
                    <div className="cloth-item-txt">
                        <span className="cloth-item-txt-header">Classic Botttoms</span>
                        <p className="cloth-item-txt-paragraph">
                            The signature denim, chinos and trousers  
                            <br />
                            you need. The foundation of elevated dressing. 
                        </p>
                        <div className="cloth-item-button-container">
                            <div className="cloth-item-button">
                                <a href="">Shop Women's Bottoms</a>
                            </div>
                            <div className="cloth-item-button">
                                <a href="">Shop Men's Bottoms</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="option-cloth-item">
                    <img src="/images/home/four-option/Dresses_2x.webp" alt="" />
                    <div className="cloth-item-txt">
                        <span className="cloth-item-txt-header">Elevated Dresses</span>
                        <p className="cloth-item-txt-paragraph">
                            Effortless silhouettes in every length.  
                            <br />
                            Minimal slip dresses for every occasion.
                        </p>
                        <div className="cloth-item-button-container">
                            <div className="cloth-item-button">
                                <a href="">Shop Dresses</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
        
    )
}

export default HomePage;