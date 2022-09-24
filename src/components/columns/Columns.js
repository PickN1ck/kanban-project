import React from 'react';

import {connect} from "react-redux";
import Cards from "../cards/Cards";

const Columns = (props) => {
    return (
        <div className="col">
            <h3>{props.column.title}</h3>
            {props.cards.filter(el => el.status === props.column.status)
                .sort((a, b) => b.priority - a.priority)
                .map(el => <Cards key={el._id} card={el} visibilityOfInputs={props.visibilityOfInputs} setVisibilityOfInputs={props.setVisibilityOfInputs}/>)}
        </div>
    );
};


const mapStateToProps = (state) => ({
    cards: state.cards
})


export default connect(mapStateToProps)(Columns);

