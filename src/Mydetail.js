import React from 'react';
import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import firebase, { db } from '../Firebase';

class Detail extends React.Component {

    state = {
        member: { name: '', email: '' }
    }

    //更新ボタンが押されたら
    handleOnSubmit = (values) => {
        db.collection("members").doc(this.props.match.params.uid).update({
            name: values.name,
            email: values.email
        });

        //Topに移動
        this.props.history.push("/");

    }

    //uidで指定したメンバーの値を取得
    getMember = async (uid) => {
        const docRef = db.collection("members").doc(uid);
        const doc = await docRef.get();
        //ドキュメントの存在確認
        if (doc.exists) {
            this.setState({
                member: doc.data(),
            });
        }else{
            //なければ404ページへ
            this.props.history.push("/404");
        }
    }

    //delete
    handleDelete = (uid) => {
        if (window.confirm('削除しますか？')) {
            db.collection("members").doc(uid).delete();
            this.props.history.push("/");
        }
    }

    //値を取得
    componentDidMount = () => {
        this.getMember(this.props.match.params.uid);
    }

    render() {
        return (
            <div className="container">
                <h3 className="text-center my-5">詳細・編集</h3>
                <div className="text-right my-3"><Link to="/">一覧へ戻る</Link></div>
                <Formik
                    enableReinitialize
                    initialValues={{ name: this.state.member.name, email: this.state.member.email }}
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
                                <Button type="submit" color="success">更新</Button>
                            </Form>
                        )
                    }
                </Formik>
                <div className="my-3">
                    <Button color="danger" onClick={() => this.handleDelete(this.props.match.params.uid)}>削除</Button>
                </div>
            </div>
        );
    }
}

export default Detail;