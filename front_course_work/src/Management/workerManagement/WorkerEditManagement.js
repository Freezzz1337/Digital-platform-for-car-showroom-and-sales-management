import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import axios from "axios";
import WorkerValidator from "../../util/WorkerValidator";

function WorkerEditManagement() {
    const {workerId} = useParams();
    const src = "http://localhost:80/management/worker/edit/" + workerId;
    const navigate = useNavigate();
    const [worker, setWorker] = useState({});
    const [positions, setPositions] = useState([]);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios
            .get(src)
            .then(response => {
                setWorker(response.data);
                console.log(response.data)
            });
    }, []);


    useEffect(() => {
        axios
            .get("http://localhost:80/position")
            .then(response => {
                setPositions(response.data);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();


        const data = {
            name: worker.name,
            login: worker.login,
            password: worker.password,
            position: worker.position.id

        };
        const validationErrors = WorkerValidator(data);
        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await axios.patch(src, data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                navigate('/management/worker');
            } catch (error) {
                console.error(error);
            }
        } else {
            setErrors(validationErrors);
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setWorker((prevWorker) => ({
            ...prevWorker,
            [name]: name === 'position' ? {...prevWorker.position, id: parseInt(value)} : value
        }));
    };

    return (
        <Container className="mt-5 mb-5">
            <h1>Редагування працівника:</h1>
            <hr className="divider"/>
            <Form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Ім'я:</Form.Label>
                    <Form.Control type="text" onChange={handleChange} name="name" value={worker.name} placeholder="Ім'я"
                                  className={errors.name ? 'is-invalid' : ''}/>
                    {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="login">
                    <Form.Label>Логін:</Form.Label>
                    <Form.Control type="text" name="login" onChange={handleChange} value={worker.login}
                                  placeholder="Логін"
                                  className={errors.login ? 'is-invalid' : ''}/>
                    {errors.login && <Form.Control.Feedback type="invalid">{errors.login}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Пароль:</Form.Label>
                    <Form.Control type="text" name="password" onChange={handleChange} value={worker.password}
                                  placeholder="Пароль"
                                  className={errors.password ? 'is-invalid' : ''}/>
                    {errors.password && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="position">
                    <Form.Label>Посада:</Form.Label>
                    <Form.Control as="select" name="position" onChange={handleChange}
                                  value={worker.position ? worker.position.id : ''} className="form-control">
                        {positions.map(position => (
                            <option key={position.id} value={position.id}>{position.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Button type="submit" className="btn btn-success">Додати в базу</Button>
            </Form>
        </Container>
    );
}

export default WorkerEditManagement;