// src/components/Register.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { useCartContext } from '../context/cart_context';



const Register = () => {
    const navigate = useNavigate();
    const { setAuthentication } = useCartContext();

    //validation schema for formik
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().required('Password is required'),
        name: Yup.string().required('Name is required'),
    });

    //handle from submission
    const handleSubmit = (values) => {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(user => user.email === values.email)) {
            toast.error('User already exists');
        } else {
            users.push(values);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('authUser', JSON.stringify(values));
            toast.success('Account created successfully!');
            setAuthentication(true);
            navigate('/');
        }
    };

    return (
        <Wrapper>
            <ModalContent>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        name: ""
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    >
                        {({ values, setFieldValue, errors, touched }) => (
                                <Form>
                                    <div>
                                        <h3>Registration Form</h3>

                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                            value={values.name}
                                            onChange={(e) => setFieldValue("name", e.target.value)}
                                        />
                                        {touched.name && errors.name && (
                                            <div>{errors.name}</div>
                                        )}

                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            value={values.email}
                                            onChange={(e) => setFieldValue("email", e.target.value)}
                                        />
                                        {touched.email && errors.email && (
                                            <div>{errors.email}</div>
                                        )}

                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            value={values.password}
                                            onChange={(e) => setFieldValue("password", e.target.value)}
                                        />
                                        {touched.password && errors.password && (
                                            <div>{errors.password}</div>
                                        )}

                                        <button type="submit">Register</button>
                                        
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </ModalContent>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    padding-top: 40px;

`;
    

const ModalContent = styled.div`
        background-color: #f4f1f9 ;
        margin: 5% auto;
        padding: 20px;
        border: 1px solid #ddd;
        width: 300px;
        /*max-width: 400px;*/
        border-radius: 8px;
        box-shadow: 0  0 10px  rgba(0, 0, 0, 0.1);
        animation: fadeIn 0.3s ease-out;
        
    form {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 20px;
    }
   
    h3{
        margin-bottom: 20px;
        text-align: center;
        font-size: 25px;
        
    }

    input {
        padding: 13px;
        width: 100%;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
        transition: border-color 0.3s ease;
    }

    input:focus {
        border-color: #007BFF; /* Highlight border on focus */
        outline: none;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.25);
    }

    button {
        padding: 1.4rem 2.4rem;
        margin-left: 65px;
        border: none;
        background-color: rgb(98 84 243);
        color: rgb(255 255 255);
        border: none;
        text-transform: uppercase;
        text-align: center;
        cursor: pointer;
        font-size: 14px;
        transition: all 0.3s ease;
        max-width: auto;  
           
        &:hover {
            box-shadow: 0 2rem 2rem 0 rgb(132 144 255 / 30%);
            box-shadow: ${({ theme }) => theme.colors.shadowSupport};
            transform: scale(0.96);
    }


    div {
        margin-top: 5px 0;
        color: red;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
    
export default Register;
