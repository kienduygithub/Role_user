import React from "react";
import Header from '../../components/Header/Header';

const Default = (props) => {
    return (
        <>
            <Header isShow={props.isShowHeader} />
            {props.element}
        </>
    )
}


export default Default;