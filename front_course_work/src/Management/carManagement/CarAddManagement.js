import {Button, Container, Form} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import CarValidator from '../../util/CarValidator';

function CarAddManagement() {
    const src = "http://localhost:80/management/car/add"
    const navigate = useNavigate();
    const [suppliers, setSuppliers] = useState([]);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios
            .get("http://localhost:80/management/supplier")
            .then(response => {
                setSuppliers(response.data);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const newCar = {};

        formData.forEach((value, key) => {
            if (key === 'picture') {
                const file = event.target.picture.files[0];
                const reader = new FileReader();
                reader.onloadend = function () {
                    newCar[key] = reader.result;
                    sendDataToServer();
                };
                reader.readAsDataURL(file);
            } else {
                newCar[key] = value;
            }
        });


        const sendDataToServer = async () => {

            const validationErrors = CarValidator(newCar);
            if (Object.keys(validationErrors).length === 0) {

                try {
                    const response = await axios.post(src, JSON.stringify(newCar), {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    navigate('/management/car');
                } catch (error) {
                    console.error(error);
                }

            } else {
                setErrors(validationErrors);
            }

        };

    };

    return (
        <Container className="mt-5 mb-5">
            <h1 >Додавання новго авто:</h1>
            <hr className="divider"/>
            <Form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label className="fs-5">Назва:</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Назва"
                                  className={errors.name ? 'is-invalid' : ''}/>
                    {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="supplier">
                    <Form.Label className="fs-5">Постачальник:</Form.Label>
                    <Form.Control as="select" name="supplier">
                        {suppliers.map(supplier => (
                            <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="color">
                    <Form.Label className="fs-5">Колір авто:</Form.Label>
                    <Form.Control type="text" name="color" placeholder="Колір машини"
                                  className={errors.color ? 'is-invalid' : ''}/>
                    {errors.color && <Form.Control.Feedback type="invalid">{errors.color}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="mileage">
                    <Form.Label className="fs-5">Пробіг:</Form.Label>
                    <Form.Control type="text" name="mileage" placeholder="Пробіг"
                                  className={errors.mileage ? 'is-invalid' : ''}/>
                    {errors.mileage && <Form.Control.Feedback type="invalid">{errors.mileage}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="fuel">
                    <Form.Label className="fs-5">Паливо:</Form.Label>
                    <Form.Control type="text" name="fuel" placeholder="Паливо"
                                  className={errors.fuel ? 'is-invalid' : ''}/>
                    {errors.fuel && <Form.Control.Feedback type="invalid">{errors.fuel}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="engine">
                    <Form.Label className="fs-5">Об'єм двигуна:</Form.Label>
                    <Form.Control type="text" name="engine" placeholder="Об'єм двигуна"
                                  className={errors.engine ? 'is-invalid' : ''}/>
                    {errors.engine && <Form.Control.Feedback type="invalid">{errors.engine}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label className="fs-5">Ціна:</Form.Label>
                    <Form.Control type="text" name="price" placeholder="Ціна"
                                  className={errors.price ? 'is-invalid' : ''}/>
                    {errors.price && <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="equipment">
                    <Form.Label className="fs-5">Комплектація:</Form.Label>
                    <Form.Control type="text" name="equipment" placeholder="Комплектація"
                                  className={errors.equipment ? 'is-invalid' : ''}/>
                    {errors.equipment &&
                        <Form.Control.Feedback type="invalid">{errors.equipment}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="dateOfManufacture">
                    <Form.Label className="fs-5">Дата:</Form.Label>
                    <Form.Control type="date" name="dateOfManufacture" placeholder="Дата"
                                  className={errors.dateOfManufacture ? 'is-invalid' : ''}/>
                    {errors.dateOfManufacture &&
                        <Form.Control.Feedback type="invalid">{errors.dateOfManufacture}</Form.Control.Feedback>}
                </Form.Group>


                <Form.Group className="mb-3" controlId="picture">
                    <Form.Label className="fs-5">Фото:</Form.Label>
                    <Form.Control type="file" name="picture" placeholder="Фото"/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label className="fs-5">Опис:</Form.Label>
                    <textarea type="text" className={'form-control ' + (errors.dateOfManufacture ? 'is-invalid' : '')}
                              name="description" placeholder="Опис"
                    ></textarea>
                    {errors.description &&
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>}
                </Form.Group>

                <Button type="submit" className="btn btn-success">Додати в
                    базу
                </Button>
            </Form>
        </Container>
    );
}

export default CarAddManagement;