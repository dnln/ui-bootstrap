import React from "react";
import { Container, Row, Col } from "react-grid-system";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { path } from "ramda";
import useReactRouter from "use-react-router";

import { Box } from "./shared/Box";
import { Header } from "./shared/Header";
import Input from "./shared/Input";
import Button from "./shared/Button";
import { FormWrapper } from "./shared/FormWrapper";

interface Values {
  email: string;
  password: string;
  confirmPassword: string;
}

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Required")
    .email("Please enter a valid email"),
  password: Yup.string()
    .required("Required")
    .min(8, "Your password must be at least 8 characters"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  )
});

const SIGN_UP = gql`
  mutation signUp($email: String!, $password: String) {
    signUp(email: $email, password: $password) {
      error
      jwt
      user {
        name
      }
    }
  }
`;

const GET_USER = gql`
  {
    user {
      name
    }
  }
`;

const SignUp: React.FC = () => {
  const { history } = useReactRouter();
  const [signUp, { data: signUpResponse }] = useMutation(SIGN_UP, {
    update: async (
      store: any,
      {
        data: {
          signUp: { error, user }
        }
      }: any
    ) => {
      if (!error) {
        store.writeQuery({
          query: GET_USER,
          data: { user: user }
        });
      }
    }
  });

  // store JWT in local storage
  // TODO: JWT shouldn't be store in local storage
  React.useEffect(() => {
    if (path(["signUp", "jwt"], signUpResponse)) {
      localStorage.setItem("auth-token", signUpResponse.signUp.jwt);
      history.push("/dashboard");
    }
  }, [signUpResponse]);

  return (
    <Container>
      <Row justify="center">
        <Col lg={6} md={10} sm={12}>
          <Box>
            {/* TODO: Does there need to be another Container here? */}
            <Row>
              <Col>
                <Header>Sign up</Header>
                {path(["signUp", "error"], signUpResponse) ? (
                  <>Error signing up. Please try again later.</>
                ) : null}
              </Col>
            </Row>
            <Row>
              <Col>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                    confirmPassword: ""
                  }}
                  onSubmit={(values: Values) =>
                    signUp({
                      variables: {
                        email: values.email,
                        password: values.password
                      }
                    })
                  }
                  validationSchema={ValidationSchema}
                  render={({
                    setFieldValue,
                    values,
                    errors,
                    touched
                  }: FormikProps<Values>) => (
                    <Form>
                      <FormWrapper>
                        <Input
                          label="Email"
                          required={true}
                          type="email"
                          placeholder="Email"
                          name={"email"}
                          value={values["email"]}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setFieldValue("email", event.target.value);
                          }}
                          error={touched.email && errors.email}
                        />

                        <Input
                          label="Password"
                          required={true}
                          type="password"
                          placeholder="Password"
                          name={"password"}
                          value={values["password"]}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setFieldValue("password", event.target.value);
                          }}
                          error={touched.password && errors.password}
                        />

                        <Input
                          label="Confirm password"
                          required={true}
                          type="password"
                          placeholder="First name"
                          name={"confirmPassword"}
                          value={values["confirmPassword"]}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            setFieldValue(
                              "confirmPassword",
                              event.target.value
                            );
                          }}
                          error={
                            touched.confirmPassword && errors.confirmPassword
                          }
                        />
                      </FormWrapper>

                      <Button type="submit">Sign Up</Button>
                    </Form>
                  )}
                />
              </Col>
            </Row>
          </Box>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
