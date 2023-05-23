import CardCar from "./CardCar";
import {Container, Row} from "react-bootstrap";


function Home() {

    return (
        <div className="album py-5">
            <Container>
                <Row xs={1} sm={2} md={3} className="g-3">
                    <CardCar/>
                </Row>
            </Container>
        </div>
    );
}

export default Home;