import {
  gql,
} from '@apollo/client';

export const PAYLOAD = gql`
  query {
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
`;

export const RESULT = gql`
  query {
    result {
      quizId
      attempted
      score
    }
  }
`;
