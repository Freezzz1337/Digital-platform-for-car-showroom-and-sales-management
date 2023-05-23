import {useParams} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import {Col, Container, Image, Row} from "react-bootstrap";

function CarDescription() {
    const {carId} = useParams();
    const src = "http://localhost:80/car/carDetails/" + carId;

    const [car, setCar] = useState([]);

    useEffect(() => {
        axios
            .get(src)
            .then(response => {
                setCar(response.data);
            });
    }, []);

    return (

        <Container>
            <Row>
                <Col xs={12} lg={6}>
                    <Row>
                        <Col>
                            <Image className="w-100 open" src={`data:image/png;base64,${car.picture}`}/>
                        </Col>
                    </Row>
                </Col>

                <Col xs={12} lg={6}>
                    <Row>
                        <Col xs={12} align="center">
                            <hr className="divider"/>
                            <p>{car.name}</p>
                            <hr className="divider"/>
                        </Col>

                        <Col xs={4}>
                            Пробіг(тис.км):
                        </Col>
                        <Col xs={8}>
                            <p>{car.mileage}</p>
                        </Col>

                        <Col xs={4}>
                            Двигун:
                        </Col>
                        <Col xs={8}>
                            <p>{car.engine}</p>
                        </Col>

                        <Col xs={4}>
                            Ціна($):
                        </Col>
                        <Col xs={8}>
                            <p>{car.price}</p>
                        </Col>

                        <Col xs={4}>
                            Колір:
                        </Col>
                        <Col xs={8}>
                            <p>{car.color}</p>
                        </Col>

                        <Col xs={4}>
                            Паливо:
                        </Col>
                        <Col xs={8}>
                            <p>{car.fuel}</p>
                        </Col>

                        <Col xs={4}>
                            Комплектація:
                        </Col>
                        <Col xs={8}>
                            <p>{car.equipment}</p>
                        </Col>

                        <Col xs={4}>
                            Дата:
                        </Col>
                        <Col xs={8}>
                            <p>{car.dateOfManufacture}</p>
                        </Col>
                    </Row>
                </Col>

                <Col>
                    <Row>
                        <Col xs={12}>
                            <br/>
                            Опис:
                        </Col>
                        <Col xs={12}>
                            <p>{car.description}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default CarDescription;