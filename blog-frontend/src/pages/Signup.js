import { CardHeader, Container, Card, CardBody, FormGroup, Form, Label, Input, Button, Row, Col} from "reactstrap";
import Base from "../components/Base";
import { useFormik } from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import { registerUserAction } from "../redux/slices/users/usersSlices";

//Form Schema
const formSchema = Yup.object({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email name is required"),
    password: Yup.string().required("Password name is required"),
})

const Signup=() => {

    //dispatch
    const dispatch = useDispatch();

    //Formik
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
        },
        onSubmit:(values) =>{
            //dispatch the action
            dispatch(registerUserAction(values))
            console.log(values);
        },
        validationSchema: formSchema,
    });
  
    //select state from store
    const storeData = useSelector(store => store?.users)
    const { appErr, serverErr} = storeData;
    //, registered,loading,


    return (

        <Base>
            <Container>
                <Row className="mt-4">
                    <Col sm={{size:6, offset:3}}>
                    <Card color="Dark" outline>
                    <CardHeader>
                        <h3>
                        Fill Information to register
                        {/* {dispaly error message} */}
                        {appErr || serverErr ? <div style={{color:'red'}}>{serverErr} {appErr}</div> : null}
                        </h3>
                        
                    </CardHeader>
                    <CardBody>
                        {/*Creating Form*/}
                        <Form onSubmit={formik.handleSubmit}>


                            {/* {First Name Field} */}
                            <FormGroup>
                                <Label for="name"><i class="fa-regular fa-user"></i>Enter First Name</Label>
                                <Input
                                 value={formik.values.firstname}
                                 onChange={formik.handleChange("firstname")}
                                 onBlur={formik.handleBlur("firstname")}
                                 type="text"
                                 placeholder="First Name"
                                 id="name"
                                />                                
                            </FormGroup>
                            {/* {Error message} */}
                            <div className="mb-2" style={{color:'red'}}>
                                {formik.touched.firstname && formik.errors.firstname}
                            </div>


                            {/* {Last Name Field} */}
                            <FormGroup>
                                <Label for="name">Enter Last Name</Label>
                                <Input
                                 value={formik.values.lasttname}
                                 onChange={formik.handleChange("lastname")}
                                 onBlur={formik.handleBlur("lastname")}
                                 type="text"
                                 placeholder="Last Name"
                                 id="name"
                                />                                
                            </FormGroup>
                            {/* {Error message} */}
                            <div className="mb-2" style={{color:'red'}}>
                                {formik.touched.lastname && formik.errors.lastname}
                            </div>


                            {/* {Email Field} */}
                            <FormGroup>
                                <Label for="password">Enter email</Label>
                                <Input
                                 value={formik.values.email}
                                 onChange={formik.handleChange("email")}
                                 onBlur={formik.handleBlur("email")}
                                 type="email"
                                 placeholder="Enter your email"
                                 id="email"
                                />                                
                            </FormGroup>
                            {/* {Error message} */}
                            <div className="mb-2" style={{color:'red'}}>
                                {formik.touched.email && formik.errors.email}
                            </div>


                            {/* {Password Field} */}
                            <FormGroup>
                                <Label for="password">Enter Password</Label>
                                <Input
                                 value={formik.values.password}
                                 onChange={formik.handleChange("password")}
                                 onBlur={formik.handleBlur("password")}
                                 type="password"
                                 placeholder="Enter your password"
                                 id="password"
                                />                                
                            </FormGroup>{/* {Error message} */}
                            <div className="mb-2" style={{color:'red'}}>
                                {formik.touched.password && formik.errors.password}
                            </div>


                            
                            <Container className="text-centre">
                            {/* {Check for loading} */}
                                <Button color="dark" disabled>Loading please wait...</Button>
                                <Button color="dark" type="submit">Register</Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>

                    </Col>
                </Row>
            </Container>
            
        </Base>
        
        
    );
};

export default Signup;