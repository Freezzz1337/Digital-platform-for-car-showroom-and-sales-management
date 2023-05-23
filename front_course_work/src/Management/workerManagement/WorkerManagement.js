import {Button, Container, Modal, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

const src = "http://localhost:80/management/worker";
function WorkerManagement() {
    const [worker, setWorker] = useState([]);
    const [positions, setPositions] = useState([]);
    const [selectedWorkerId, setSelectedWorkerId] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:80/position").then(response => {
            setPositions(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get(src).then(response => {
            setWorker(response.data);
        });
    }, []);

    const handleClose = () => {
        setSelectedWorkerId(null);
    };

    const handleShow = workerId => {
        setSelectedWorkerId(workerId);
    };

    const handleDelete = id => {
        axios
            .delete(src + `/delete/${id}`)
            .then(response => {
                console.log("Item deleted:", response.data);
                window.location.reload();
            })
            .catch(error => {
                console.error("Error deleting item:", error);
            });
    };

    return (
        <Container>
            <h1>Список Працівників:</h1>

            <Table striped bordered hover>
                <thead>
                <th>ID</th>
                <th>Ім'я</th>
                <th>Логін</th>
                <th>Пароль</th>
                <th>Посада</th>
                <th>Редагувати</th>
                </thead>
                <tbody>
                {worker.map(worker => (
                    <tr key={worker.id}>
                        <td>{worker.id}</td>
                        <td>{worker.name}</td>
                        <td>{worker.login}</td>
                        <td>{worker.password}</td>
                        <td>{positions.find(position => position.id === worker.position.id)?.name}</td>
                        <td>
                            <Link className="btn btn-primary" to={`/management/worker/edit/${worker.id}`} align="center">
                                Редагувати
                            </Link>
                        </td>
                        <td>
                            <Button variant="danger" onClick={() => handleShow(worker.id)}>
                                Видалити
                            </Button>
                        </td>
                        <Modal show={selectedWorkerId === worker.id} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Видалити елемент</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Ви дійсно хочете видалити працівника с id={worker.id}?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="danger" onClick={() => handleDelete(worker.id)}>
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

            <Link className="btn btn-primary col-12" to="/management/worker/add">
                Додати нового працівника
            </Link>
        </Container>
    );
}

export default WorkerManagement;