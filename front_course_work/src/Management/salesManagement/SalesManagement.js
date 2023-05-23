import {Col, Container, Row, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";

const srcSales = "http://localhost:80/management/sales"
const srcSum = "http://localhost:80/management/salesSummary"

function SalesManagement() {

    const [sales, setSales] = useState([]);
    const [sum, setSum] = useState([]);

    useEffect(() => {
        axios
            .get(srcSales)
            .then(response => {
                setSales(response.data);
            });
    }, []);

    useEffect(() => {
        axios
            .get(srcSum)
            .then(response => {
                setSum(response.data);
                console.log(response.data)
            });
    }, []);

    return (
        <Container>
            <h1>Історія покупок:</h1>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Назва Авто</th>
                    <th>Ім'я робітника</th>
                    <th>Ціна продажу</th>
                </tr>
                </thead>
                <tbody>
                {sales.map((sales) => (
                <tr key={sales.id}>
                    <td>{sales.id}</td>
                    <td>{sales.car.name}</td>
                    <td>{sales.worker.name}</td>
                    <td>{sales.price}</td>
                </tr>
                    ))}
                </tbody>
            </Table>

            <Row>
                <Col xs={8} sm={7} md={5} lg={4} xl={3}>
                    <h5>Загальна отримана сума:</h5>
                </Col>
                <Col xs={4} sm={5} md={7} lg={8} xl={9}>
                    <h5>{sum.toLocaleString()} $</h5>
                </Col>
            </Row>
        </Container>
    );
}

export default SalesManagement;