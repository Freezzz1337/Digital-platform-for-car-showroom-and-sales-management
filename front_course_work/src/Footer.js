import React from "react";
import {Container} from "react-bootstrap";

function Footer() {
    return (
        <footer className="text-muted py-5">
            <Container>
                <p className="float-end mb-1">
                    <a href="#">Back to top</a>
                </p>
                <p className="mb-1">© Усі права захищені</p>
            </Container>
        </footer>
    );
}

export default Footer;