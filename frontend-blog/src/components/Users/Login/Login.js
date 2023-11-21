import React from 'react'
import { CardHeader, Container, Card, CardBody, FormGroup, Form, Label, Input, Button, Row, Col} from "reactstrap"; 



const Login= () => {



    
  return (
    <Container>
                <Row className="mt-4">
                    <Col sm={{size:6, offset:3}}>
                    <Card color="Dark" outline>
                    <CardHeader>
                        <h3>
                        Login To Continue
                        </h3>
                        
                    </CardHeader>
                    <CardBody>
                    
                        <Form>

                            {/* {User Name Field} */}
                            <FormGroup>
                                <Label for="name"><i class="fa-regular fa-user"></i>Enter Your Name</Label>
                                <Input
                                 type="text"
                                 placeholder="User Name"
                                 id="name"
                                />                                
                            </FormGroup>



                            {/* {Password Field} */}
                            <FormGroup>
                                <Label for="password">Enter Password</Label>
                                <Input
                                 type="password"
                                 placeholder="Enter your password"
                                 id="password"
                                />                                
                            </FormGroup>


                            
                            <Container className="text-centre">
                                <Button color="dark" type="submit">Login</Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>

                    </Col>
                </Row>
            </Container>
  )
}

export default Login;