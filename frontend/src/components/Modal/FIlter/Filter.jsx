import "../Modal.scss";
import "./Filter.scss";
import ButtonBlack from "../../Button/ButtonBlack";
import CheckBox from "../../CheckBox/CheckBox";
import { useCallback, useEffect, useState } from "react";
import { apiGetTypes } from "../../../apis";
import { createSearchParams, useParams, useNavigate } from "react-router-dom"
const ModalFilter = ({ toggleFilter, isOpen }) => {
    const navigate = useNavigate()
    const { category } = useParams()
    const [types, setTypes] = useState(null);
    const [filterBody, setFilterBody] = useState({
        sortBy: false,
        type: false,
        price: false,
        color: false
    });

    const [selected, setSelected] = useState([]);

    const fetchTypes = async() =>{
        const response = await apiGetTypes();
        if(!response.err){
            setTypes(response.types);
        }
    }

    const toggleFilterBody = (name) => {
        setFilterBody({
            ...filterBody,
            [name]: !filterBody[name]
        });
    }

    useEffect(() => {
        fetchTypes()
    }, [types]);

    const handleSelect = (e) => {
        const alreadyEl = selected.find(el => el === e.target.value);
        if(alreadyEl){
            setSelected(prev => prev.filter(el => el !== e.target.value))
        }else{
            setSelected(prev => [...prev, e.target.value]);
        }
    }
    
    useEffect(() => {
        navigate({
            pathname: `/${category}`,
            search: createSearchParams({
                type: selected
            }).toString()
        })
    }, [selected]);
    return (
        <>
            <div className={`modal modal-filter ${isOpen ? 'open' : ''}`}>
                <div className="overlay" onClick={toggleFilter}></div>

                <div className={`modal-content filter-content ${isOpen ? 'open' : ''}`}>
                    <div className="modal-header">
                        <h2 className="modal-header-title">Filter</h2>
                        <div className="exit-button pointer hov-cl1" onClick={toggleFilter}>
                            <i className="bi-x"></i>
                        </div>
                    </div>

                    <div className="modal-body">
                        <div className="filter-container">
                            <div className="filter-item">
                                <div className="filter-header" onClick={() => toggleFilterBody('sortBy')}>
                                    <span className="filter-title">
                                        Sort By
                                    </span>

                                    <i className="bi-chevron-up" onClick={() => toggleFilterBody('sortBy')}></i>
                                </div>
                                <div className={`filter-body ${filterBody.sortBy ? 'show' : ''}`}>
                                    <div className="filter-type">
                                        <input type="radio" name="sort-by" className="check-box-filter" />
                                        <label htmlFor="" className="filter-label">Newest</label>
                                    </div>
                                    <div className="filter-type">
                                        <input type="radio" name="sort-by" className="check-box-filter" />
                                        <label htmlFor="" className="filter-label">Price Low To High</label>
                                    </div>
                                    <div className="filter-type">
                                        <input type="radio" name="sort-by" className="check-box-filter" />
                                        <label htmlFor="" className="filter-label">Price High To Low</label>
                                    </div>

                                </div>
                            </div>

                            <div className="filter-item">
                                <div className="filter-header" onClick={() => toggleFilterBody('type')}>
                                    <span className="filter-title">
                                        Type
                                    </span>

                                    <i className="bi-chevron-up" ></i>
                                </div>
                                <div className={`filter-body ${filterBody.type ? 'show' : ''}`}>
                                   {
                                     types && types?.map((type)=>{
                                        return(
                                            <div key={type.type_id}>
                                                <CheckBox
                                                    label={type.type_name}
                                                    name={"type"}
                                                    id={type.type_name}
                                                    value={type.type_name}
                                                    onChange={handleSelect}
                                                    checked={selected.some(selectedItem => selectedItem === type.type_name)}
                        
                                                />
                                            </div>
                                        )
                                     }) 
                                   }
                                   

                                </div>
                            </div>
                            <div className="filter-item">
                                <div className="filter-header" onClick={() => toggleFilterBody('price')}>
                                    <span className="filter-title">
                                        Price
                                    </span>

                                    <i className="bi-chevron-up" onClick={() => toggleFilterBody('price')}></i>
                                </div>
                                <div className={`filter-body ${filterBody.price ? 'show' : ''}`}>
                                    <div className="filter-type">
                                        <input type="checkbox" name="price" className="check-box-filter" />
                                        <label htmlFor="" className="filter-label">$0 - $25</label>
                                    </div>
                                    <div className="filter-type">
                                        <input type="checkbox" name="price" className="check-box-filter" />
                                        <label htmlFor="" className="filter-label">$25 - $50</label>
                                    </div>
                                    <div className="filter-type">
                                        <input type="checkbox" name="price" className="check-box-filter" />
                                        <label htmlFor="" className="filter-label">$50 - $100</label>
                                    </div>
                                    <div className="filter-type">
                                        <input type="checkbox" name="price" className="check-box-filter" />
                                        <label htmlFor="" className="filter-label">$100 - $150</label>
                                    </div>
                                    <div className="filter-type">
                                        <input type="checkbox" name="price" className="check-box-filter" />
                                        <label htmlFor="" className="filter-label">$150 - $300</label>
                                    </div>
                                    <div className="filter-type">
                                        <input type="checkbox" name="price" className="check-box-filter" />
                                        <label htmlFor="" className="filter-label">$300+</label>
                                    </div>

                                </div>
                            </div>
                            <div className="filter-item">
                                <div className="filter-header" onClick={() => toggleFilterBody('color')}>
                                    <span className="filter-title">
                                        Color
                                    </span>

                                    <i className="bi-chevron-up" onClick={() => toggleFilterBody('color')}></i>
                                </div>
                                <div className={`filter-body ${filterBody.color ? 'show' : ''}`}>
                                    <div className="filter-type">
                                        <input type="checkbox" name="color" className="check-box-filter" />
                                        <label htmlFor="" className="filter-label">$0 - $25</label>
                                    </div>
                                    <div className="filter-type">
                                        <input type="checkbox" name="color" className="check-box-filter" />
                                        <label htmlFor="" className="filter-label">$25 - $50</label>
                                    </div>
                                    <div className="filter-type">
                                        <input type="checkbox" name="color" className="check-box-filter" />
                                        <label htmlFor="" className="filter-label">$50 - $100</label>
                                    </div>
                                    <div className="filter-type">
                                        <input type="checkbox" name="color" className="check-box-filter" />
                                        <label htmlFor="" className="filter-label">$100 - $150</label>
                                    </div>
                                    <div className="filter-type">
                                        <input type="checkbox" name="color" className="check-box-filter" />
                                        <label htmlFor="" className="filter-label">$150 - $300</label>
                                    </div>
                                    <div className="filter-type">
                                        <input type="checkbox" name="color" className="check-box-filter" />
                                        <label htmlFor="" className="filter-label">$300+</label>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default ModalFilter;