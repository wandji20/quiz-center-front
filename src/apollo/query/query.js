/* eslint-disable */
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

// export const QUESTION = gql`
//   query {
//     Question($id: ID) {
//       question(id: $id) {
//         id
//         points
//         description
//         answers {
//           id
//           value
//         }
//       }
//     }
//   } 
// `;
