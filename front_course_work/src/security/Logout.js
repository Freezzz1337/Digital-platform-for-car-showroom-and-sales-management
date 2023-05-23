import {Button, Modal} from "react-bootstrap";
import {useState} from "react";

function    Logout({ handleLogout }){
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleLogoutClick = () => {
        handleLogout();
        handleCloseModal();
    };

    return (
        <div>
            <Button variant="link" className="nav-link" onClick={handleShowModal}>
                Logout
            </Button>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Підтвердження виходу</Modal.Title>
                </Modal.Header>
                <Modal.Body>Ви впевенені, що дійсно хочете вийти з акаунта?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Ні
                    </Button>
                    <Button variant="primary" onClick={handleLogoutClick}>
                        Так
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Logout;