import {Button, Container, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect, useState} from "react";
import WorkerValidator from '../../util/WorkerValidator';

function WorkerAddManagement() {

    const src = "http://localhost:80/management/worker/add"
    const navigate = useNavigate();
    const [positions, setPositions] = useState([]);

    const [errors, setErrors] = useState({});


    useEffect(() => {
        axios
            .get("http://localhost:80/position")
            .then(response => {
                setPositions(response.data);
            });
    }, []);
    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const jsonData = {};

        formData.forEach((value, key) => {
            if (key === 'position') {
                jsonData[key] = parseInt(value);
            } else {
                jsonData[key] = value;
            }
        });

        const validationErrors = WorkerValidator(jsonData);
        if (Object.keys(validationErrors).length === 0) {

            axios.post(src, jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response.data);
                    navigate('/management/worker');
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                });
        } else {
            setErrors(validationErrors);
        }
    };



    return (
        <Container className="mt-5 mb-5">
            <h1>Додавання новго працівника:</h1>
            <hr className="divider"/>
            <Form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label className="fs-5">Ім'я:</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Ім'я"
                        className={errors.name ? 'is-invalid' : ''}/>
                    {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="login">
                    <Form.Label className="fs-5">Логін:</Form.Label>
                    <Form.Control type="text" name="login" placeholder="Логін"
                        className={errors.login ? 'is-invalid' : ''}/>
                    {errors.login && <Form.Control.Feedback type="invalid">{errors.login}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="fs-5">Пароль:</Form.Label>
                    <Form.Control type="text" name="password" placeholder="Пароль"
                        className={errors.password ? 'is-invalid' : ''}/>
                    {errors.password && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>}
                </Form.Group>

                <Form.Group className="mb-3" controlId="position">
                    <Form.Label>Посада:</Form.Label>
                    <Form.Control as="select" name="position" className="form-select">
                        {positions.map(position => (
                            <option key={position.id} value={position.id}>{position.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Button type="submit" className="btn btn-success">Додати в базу</Button>
            </Form>
        </Container>
    );
}

export default WorkerAddManagement;


// import {Button, Container, Form} from "react-bootstrap";
// import {useNavigate} from "react-router-dom";
// import axios from "axios";
// import {useEffect, useState} from "react";
//
// function WorkerAddManagement() {
//
//     const src = "http://localhost:80/management/worker/add"
//     const navigate = useNavigate();
//     const [positions, setPositions] = useState([]);
//
//     const [errors, setErrors] = useState({});
//
//
//     useEffect(() => {
//         axios
//             .get("http://localhost:80/position")
//             .then(response => {
//                 setPositions(response.data);
//             });
//     }, []);
//     const handleSubmit = (event) => {
//         event.preventDefault();
//
//         const formData = new FormData(event.target);
//         const jsonData = {};
//
//         formData.forEach((value, key) => {
//             if (key === 'position') {
//                 jsonData[key] = parseInt(value);
//             } else {
//                 jsonData[key] = value;
//             }
//         });
//
//         const validationErrors = validateForm(jsonData);
//         setErrors(validationErrors);
//
//         if (Object.keys(validationErrors).length === 0) {
//
//             axios.post(src, jsonData, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             })
//                 .then(response => {
//                     console.log(response.data);
//                     navigate('/management/worker');
//                 })
//                 .catch(error => {
//                     console.error('Error submitting form:', error);
//                 });
//         }
//     };
//
//
//     const validateForm = (formData) => {
//         const errors = {};
//
//         if (!formData.name) {
//             errors.name = 'Поле "Ім\'я" не повинне бути порожнім';
//         }
//
//         if (!formData.login) {
//             errors.login = 'Поле "Логін"  не повинне бути порожнім';
//         }
//
//         if (!formData.password) {
//             errors.password = 'Поле "Пароль" не повинне бути порожнім';
//         }else if (formData.password.length < 8){
//             errors.password = 'Пароль повинен містити не меьше 8ми символів'
//         }
//
//         return errors;
//     };
//
//     return (
//         <Container className="mt-5 mb-5">
//             <h1>Додавання новго працівника:</h1>
//             <hr className="divider"/>
//             <Form method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3" controlId="name">
//                     <Form.Label className="fs-5">Ім'я:</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="name"
//                         placeholder="Ім'я"
//                         className={errors.name ? 'is-invalid' : ''}
//                     />
//                     {errors.name && <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>}
//                 </Form.Group>
//
//                 <Form.Group className="mb-3" controlId="login">
//                     <Form.Label className="fs-5">Логін:</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="login"
//                         placeholder="Логін"
//                         className={errors.login ? 'is-invalid' : ''}
//                     />
//                     {errors.login && <Form.Control.Feedback type="invalid">{errors.login}</Form.Control.Feedback>}
//                 </Form.Group>
//
//                 <Form.Group className="mb-3" controlId="password">
//                     <Form.Label className="fs-5">Пароль:</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="password"
//                         placeholder="Пароль"
//                         className={errors.password ? 'is-invalid' : ''}
//                     />
//                     {errors.password && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>}
//                 </Form.Group>
//
//                 <Form.Group className="mb-3" controlId="position">
//                     <Form.Label>Посада:</Form.Label>
//                     <Form.Control as="select" name="position" className="form-select">
//                         {positions.map(position => (
//                             <option key={position.id} value={position.id}>{position.name}</option>
//                         ))}
//                     </Form.Control>
//                 </Form.Group>
//
//                 <Button type="submit" className="btn btn-success">Додати в базу</Button>
//             </Form>
//         </Container>
//     );
// }
//
// export default WorkerAddManagement;