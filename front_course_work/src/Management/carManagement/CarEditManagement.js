import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {Button, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import CarValidator from '../../util/CarValidator';

function CarEditManagement() {

    const {carId} = useParams();
    const src = "http://localhost:80/management/car/edit/" + carId;
    const navigate = useNavigate();
    const [car, setCar] = useState({});
    const [suppliers, setSuppliers] = useState([]);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios
            .get(src)
            .then(response => {
                setCar(response.data);
            });
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:80/management/supplier")
            .then(response => {
                setSuppliers(response.data);
            });
    }, []);

    function handleChange(event) {
        const {name} = event.target;

        if (name === "picture") {
            const file = event.target.files[0];
            setCar((prevCar) => ({...prevCar, picture: file}));
        } else {
            const value = event.target.value;
            setCar((prevCar) => ({
                ...prevCar,
                [name]: name === "supplier" ? {id: value !== '' ? parseInt(value) : null} : value,
            }));
        }
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

        let base64data = null;

        if (car.picture && car.picture instanceof File) {
            const blob = new Blob([car.picture], {type: 'image/jpeg'});

            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                base64data = reader.result;
                sendData(base64data);
            };
        } else {
            await sendData(base64data);
        }
    };

    const sendData = async (base64data) => {
        const data = {
            name: car.name,
            supplier: car.supplier.id,
            color: car.color,
            mileage: car.mileage,
            fuel: car.fuel,
            engine: car.engine,
            price: car.price,
            equipment: car.equipment,
            dateOfManufacture: car.dateOfManufacture,
            description: car.description,
            picture: base64data,
        };

        const validationErrors = CarValidator(data);
        if (Object.keys(validationErrors).length === 0) {

            try {
                const response = await axios.patch(src, data, {
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


    return (
        <Container className="mt-5 mb-5" onSubmit={handleSubmit}>
            <h1 >Форма редагування авто:</h1>
            <hr className="divider"/>
            <Form method="post" encType="multipart/form-data">

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label className="fs-5">Назва:</Form.Label>
                    <Form.Control type="text" value={car.name} name="name" placeholder="Назва"
                                  onChange={handleChange} className={errors.name ? 'is-invalid' : ''}/>
                    {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="supplier">
                    <Form.Label className="fs-5">Постачальник:</Form.Label>
                    <Form.Control as="select" name="supplier" onChange={handleChange}
                                  value={car.supplier ? parseInt(car.supplier.id) : ''}>

                        {suppliers.map(supplier => (
                            <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="color">
                    <Form.Label className="fs-5">Колір машини:</Form.Label>
                    <Form.Control type="text" value={car.color} name="color" placeholder="Колір машини"
                                  onChange={handleChange} className={errors.color ? 'is-invalid' : ''}/>
                    {errors.color && <Form.Control.Feedback type="invalid">{errors.color}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="mileage">
                    <Form.Label className="fs-5">Пробіг:</Form.Label>
                    <Form.Control type="text" value={car.mileage} name="mileage" placeholder="Пробіг"
                                  onChange={handleChange} className={errors.mileage ? 'is-invalid' : ''}/>
                    {errors.mileage && <Form.Control.Feedback type="invalid">{errors.mileage}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="fuel">
                    <Form.Label className="fs-5">Паливо:</Form.Label>
                    <Form.Control type="text" value={car.fuel} name="fuel" placeholder="Паливо"
                                  onChange={handleChange} className={errors.fuel ? 'is-invalid' : ''}/>
                    {errors.fuel && <Form.Control.Feedback type="invalid">{errors.fuel}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="engine">
                    <Form.Label className="fs-5">Об'єм двигуна:</Form.Label>
                    <Form.Control type="text" value={car.engine} name="engine"
                                  placeholder="Об'єм двигуна" onChange={handleChange}
                                  className={errors.engine ? 'is-invalid' : ''}/>
                    {errors.engine && <Form.Control.Feedback type="invalid">{errors.engine}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label className="fs-5">Ціна:</Form.Label>
                    <Form.Control type="text" value={car.price} name="price"
                                  placeholder="Ціна" onChange={handleChange}
                                  className={errors.price ? 'is-invalid' : ''}/>
                    {errors.price && <Form.Control.Feedback type="invalid">{errors.price}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="equipment">
                    <Form.Label className="fs-5">Комплектація:</Form.Label>
                    <Form.Control type="text" value={car.equipment} name="equipment"
                                  placeholder="Комплектація" onChange={handleChange}
                                  className={errors.equipment ? 'is-invalid' : ''}/>
                    {errors.equipment &&
                        <Form.Control.Feedback type="invalid">{errors.equipment}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="dateOfManufacture">
                    <Form.Label className="fs-5">Дата:</Form.Label>
                    <Form.Control type="date" value={car.dateOfManufacture}
                                  name="dateOfManufacture" placeholder="Дата"
                                  onChange={handleChange} className={errors.dateOfManufacture ? 'is-invalid' : ''}/>
                    {errors.dateOfManufacture &&
                        <Form.Control.Feedback type="invalid">{errors.dateOfManufacture}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="picture">
                    <Form.Label className="fs-5">Фото:</Form.Label>
                    <Form.Control type="file"
                                  name="picture" placeholder="Фото"
                                  onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                    <Form.Label className="fs-5">Опис:</Form.Label>
                    <textarea type="text" value={car.description}
                              name="description" placeholder="Опис"
                              className={'form-control ' + (errors.dateOfManufacture ? 'is-invalid' : '')}
                              onChange={handleChange}/>
                    {errors.description &&
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>}
                </Form.Group>

                <Button type="submit"
                        className="btn btn-success">Редагувати
                </Button>
            </Form>
        </Container>
    );
}

export default CarEditManagement;