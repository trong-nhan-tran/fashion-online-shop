import "../Modal.scss";
import "./Search.scss";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
const ModalSearch = ({ toggleSearch, isOpen }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [tempSearchTerm, setTempSearchTerm] = useState("");

    const handleSearchChange = (event) => {
        setTempSearchTerm(event.target.value);
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setSearchParams({ search: tempSearchTerm });
        toggleSearch();
    }
    return (
        <>
            <div className={`modal modal-search ${isOpen ? 'open' : ''}`}>
                <div className="overlay" onClick={toggleSearch}></div>

                <div className={`modal-content search-content ${isOpen ? 'open' : ''}`}>
                    <div className="modal-header search-header">
                        <form className="search-box" onSubmit={handleSearchSubmit}>
                            <div className="search-icon"  
                                type="submit"
                            >
                                <i className="bi-search"></i>
                            </div>
                            <input 
                                className="input-search" 
                                type="text" 
                                placeholder="What are you looking for..."
                                onChange={handleSearchChange}
                            />
                        </form>
                        <div className="exit-button pointer hov-cl1" onClick={toggleSearch}>
                            <i className="bi-x"></i>
                        </div>
                    </div>

                    <div className="modal-body search-body">

                    </div>

                </div>
            </div>
        </>
    )
}

export default ModalSearch;