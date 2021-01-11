import React from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase, { db } from '../Firebase';

class Create extends React.Component {

    //登録ボタンが押されたら
    handleOnSubmit = (values) => {
        const docId = db.collection("users").doc().id;
        db.collection("users").doc(docId).set({
            docId: docId,
            name: values.name,
            email: values.email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        //登録後、Topに移動
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="container">
                <h3 className="text-center my-5">新規作成</h3>
                <div className="text-right my-3"><Link to="/">一覧へ戻る</Link></div>
                <Formik
                    initialValues={{ name: '', email: '' }}
                    onSubmit={values => this.handleOnSubmit(values)}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required('氏名は必須です。'),
                        email: Yup.string().email('emailの形式ではありません。').required('Emailは必須です。'),
                    })}
                >
                    {
                        ({ handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="name">氏名</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={Boolean(touched.name && errors.name)}
                                    />
                                    <FormFeedback>
                                        {errors.name}
                                    </FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email</Label>
                                    <Input
                                        type="email"
                                        email="email"
                                        id="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        invalid={Boolean(touched.email && errors.email)}
                                    />
                                    <FormFeedback>
                                        {errors.email}
                                    </FormFeedback>
                                </FormGroup>
                                <Button type="submit">登録</Button>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        );
    }
}

export default Create;