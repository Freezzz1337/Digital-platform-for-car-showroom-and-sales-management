import Logout from "../security/Logout";
import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {CarContext} from "../util/CarContext";
import {useContext} from "react";

function Header({userRole, handleLogout}) {
    const { handleSearch } = useContext(CarContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const searchQuery = e.target.elements.search.value;
        handleSearch(searchQuery);
    };

    return (
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
            <Nav.Link href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
                <svg className="bi me-2" width="40" height="32">
                </svg>
                <span className="fs-4">Choose your dream</span>
            </Nav.Link>

            <Form className="form-inline mt-2 mt-md-0 d-flex align-items-center" onSubmit={handleSubmit}>
                <Form.Control className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" name="search" />
                <Button variant="outline-success" className="my-2 my-sm-0" type="submit">Search</Button>
            </Form>

            <Nav className="nav-pills">
                <Nav.Item>
                    <Nav.Link href="/" aria-current="page">На головну</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/aboutUs">Про нас</Nav.Link>
                </Nav.Item>
                {userRole === "Owner" || userRole === "Manager" ? (
                    <>
                        <Nav.Item>
                            <Nav.Link href="/management">Управління</Nav.Link>
                        </Nav.Item>
                        <Logout handleLogout={handleLogout} />
                    </>
                ) : (
                    <Nav.Item>
                        <Nav.Link href="/auth/login">Log in</Nav.Link>
                    </Nav.Item>
                )}
            </Nav>
        </header>
    );
}

export default Header;
