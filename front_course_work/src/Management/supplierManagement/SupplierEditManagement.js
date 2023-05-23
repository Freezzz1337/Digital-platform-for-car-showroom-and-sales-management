import {Button, Container, Form, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import SupplierValidator from "../../util/SupplierValidator";

function SupplierEditManagement() {

    const {supplierId} = useParams();
    const src = "http://localhost:80/management/supplier/edit/" + supplierId;
    const navigate = useNavigate();
    const [supplier, setSupplier] = useState({});

    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios
            .get(src)
            .then(response => {
                setSupplier(response.data);
            });
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setSupplier({...supplier, [name]: value});
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = SupplierValidator(supplier);
        if (Object.keys(validationErrors).length === 0) {

            axios.patch(src, supplier)
                .then(response => {
                    console.log(response.data);
                    navigate('/management/supplier')

                })
                .catch(error => {
                    console.error(error);
                });
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <Container className="mt-5 mb-5">
            <h1>Форма редагування постачальника:</h1>
            <hr className="divider"/>
            <Row>
                <Form method="  patch" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label className="fs-5">Назва:</Form.Label>
                        <Form.Control type="text" name="name" value={supplier.name} placeholder="Назва"
                                      onChange={handleChange} className={errors.name ? 'is-invalid' : ''}/>
                        {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
                    </Form.Group>
                    <Button type="submit" className="btn btn-success">Редагувати</Button>
                </Form>
            </Row>
        </Container>
    )
        ;
}


export default SupplierEditManagement;