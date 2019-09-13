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
}

const ValidationSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required")
});

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String) {
    signIn(email: $email, password: $password) {
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

const SignIn: React.FC = () => {
  const { history } = useReactRouter();
  const [signIn, { data: SignInResponse }] = useMutation(SIGN_IN, {
    update: async (
      store: any,
      {
        data: {
          signIn: { error, user }
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
    if (path(["signIn", "jwt"], SignInResponse)) {
      localStorage.setItem("auth-token", SignInResponse.signIn.jwt);
      history.push("/dashboard");
    }
  }, [SignInResponse]);

  return (
    <Container>
      <Row justify="center">
        <Col lg={6} md={10} sm={12}>
          <Box>
            {/* TODO: Does there need to be another Container here? */}
            <Row>
              <Col>
                <Header>Sign In</Header>
                {path(["signIn", "error"], SignInResponse) ? (
                  <>Error signing up. Please try again later.</>
                ) : null}
              </Col>
            </Row>
            <Row>
              <Col>
                <Formik
                  initialValues={{
                    email: "",
                    password: ""
                  }}
                  onSubmit={(values: Values) =>
                    signIn({
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
                      </FormWrapper>

                      <Button type="submit">Sign In</Button>
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

export default SignIn;
