import React, {useEffect, useState } from "react"
import { Formik, Form, Field ,ErrorMessage} from "formik";
import debug from "sabio-debug";
import PropTypes from "prop-types"
import toastr from "toastr";
import lookUpService from "services/lookUpService";
import { mapLookUpItem } from "helpers/utils";
import eventsFormSchema from "./EventsSchema"
import "./eventsform.css" 

function EventsForm(props){
        const _logger = debug.extend("EventsForm");  

        const [state, setState] =useState({
        title: "Add"
        ,   formData: {  
            eventTypeId : "",     
            name : "",      
            summary :"",     
            shortDescription :"",               
            venueId :"",     
            eventStatusId :"",                                      
            imageId : "",           
            externalSiteUrl:"",    
            isFree  :"",     
            dateStart  :"",               
            dateEnd  :"",               
        }
    })

    const [eventTypelookupData, setEventTypelookupData] = useState({
        eventTypeData:[],
        eventTypeMapped:[]
    });
    const [eventStatuslookupData, setEventStatuslookupData] = useState({
        eventStatsData:[],
        eventStatusMapped:[]
    });


    useEffect(()=>{
        const EventTypesSuccess = (response) =>{
            _logger(response.item.eventTypes, "LookUp success")
            let eventTypeData = response.item.eventTypes;

            setEventTypelookupData((prevState)=>{
                const newState = {...prevState};
                newState.eventTypeData = eventTypeData;
                newState.eventTypeMapped = eventTypeData.map(mapLookUpItem);
                return newState;
            })
        }
    const EventStatusSuccess = (response) =>{
            _logger(response.item.eventStatus, "LookUp success")
            let eventStatusData = response.item.eventStatus;
            setEventStatuslookupData((prevState)=>{
                const newState = {...prevState}
                newState.eventStatsData = eventStatusData;
                newState.eventStatusMapped = eventStatusData.map(mapLookUpItem);
                return newState;
            })
        }
        lookUpService.LookUp(["EventTypes"]).then(EventTypesSuccess).catch(EventTypesError)

        lookUpService.LookUp(["EventStatus"]).then(EventStatusSuccess).catch(EventStatusError)
    },[]
    )

    const EventTypesError = (error) =>{
        _logger(error, "LookUp Error")
    }


    
    const EventStatusError = (error) =>{
        _logger(error, "LookUp Error")
    }

    useEffect(()=>{
        _logger(state, "State right now")
            if(props.data.name !==""){
                setState({
            title: "Update"
            ,   formData: {  
                eventTypeId : "",     
                name : "",      
                summary :"",     
                shortDescription :"",                  
                venueId :"",     
                eventStatusId :"",                                      
                imageId : "",           
                externalSiteUrl:"",    
                isFree  :"",     
                dateStart  :"",               
                dateEnd  :"",               
            }
            })
                _logger(state, "State right now")
            }          
    },[props.data.name])

    const handleSubmit = () =>{
        toastr.success("Event added!");
    }

    return(
        <>
        <div className="card" id="events-card-model">
        <div className="card-title" id="events-header">
            <h1> {state.title} an Event </h1>
        </div>
            <div className="row">
                <div className="col-md-12">
                     <Formik 
                     enableReinitialize={true}   
                     initialValues={state.formData}      
                     onSubmit={handleSubmit}
                     validationSchema= {eventsFormSchema}>  
            <Form>    
                <div className="form-group" id="events-form-group">
                    <label htmlFor="name"> Name </label>
                        <Field className="col-12" type="text" name="name"/>
                        <ErrorMessage name="name" component="div" className="has-error" id="events-error"/>
                </div>                 
                <div className="form-group" id="events-form-group">            
                    <label htmlFor="shortDescription" className="col-md-6"> Short Description </label>
                        <Field className="col-12 events-input" type="text" name="shortDescription"/>
                        <ErrorMessage name="shortDescription" component="div" className="has-error" id="events-error"/>
                </div>
                        
                <div className="form-group" id="events-form-group">
                    <label htmlFor="summary"> Summary </label>
                        <Field type="text" className="col-12" name="description"/>
                        <ErrorMessage name="summary" component="div" className="has-error" id="events-error"/>
                </div>
                <div className="form-group" id="events-form-group">     
                    <label htmlFor="eventTypeId"> Event Type </label>
                        <Field as="select" className="col-12" name="eventTypeId" > 
                        <option value="">Select</option>     
                       { eventTypelookupData.eventTypeMapped}
                       </Field>
                        <ErrorMessage name="eventTypeId" component="div" className="has-error" id="events-error"/>                         
                </div>
                <div className="form-group" id="events-form-group">     
                    <label htmlFor="eventStatusId"> Event Status </label>
                        <Field as="select" className="col-12" name="eventStatusId" > 
                        <option value="">Select</option>     
                       { eventStatuslookupData.eventStatusMapped}
                       </Field>
                        <ErrorMessage name="eventStatusId" component="div" className="has-error" id="events-error"/>                         
                </div>
                <div className="form-group" id="events-form-group">
                    <label htmlFor="venueId"> Venue Id </label>
                        <Field type="text" className="col-12" id="events-input" name="venueId"/>
                        <ErrorMessage name="venueId" component="div" className="has-error" id="events-error"/>
                </div>
                <div className="form-group" id="events-form-group">
                    <label htmlFor="imageId"> Image </label>
                        <Field type="text" className="col-12" id="events-input" name="imageId"/>
                        <ErrorMessage name="imageId" component="div" className="has-error" id="events-error"/>
                </div>
                <div className="form-group" id="events-form-group">
                    <label htmlFor="externalSiteUrl"> External Site Url </label>
                        <Field type="text" className="col-12" id="events-input" name="externalSiteUrl"/>
                        <ErrorMessage name="externalSiteUrl" component="div" className="has-error" id="events-error"/>
                </div>
                <div className="form-group" id="events-form-group">
                    <label htmlFor="isFree"> Free Event </label>
                        <Field type="text" className="col-12" id="events-input" name="isFree"/>
                        <ErrorMessage name="isFree" component="div" className="has-error" id="events-error"/>
                </div>
                <div className="form-group" id="events-form-group">
                    <label htmlFor="dateStart"> Start Date </label>
                        <Field type="text" className="col-12" id="events-input" name="dateStart"/>
                        <ErrorMessage name="dateStart" component="div" className="has-error" id="events-error"/>
                </div>
                <div className="form-group" id="events-form-group">
                    <label htmlFor="dateEnd"> End Date </label>
                        <Field type="text" className="col-12" id="events-input" name="dateEnd"/>
                        <ErrorMessage name="dateEnd" component="div" className="has-error" id="events-error"/>
                </div>
                <div className="buttons-container" id="events-btn-container">
                    <button type="submit" className="btn" id="events-btns">
                        Submit            
                </button>             
                </div>    
            </Form>
           </Formik>
                </div>
            </div>
        </div>
             
        </>
    )    
}   

EventsForm.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string
    })
}

export default EventsForm