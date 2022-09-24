import './App.css';
import {getCardsInActions, getColumnsInActions} from "./redux/actions";
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";

import 'bootstrap/dist/css/bootstrap.css';
import Columns from "./components/columns/Columns";
import CardModal from "./components/cards/CardModal";
import {Button} from "reactstrap";

function App(props) {

    const [visibilityOfInputs, setVisibilityOfInputs] = useState(true)

    useEffect(() => {
        props.getColumns();
        props.getCards();
    }, [])


    const addCardButtonHandler = () => {
        const modalObject = {
            type: 'CREATE',
            data: {},
            modalIsOpen: true
        }
        props.openModal(modalObject)
    }

    return (
        <div className="App">
            <h1>Kanban</h1>
            <CardModal visibilityOfInputs={visibilityOfInputs} setVisibilityOfInputs={setVisibilityOfInputs}/>

            <Button color="danger" onClick={addCardButtonHandler}>
                Add a task
            </Button>

            <div className="container text-center">
                <div className="row align-items-start">
                    {props.columns.map(el => <Columns key={el._id} column={el} visibilityOfInputs={visibilityOfInputs} setVisibilityOfInputs={setVisibilityOfInputs}/>)}
                </div>
            </div>
        </div>
    );

}

const mapStateToProps = (state) => ({
    columns: state.columns,
    cards: state.cards
})
const mapDispatchToProps = (dispatch) => ({
    getColumns: () => dispatch(getColumnsInActions()),
    getCards: () => dispatch(getCardsInActions()),
    openModal: (modalObject) => dispatch({type: 'OPEN_MODAL', payload: modalObject}),

})

export default connect(mapStateToProps, mapDispatchToProps)(App);
