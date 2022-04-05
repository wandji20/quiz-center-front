/* eslint-disable */
import {
  gql,
} from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    createAuthentication(input: { email: $email, password: $password }) {
      token
      user {
        username
        gravatarUrl
      }
      quizzes {
        id
        title
        questionIds
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation (
    $username: String!, 
    $email: String!, 
    $password: String!, 
    $passwordConfirmation: String!
  ) {
      createAuthentication(
        username: $username,
        email: $email, 
        password: $password
        passwordConfirmation: $passwordConfirmation
      ) {
          token
          user {
            username
            gravatarUrl
          }
          quizzes {
            id
            title
            questionIds
          }
      }
  }
`;
