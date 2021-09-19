import { gql, useMutation } from "@apollo/client";
import {
  EuiButton,
  EuiCallOut,
  EuiFieldPassword,
  EuiFieldText,
  EuiPanel,
  EuiTitle,
} from "@elastic/eui";
import React, { useState } from "react";
import { useHistory } from "react-router";

const REGISTRATION_MUTATION = gql`
  mutation register($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        id
        username
        email
        confirmed
        blocked
        role {
          name
        }
      }
    }
  }
`;

export default function Login() {
  const [registerUser, { data, loading, error }] = useMutation(
    REGISTRATION_MUTATION
  );
  const [identifier, setIdentifier] = React.useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const history = useHistory();

  return (
    <div style={{ maxWidth: "30em", margin: "0 auto" }}>
      <EuiPanel paddingSize="m">
        <EuiTitle size="s">
          <h1>Create an account</h1>
        </EuiTitle>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await registerUser({
              variables: {
                username: identifier,
                email: identifier,
                password,
              },
            })
              .then((res) => {
                const token = res.data.register.jwt;
                localStorage.setItem("token", token);
                history.push("/dashboard");
              })
              .catch(console.error);
            return false;
          }}
          style={{
            margin: "1em",
            display: "grid",
            gridColumn: "1fr",
            gap: "1em 0",
          }}
        >
          <EuiFieldText
            icon="user"
            autoFocus
            name="username"
            placeholder="Email"
            value={identifier || ""}
            onChange={(e) => setIdentifier(e.target.value)}
            aria-label="Email"
          />
          <EuiFieldPassword
            name="password"
            placeholder="Password"
            type="dual"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
          <EuiButton
            iconType="arrowRight"
            iconSide="right"
            type="submit"
            isLoading={loading}
            isDisabled={loading}
            color={"success"}
            size="s"
            fill
          >
            Register
          </EuiButton>
        </form>
        {error && (
          <EuiCallOut
            title="Unable to register user"
            color="danger"
            iconType="alert"
          >
            <p>{String(error)}</p>
          </EuiCallOut>
        )}
        {data && (
          <EuiCallOut
            title="Registration successful!"
            color="success"
            iconType="user"
          >
            <p>
              Your registration has been successful. You will be automatically
              redirected to the dashboard...
            </p>
          </EuiCallOut>
        )}
      </EuiPanel>
    </div>
  );
}
