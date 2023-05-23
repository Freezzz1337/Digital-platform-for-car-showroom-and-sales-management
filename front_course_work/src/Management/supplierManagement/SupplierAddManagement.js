import {Button, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";
import SupplierValidator from "../../util/SupplierValidator";

function SupplierAddManagement() {

    const src = "http://localhost:80/management/supplier/add"
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const jsonData = {};


        formData.forEach((value, key) => {
            jsonData[key] = value;
        });

        const validationErrors = SupplierValidator(jsonData);
        if (Object.keys(validationErrors).length === 0) {

            axios.post(src, JSON.stringify(jsonData), {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response.data);
                    navigate('/management/supplier');
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                });

        } else {
            setErrors(validationErrors);
        }
    };


    return (
        <Container>
            <h1>Додавання новго постачальника:</h1>
            <hr className="divider"/>
            <Form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label className="fs-5">Назва:</Form.Label>
                    <Form.Control type="text" name="name" laceholder="Назва"
                                  className={errors.name ? 'is-invalid' : ''}/>
                    {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
                </Form.Group>
                <Button type="submit" className="btn btn-success">Додати в базу</Button>
            </Form>
        </Container>
    );
}

export default SupplierAddManagement;