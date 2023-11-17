import { CardHeader, Container, Card, CardBody, FormGroup, Form, Label, Input, Button, Row, Col} from "reactstrap";
import Base from '../components/Base';
const Login=() => {
    return (

        <Base>
            <Container>
                <Row className="mt-4">
                    <Col sm={{size:6, offset:3}}>
                    <Card color="Dark" outline>
                    <CardHeader>
                        <h3>Login Here !!</h3>
                    </CardHeader>
                    <CardBody>
                        {/*Creating Form*/}
                        <Form>
                            {/* {Email Field} */}
                            <FormGroup>
                                <Label for="password">Enter email</Label>
                                <Input
                                 type="email"
                                 placeholder="Enter your email"
                                 id="email"
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
                            <Container className="textCentre">
                                <Button color="dark">Login</Button>
                                <Button color="secondary" className="ms-2" type="reset">Reset  </Button>
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

export default Login;