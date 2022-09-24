import axios from "axios";

export const getColumnsInActions = () => {
    return (dispatch) => axios.get('https://kanban-serv.herokuapp.com/column')
        .then(res => dispatch({type: 'GET_COLUMNS', payload: res.data}))
        .catch(err => console.log(err))
}

export const getCardsInActions = () => {
    return (dispatch) => axios.get('https://kanban-serv.herokuapp.com/card')
        .then(res => dispatch({type: 'GET_CARDS', payload: res.data}))
        .catch(err => console.log(err))
}
export const addCardInActions = (newCard) => {
    return (dispatch) => axios.post('https://kanban-serv.herokuapp.com/card', newCard)
        .then(res => dispatch(getCardsInActions()))
        .catch(err => console.log(err))
}

export const changePriority = (id, priority, direction) => {
    const newPriority = priority + direction;
    return (dispatch) => axios.patch(`https://kanban-serv.herokuapp.com/card/${id}`, {priority: newPriority})
        .then(res => dispatch(getCardsInActions()))
        .catch(err => console.log(err))
}
export const changeStatus = (id, status, columns, direction) => {
    const currentIndex = columns.findIndex(el => el.status === status);
    const newStatus = columns[currentIndex + direction].status;
    return (dispatch) => axios.patch(`https://kanban-serv.herokuapp.com/card/${id}`, {status: newStatus})
        .then(res => dispatch(getCardsInActions()))
        .catch(err => console.log(err))
}

export const updateCardInActions = (id, newCard) => {
    return (dispatch) => axios.patch(`https://kanban-serv.herokuapp.com/card/${id}`, {
        'title': newCard.title,
        'description': newCard.description,
        "status": newCard.status,
        'priority': newCard.priority
    })
        .then(res => dispatch(getCardsInActions()))
        .catch(err => console.log(err))
}
export const deleteCard = (id) => {
    return (dispatch) => axios.delete(`https://kanban-serv.herokuapp.com/card/${id}`)
        .then(res => dispatch(getCardsInActions())
        .catch(err => console.log(err)))
}





// 'title': newCard.title, 'description': newCard.description





