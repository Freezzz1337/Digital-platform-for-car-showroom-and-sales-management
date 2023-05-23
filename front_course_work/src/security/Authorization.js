import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const src = "http://localhost:80/auth/login"

function Authorization({onUserRoleChange}) {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const jsonData = {};

        formData.forEach((value, key) => {
            jsonData[key] = value;
        });
        axios.post(src, JSON.stringify(jsonData), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data);
                onUserRoleChange(response.data);
                localStorage.setItem('userRole', response.data);
                navigate('/')
            })
            .catch(error => {
                console.error('Error submitting form:', error);
            });
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6} className="mt-5">
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center">Форма аутентифікації</Card.Title>
                            <Form onSubmit={handleSubmit}>

                                <Form.Group controlId="formUsername">
                                    <Form.Label>Логін</Form.Label>
                                    <Form.Control type="text" name="username" placeholder="Введіть ваш логін"/>
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                    <Form.Label>Пароль</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Введіть ваш пароль"/>
                                </Form.Group>
                                <br/>
                                <Button type="submit" className="btn btn-primary btn-block">Увійти</Button>

                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Authorization;



