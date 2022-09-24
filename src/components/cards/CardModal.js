import React, {useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {connect} from "react-redux";
import {addCardInActions, deleteCard, updateCardInActions} from "../../redux/actions";


function CardModal(props) {



    const [title, setTitle] = useState((props.modalWindow.type === 'UPDATE' ? props.modalWindow.data.title : ''));
    const [description, setDescription] = useState((props.modalWindow.type === 'UPDATE' ? props.modalWindow.data.description : ''));
    const [priority, setPriority] = useState((props.modalWindow.type === 'UPDATE' ? props.modalWindow.data.priority : props.priority[0]));
    const [status, setStatus] = useState((props.modalWindow.type === 'UPDATE' ? props.modalWindow.data.status : props.columns[0].status));

    let newCard = {title, description, priority, status};

    const saveButtonHandler = (id) => {
        if (props.modalWindow.type === 'CREATE') {
            props.addCard(newCard);
            props.closeModal();
            setStatus(props.columns[0].status)
        }
        if (props.modalWindow.type === 'UPDATE') {
            props.updateCard(id, newCard);
            props.closeModal();
        }
    }

    const deleteButtonHandler = (id) => {
        props.deleteCard(id);
        props.closeModal();
        const delay = () => {
            props.setVisibilityOfInputs(true)
        }
        setTimeout(delay, 500)
    }


    return (
        <div>

            <Modal isOpen={props.modalWindow.modalIsOpen} toggle={props.closeModal}>
                <ModalHeader
                    toggle={props.closeModal}>{props.modalWindow.type === 'UPDATE' ? 'Update task' :
                    props.modalWindow.type === 'CREATE' ? 'Add task' : 'Delete task '}</ModalHeader>
                {props.visibilityOfInputs &&
                <ModalBody>

                    <div className="input-group mb-3" >
                        <input type={'text'} className="form-control" placeholder="Task name"
                               aria-describedby="basic-addon1" onChange={(e) => setTitle(e.target.value)}
                               defaultValue={props.modalWindow.data.title} />
                    </div>

                    <div className="input-group mb-3">
                        <input type={'text'} className="form-control" placeholder="Task description"
                               aria-describedby="basic-addon1" onChange={(e) => setDescription(e.target.value)}
                               defaultValue={props.modalWindow.data.description}/>
                    </div>

                    Priority:
                    <select className="form-select" aria-label="Default select example"
                            onChange={(e) => setPriority(e.target.value)}
                            defaultValue={props.modalWindow.data.priority} >
                        {props.priority.map(el => <option
                            key={el}
                        >{el}
                        </option>)}
                    </select>
                    <br/>

                    Status:
                    <select className="form-select" aria-label="Default select example"
                            onChange={(e) => setStatus(e.target.value)} defaultValue={props.modalWindow.data.status}>
                        {props.columns.map(el => <option
                            key={el._id}
                        >
                            {el.status}
                        </option>)}
                    </select>

                </ModalBody>}
                {props.visibilityOfInputs &&
                <ModalFooter>
                    <Button color="primary" onClick={() => saveButtonHandler(props.modalWindow.data._id)}>
                        Save
                    </Button>{' '}
                    <Button color="secondary" onClick={props.closeModal}>
                        Cancel
                    </Button>
                </ModalFooter>}
                {!props.visibilityOfInputs &&
                    <ModalBody>
                        Are you sure you want to delete task <b>{props.modalWindow.data.title}</b>?
                    </ModalBody>}
                {!props.visibilityOfInputs &&
                    <ModalFooter>
                        <Button color="primary" onClick={() => deleteButtonHandler(props.modalWindow.data._id)}>
                            Yes
                        </Button>{' '}
                        <Button color="secondary" onClick={props.closeModal}>
                            Cancel
                        </Button>
                    </ModalFooter>
                }

            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => (
    {
        columns: state.columns,
        priority: state.priority,
        modalWindow: state.modalWindow,
    }
)
const mapDispatchToProps = (dispatch) => ({
    addCard: (newCard) => dispatch(addCardInActions(newCard)),
    updateCard: (id, newCard) => dispatch(updateCardInActions(id, newCard)),
    closeModal: () => dispatch({type: 'CLOSE_MODAL', payload: null}),
    deleteCard: (id) => dispatch(deleteCard(id))

})

export default connect(mapStateToProps, mapDispatchToProps)(CardModal);





