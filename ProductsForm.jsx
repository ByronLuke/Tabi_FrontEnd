import { Formik, Form, Field ,ErrorMessage} from "formik";
import { useNavigate } from "react-router-dom";
import React, {useState, useEffect } from "react"
import debug from "sabio-debug";
import './productsform.css'; 
import productsFormSchema from "./ProductsSchema";
import toastr from "toastr";
import lookUpService from "services/lookUpService";
import { mapLookUpItem } from "helpers/utils";
import productsService from "services/productsService";


function ProductsForm(){

const [lookupData, setLookupData] = useState([]);

    useEffect(()=>{
        lookUpService.LookUp(["ProductTypes"]).then(onLookUpSuccess).catch(onLookUpError)
    },[]
    )

    const onLookUpSuccess = (response) =>{
            _logger(response.item.productTypes, "LookUp success")
            setLookupData(response.item.productTypes)
        }
    
    const onLookUpError = (error) =>{
        _logger(error, "LookUp Error")
    }

    const _logger = debug.extend("ProductsForm");      

    const navigate = useNavigate();

    const [state] =useState({
        formData: {  
            SKU: "",     
            name: "",      
            description:"",     
            productTypeId:"",               
            venueId:"",     
            isVisible:true,                                      
            isActive: true,           
            primaryImageId:"",                 
        }
    })

    const handleSubmit = (values, {resetForm}) =>{
        toastr.success("Producted added!")
        _logger("Values:", values);
        resetForm();   
        productsService.addProduct(values).then(onSuccessAdd).catch(onErrorAdd)
    } 

    const onSuccessAdd = (response) =>{
        toastr.success("Added!")
        _logger(response, "Product Added")
    }

    const onErrorAdd = (error) =>{
        toastr.success("Whoops!")
        _logger(error, "Something went wrong")
    }

    const cancelBtn =() =>{
        _logger("Form Cancelled");
        toastr.error("Operation canceled")
        navigate('/')
    }
    
    return (
   
        <>
        <div className="card" id="products-card">
        <div className="card-title" id="products-header">
            <h1> Add a Product </h1>
        </div>
            <div className="row">
                <div className="col-md-12">
                     <Formik 
                     enableReinitialize={true}   
                     initialValues={state.formData}      
                     onSubmit={handleSubmit}
                     validationSchema={productsFormSchema}>  
            <Form>                    
                <div className="form-group" id="products-form-group">            
                    <label htmlFor="SKU" className="col-md-6"> Stock-Keeping Unit </label>
                        <Field className="col-12 products-input" type="text" name="SKU"/>
                        <ErrorMessage name="SKU" component="div" className="has-error" id="products-error"/>
                </div>
                <div className="form-group" id="products-form-group">
                    <label htmlFor="name"> Name </label>
                        <Field className="col-12" type="text" name="name"/>
                        <ErrorMessage name="name" component="div" className="has-error" id="products-error"/>
                </div>         
                <div className="form-group" id="products-form-group">
                    <label htmlFor="description"> Description of product </label>
                        <Field type="text" className="col-12" name="description"/>
                        <ErrorMessage name="description" component="div" className="has-error" id="products-error"/>
                </div>
                <div className="form-group" id="products-form-group">     
                    <label htmlFor="productTypeId"> Product </label>
                        <Field as="select" className="col-12" name="productTypeId" > 
                        <option value="">Select</option>     
                       {lookupData.map(mapLookUpItem)}
                       </Field>
                        <ErrorMessage name="productTypeId" component="div" className="has-error" id="products-error"/>                         
                </div>
                <div className="form-group" id="products-form-group">
                    <label htmlFor="venueId"> Venue Id </label>
                        <Field type="text" className="col-12" name="venueId"/>
                        <ErrorMessage name="venueId" component="div" className="has-error" id="products-error"/>
                </div>
                <div className="form-group" id="products-form-group">
                    <label htmlFor="primaryImageId"> Product Image Url </label>
                        <Field type="text" className="col-12" id="products-input" name="primaryImageId"/>
                        <ErrorMessage name="primaryImageId" component="div" className="has-error" id="products-error"/>
                </div>
                <div className="buttons-container" id="products-btn-container">
                    <button type="submit" className="btn" id="products-btns">
                        Submit            
                </button>
                <button type="button" className="btn" id="products-btns" onClick={cancelBtn}>    
                        Cancel           
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

export default ProductsForm;