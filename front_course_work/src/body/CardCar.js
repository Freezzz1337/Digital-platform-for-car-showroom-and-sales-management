import React, {useContext} from "react";
import styles from "../css/animationForCards.module.css";
import {Link} from "react-router-dom";
import {Button, Card, Col} from "react-bootstrap";
import {CarContext} from "../util/CarContext";


function CardCar() {
    const {car} = useContext(CarContext);

    return (
        <>
            {car.map((car) => {
                return (
                    <div className={styles.blockSelection}>
                        <Col>
                            <Card className="shadow-sm">
                                <Card.Img variant="top" src={`data:image/png;base64,${car.picture}`} height={225}/>
                                <Card.Body>
                                    <Card.Title className="text-center">{car.name}</Card.Title>
                                    <Card.Text>{car.description}</Card.Text>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Link to={`/car/carDetails/${car.id}`}>
                                            <Button variant="outline-dark" size="sm">
                                                Go to description
                                            </Button>
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    </div>
                );
            })}
        </>
    );
}

export default CardCar;
