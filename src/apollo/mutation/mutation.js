export const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    createAuthentication(email: $email, password: $password) {
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
    $passwordConfirmation
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
