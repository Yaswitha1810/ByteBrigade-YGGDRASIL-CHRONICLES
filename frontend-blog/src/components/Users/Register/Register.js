//import React from 'react'
import { CardHeader, Container, Card, CardBody, FormGroup, Form, Label, Input, Button, Row, Col} from "reactstrap"; 
import { useFormik } from "formik";
import * as Yup from "yup";


//Form Schema
const formSchema =Yup.object({
    userName: Yup.string().required("User name is required"),
    email: Yup.string().required("Email name is required"),
    password: Yup.string().required("Password name is required"),
})

const Register = () => {

    //formik
    const formik = useFormik({
        initialValues: {
            userName: "",
            email: "",
            password: "",
        },
        onSubmit: values => {
            console.log(values);  
        },
        validationSchema: formSchema,
    });

    
  return (
    <Container>
                <Row className="mt-4">
                    <Col sm={{size:6, offset:3}}>
                    <Card color="Dark" outline>
                    <CardHeader>
                        <h3>
                        Fill Information to Register
                        </h3>
                        
                    </CardHeader>
                    <CardBody>
                    
                        <Form onSubmit={formik.handleSubmit}>

                            {/* {User Name Field} */}
                            <FormGroup>
                                <Label for="name"><i class="fa-regular fa-user"></i>Enter Your Name</Label>
                                <Input
                                 value={formik.values.userName}
                                 onChange={formik.handleChange("userName")}
                                 onBlur={formik.handleBlur("userName")}
                                 type="text"
                                 placeholder="User Name"
                                 id="name"
                                />                                
                            </FormGroup>
                            {/* {Error message} */}
                            <div className="mb-2" style={{color:'red'}}>
                                {formik.touched.userName && formik.errors.userName}
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
                            </FormGroup>
                            {/* {Error message} */}
                            <div className="mb-2" style={{color:'red'}}>
                                {formik.touched.password && formik.errors.password}
                            </div>


                            
                            <Container className="text-centre">
                                <Button color="dark" type="submit">Register</Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>

                    </Col>
                </Row>
            </Container>
  )
}

export default Register