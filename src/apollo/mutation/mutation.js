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
  mutation signup (
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

export const CREATE_ANSWERED_QUESTION = gql`
  mutation createAnsweredQuestion($quizId: ID!, $questionId: ID!)  {
    createAnsweredQuestion(input: { 
      quizId: $quizId, questionId: $questionId
     }) {
          answeredQuestion {
            id
            updatable
            createdAt
          }
          question {
            id
            description
            points
            answers {
              id
              value
            }
          }
        }
  }
`;

export const UPDATE_ANSWERED_QUESTION = gql`
  mutation updateAnsweredQuestion($answerId: ID!, $answeredQuestionId: ID!)  {
    updateAnsweredQuestion(input: { 
      answerId: $answerId, answeredQuestionId: $answeredQuestionId
     }) {
          answeredQuestion {
            id
            updatable
            createdAt
          }
        }
  }
`;
