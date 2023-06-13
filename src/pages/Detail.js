import React from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
function Detail() {

    const { id } = useParams();
    return(
        <div>
            <div>
                <Header/>
            </div>
            <div>
                <p>{id}</p>
            </div>
        </div>
    )
}

export default Detail