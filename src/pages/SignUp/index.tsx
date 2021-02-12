import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.svg';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background, AnimationContainer } from './styles';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    const handleSubmit = useCallback(
        async (data: SignUpFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome is required'),
                    email: Yup.string()
                        .required('Email is required')
                        .email('Email is required'),
                    password: Yup.string().min(6, 'min 6 characters'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.post('/users', data);
                history.push('/');

                addToast({
                    type: 'success',
                    title: 'Signup Successful!',
                    description: 'You can login in GoBarber',
                });
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);

                    return;
                }
                addToast({
                    type: 'error',
                    title: 'Error to signup ',
                    description: 'Something wrong when to signup, try again!',
                });
            }
        },
        [addToast, history],
    );

    return (
        <Container>
            <Background />
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Subscribe</h1>
                        <Input name="name" icon={FiUser} placeholder="Name" />
                        <Input
                            name="email"
                            icon={FiMail}
                            placeholder="E-mail"
                        />
                        <Input
                            name="password"
                            icon={FiLock}
                            type="password"
                            placeholder="Login"
                        />
                        <Button type="submit"> Create account </Button>
                    </Form>

                    <Link to="/">
                        <FiArrowLeft />
                        Back to Log in
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    );
};

export default SignUp;
