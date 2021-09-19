import { gql, useMutation } from "@apollo/client";
import {
  EuiButton,
  EuiFieldPassword,
  EuiFieldText,
  EuiLink,
  EuiPanel,
  EuiTitle,
} from "@elastic/eui";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const LOGIN_MUTATION = gql`
  mutation login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
    }
  }
`;

export default function Login() {
  const [loginUser, { data, loading, error }] = useMutation(
    LOGIN_MUTATION
  );
  const history = useHistory();
  const [identifier, setIdentifier] = React.useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  return (
    <div style={{ maxWidth: "30em", margin: "0 auto" }}>
      <EuiPanel paddingSize="m">
        <EuiTitle size="s">
          <h1>Login</h1>
        </EuiTitle>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await loginUser({
              variables: {
                identifier,
                password,
              },
            })
              .then((res) => {
                const token = res.data.login.jwt;
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
            isLoading={loading}
            isDisabled={loading}
            color={"success"}
            type="submit"
            size="s"
            fill
            // onClick={() => {}}
          >
            Login
          </EuiButton>
        </form>
        <Link to="/register">
          <EuiLink>
            Don't have an account? Register now
          </EuiLink>
        </Link>
      </EuiPanel>
    </div>
  );
}
