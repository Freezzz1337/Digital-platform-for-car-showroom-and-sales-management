import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import {Button, Container, Modal, Table} from "react-bootstrap";


const src = "http://localhost:80/management/car";

function CarManagement() {

    const [car, setCar] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [selectedCarId, setSelectedCarId] = useState(null);

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

    const handleClose = () => {
        setSelectedCarId(null);
    };
    const handleShow = (carId) => {
        setSelectedCarId(carId);
    };
    const handleDelete = (id) => {

        axios.delete(src + `/delete/${id}`)
            .then(response => {
                console.log('Item deleted:', response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error deleting item:', error);
            });

    };

    return (

        <Container>
            <h1>Список Автомобілів:</h1>

            <Table striped bordered hover>

                <thead>
                <tr>
                    <th>Id</th>
                    <th>Назва</th>
                    <th>Колір</th>
                    <th>Паливо</th>
                    <th>Комплектація</th>
                    <th>Ціна</th>
                    <th>Пробіг</th>
                    <th>Двигун</th>
                    <th>Дата</th>
                    <th>Постачальник</th>
                    <th>Редагувати</th>
                    <th>Видалити</th>
                </tr>
                </thead>
                <tbody>
                {car.map((car) => (
                    <tr key={car.id}>
                        <td>{car.id}</td>
                        <td>{car.name}</td>
                        <td>{car.color}</td>
                        <td>{car.fuel}</td>
                        <td>{car.equipment}</td>
                        <td>{car.price}</td>
                        <td>{car.mileage}</td>
                        <td>{car.engine}</td>
                        <td>{car.dateOfManufacture}</td>
                        <td>  {suppliers.find(supplier => supplier.id === car.supplier.id)?.name}</td>
                        <td>
                            <Link to={`/management/car/edit/${car.id}`}>
                                <a>Редагувати</a>
                            </Link>
                        </td>
                        <td>
                            <Button variant="danger" onClick={() => handleShow(car.id)}>
                                Видалити
                            </Button>
                        </td>
                        <Modal show={selectedCarId === car.id} onHide={handleClose} centered >
                                <Modal.Header closeButton>
                                    <Modal.Title>Видалити елемент</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Ви дійсно хочете видалити елемент с id={car.id}?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="danger" onClick={() => handleDelete(car.id)}>
                                        Видалити
                                    </Button>
                                    <Button variant="primary" onClick={handleClose}>
                                        Скасувати
                                    </Button>
                                </Modal.Footer>
                        </Modal>
                    </tr>
                ))}
                </tbody>
            </Table>

            <Link className="btn btn-primary col-12" to="/management/car/add">
                Додати нове авто
            </Link>
        </Container>
    );
}

export default CarManagement;