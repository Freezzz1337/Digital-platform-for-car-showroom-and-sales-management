import {Container, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function SupplierManagement() {

    const src = "http://localhost:80/management/supplier";
    const [supplier, setSupplier] = useState([]);

    useEffect(() => {
        axios
            .get(src)
            .then(response => {
                setSupplier(response.data);
            });
    }, []);

    return (
        <Container>
            <h1>Список постачальників:</h1>

            <Table striped bordered hover>
                <thead>
                        <th >№</th>
                        <th>Назва</th>
                        <th >Управління</th>
                </thead>

                <tbody>
                {supplier.map((supplier) => (
                    <tr key={supplier.id}>
                        <td>
                            <p>{supplier.id}</p>
                        </td>
                        <td>
                            <p>{supplier.name}</p>
                        </td>
                        <td>
                            <Link to={`/management/supplier/edit/${supplier.id}`} className="btn btn-primary"
                                  align="center">
                                Редагувати
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>

            </Table>
            <Link className="btn btn-primary col-12" to="/management/supplier/add">Додати нового постачальника</Link>
        </Container>
    );
}

export default SupplierManagement;