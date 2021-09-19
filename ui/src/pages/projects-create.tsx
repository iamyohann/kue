import { gql, useQuery } from "@apollo/client";
import {
  EuiButton,
  EuiCallOut,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiTitle,
} from "@elastic/eui";
import React from "react";

const CREATE_PROJECT_MUTATION = gql`
  mutation createProject($Name: String!, $Creator: ID!) {
    createProject(
      input: {
        data: {
          Name: $Name
          Services: []
          Administrators: [$Creator]
          Members: []
        }
      }
    ) {
      project {
        id
      }
    }
  }
`;

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
    }
  }
`;

export default () => {
  let {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useQuery(CURRENT_USER_QUERY);

  return (
    <React.Fragment>
      <EuiTitle size="s">
        <h1>Create a project</h1>
      </EuiTitle>
      <br />
      <EuiForm
        component="form"
        style={{ margin: "1em 0" }}
        onSubmit={(e) => {
          e.preventDefault();

          return false;
        }}
      >
        <EuiFormRow label="Name" helpText="A name to identify your project">
          <EuiFieldText name="name" />
        </EuiFormRow>

        <EuiFormRow label="Disabled through form row" isDisabled>
          <EuiFieldText name="last" />
        </EuiFormRow>
        <EuiButton
          iconType="arrowRight"
          iconSide="right"
          type="submit"
          isLoading={userLoading}
          isDisabled={Boolean(userError) || userLoading}
          color={"success"}
          size="s"
          fill
        >
          Save
        </EuiButton>
      </EuiForm>
      {(userError || !userData.me.id) && (
        <EuiCallOut
          title="Unable to determine user context"
          color="danger"
          iconType="alert"
        >
          <p>{String(userError)}</p>
        </EuiCallOut>
      )}
    </React.Fragment>
  );
};
