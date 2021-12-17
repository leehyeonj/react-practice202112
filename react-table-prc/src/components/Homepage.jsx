import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    let navigate = useNavigate();
    const handleClick = () => {
        navigate('/')
    }
    
    return(
        <>
            <div>home page</div>
            <button onClick={handleClick}>클릭</button>
        </>
    )
}

export default Homepage;