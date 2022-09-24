import React from 'react';
import {Button, Card, CardBody, CardHeader, CardTitle} from "reactstrap";
import {connect} from "react-redux";
import {changePriority, changeStatus, getCardsInActions, getColumnsInActions} from "../../redux/actions";

const Cards = (props) => {



    const cardColour = () => {
        return props.card.status === props.columns[0].status ? 'danger' :
            props.card.status === props.columns[1].status ? 'primary' :
                props.card.status === props.columns[2].status ? 'info' : 'secondary'
    }

    const updateCardButtonHandler = () => {
        const modalObject = {
            type: 'UPDATE',
            data: props.card,
            modalIsOpen: true
        }
        props.openModal(modalObject)
    }

    const deleteButtonHandler = () => {
        const modalObject = {
            type: 'DELETE',
            data: props.card,
            modalIsOpen: true
        }
        props.setVisibilityOfInputs(false)
        props.openModal(modalObject)
    }

    return (
        <div>
            <Card
                className="my-2"
                color={cardColour()}
                outline
                style={{
                    width: '18rem'
                }}
            >
                <CardHeader tag="h6">
                    {props.card.title}
                </CardHeader>
                <CardBody>
                    <CardTitle>
                        {props.card.description}
                    </CardTitle>
                    <hr/>
                    <Button
                        color={cardColour()}
                        outline
                        onClick={() => props.changePriority(props.card._id, props.card.priority, -1)}
                        disabled={props.card.priority === 1}
                    >
                        ↓
                    </Button>
                    {'  '}
                    Priority: {'  '}
                    {props.card.priority}
                    {'  '}
                    <Button
                        color={cardColour()}
                        outline
                        onClick={() => props.changePriority(props.card._id, props.card.priority, 1)}
                        disabled={props.card.priority === 10}
                    >
                        ↑
                    </Button>
                    <hr/>
                    <Button
                        color={cardColour()}
                        outline
                        onClick={() => props.changeStatus(props.card._id, props.card.status, props.columns, -1)}
                        disabled={props.card.status === props.columns[0].status}
                    >
                        ←
                    </Button>
                    <Button
                        color={cardColour()}
                        outline
                        onClick={() => props.changeStatus(props.card._id, props.card.status, props.columns, 1)}
                        disabled={props.card.status === props.columns[props.columns.length - 1].status}
                    >
                        →
                    </Button>
                    <hr/>
                    <Button color="success" onClick={updateCardButtonHandler}>
                        update
                    </Button>
                    <Button color="danger" onClick={deleteButtonHandler}>
                        delete
                    </Button>

                </CardBody>
            </Card>
        </div>
    );
};

const mapStateToProps = (state) => ({
    columns: state.columns,
    cards: state.cards,
})

const mapDispatchToProps = (dispatch) => ({
    changePriority: (id, priority, direction) => dispatch(changePriority(id, priority, direction)),
    changeStatus: (id, status, columns, direction) => dispatch(changeStatus(id, status, columns, direction)),
    openModal: (modalObject) => dispatch({type: 'OPEN_MODAL', payload: modalObject}),

})


export default connect(mapStateToProps, mapDispatchToProps)(Cards);
