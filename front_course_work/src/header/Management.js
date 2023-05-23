import {Link} from "react-router-dom";
import {Button, Col, Container, Row} from "react-bootstrap";


function Management({userRole}) {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg={8} md={10}>
                    <h1 className="text-center mb-5">Оберіть один із пунктів</h1>
                    <Row className="gy-3">
                        <Col xs={12} sm={6}>
                            <Link to="/management/car">
                                <Button variant="primary" className="w-100" type="button">
                                    Управління автомобілями
                                </Button>
                            </Link>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Link to="/management/supplier">
                                <Button variant="primary" className="w-100" type="button">
                                    Управління постачальниками
                                </Button>
                            </Link>
                        </Col>
                        {userRole === 'Owner' && (
                            <>
                                <Col xs={12} sm={6}>
                                    <Link to="/management/worker">
                                        <Button variant="primary" className="w-100" type="button">
                                            Управління працівниками
                                        </Button>
                                    </Link>
                                </Col>
                                <Col xs={12} sm={6}>
                                    <Link to="/management/addSales">
                                        <Button variant="primary" className="w-100" type="button">
                                            Створення замовлення
                                        </Button>
                                    </Link>
                                </Col>
                            </>
                        )}

                        {userRole === 'Manager' && (
                            <Col className="col-12">
                                <Link to="/management/addSales">
                                    <Button variant="primary" className="w-100" type="button">
                                        Створення замовлення
                                    </Button>
                                </Link>
                            </Col>
                        )}

                        <Col className="col-12">
                            <Link to="/management/sales">
                                <Button variant="primary" className="w-100" type="button">
                                    Історія покупок
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default Management;



