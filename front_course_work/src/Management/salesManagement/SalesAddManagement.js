import {Button, Container, Form, Modal} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";

function SalesAddManagement() {
    const addSalesSrc = "http://localhost:80/management/addSales"
    const getWorkerSrc = "http://localhost:80/management/worker"
    const getCarSrc = "http://localhost:80/management/car"

    const [workers, setWorkers] = useState([]);
    const [cars, setCars] = useState([]);
    const [show, setShow] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(getWorkerSrc)
            .then(response => {
                setWorkers(response.data);
            });
    }, []);

    useEffect(() => {
        axios
            .get(getCarSrc)
            .then(response => {
                setCars(response.data);
            });
    }, []);


    const handleCarChange = (event) => {
        const car = cars.find(c => c.id === parseInt(event.target.value));
        if (car) {
            event.target.form.price.value = car.price;
        }
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleShow = () => {
        setShow(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);
        const jsonData = {};

        formData.forEach((value, key) => {
            if (key === 'car' || key === 'worker') {
                jsonData[key] = parseInt(value);
            } else if (key === 'price') {
                jsonData[key] = parseFloat(value);
            } else {
                jsonData[key] = value;
            }
        });

        try {
            const response = await axios.post(addSalesSrc, jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
            navigate('/management/sales');
            handleClose();
        } catch (error) {
            console.error('Error submitting form:', error);
        }


    };


    return (
        <Container>
            <h1>Підтвердження покупки:</h1>
            <Form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="car">
                    <Form.Label>Авто:</Form.Label>
                    <Form.Control as="select" type="number" name="car" placeholder="Авто" onChange={handleCarChange}>
                        {cars.map(car => (
                            <option key={car.id} value={car.id}>{car.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="worker">
                    <Form.Label>Працівник:</Form.Label>
                    <Form.Control as="select" type="number" name="worker" placeholder="Працівника">
                        {workers.map(worker => (
                            <option key={worker.id} value={worker.id}>{worker.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Підтвердження платежу</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Підтвердети платіж?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Скасувати
                        </Button>
                        <Button variant="primary" type="button" onSubmit={handleSubmit}>
                            Підтвердити
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Form.Group className="mb-3" controlId="price">
                    <Form.Label>Ціна:</Form.Label>
                    <Form.Control type="text" name="price" placeholder="Ціна"/>
                </Form.Group>

                <Button onClick={handleShow}>Додати в базу</Button>
            </Form>
        </Container>
    );
}

export default SalesAddManagement;