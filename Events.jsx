import React, {useState } from "react"
import EventsForm from "./EventsForm"
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";


function Events(){

const [show, setShow] = useState(false);
const [data,setData] = useState({
    name: ""
})

const hideModal = () =>{
    setShow(false)
}

const addFormModal = () =>{
    setData({name: ""})
    setShow(true)
}
const updateFormModal = () =>{
    setData({name: "Update"})
    setShow(true)
}
const navigate = useNavigate();

const cancelBtn =() =>{
    navigate('/')
}

    return(
        <>
        <div className="card" id="events-card-homepage">
        <div className="card-title" id="events-header">
            <h1> Welcome to the events page </h1>
        </div>

            <button type="button" className="btn" id="events-btns" onClick={addFormModal}> Add an event </button>
            <button type="button" className="btn" id="events-btns" onClick={updateFormModal}> Update an event </button>
            <button type="button" className="btn" id="events-btns" onClick={cancelBtn}>    
                        Back home           
                </button>  

        </div>            
        <Modal show={show} onHide={hideModal}>
                <EventsForm data={data}/>
        </Modal>
           
        </>
    )
}
export default Events
