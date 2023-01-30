import React from "react";
import './recipientList.css';

const recipientList =({searchChange}) => {

    return (
        <div>
            <input 
                type='Search'
                placeholder="search robots"
                onChange={searchChange}
            />
        </div>
    );
}

export default recipientList;