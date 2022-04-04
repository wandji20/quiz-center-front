import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import { BASE_URL } from '../utils/constants';
import { getAuthToken } from '../utils/utils';

const createApolloClient = () => {
  const token = getAuthToken();
  return new ApolloClient({
    link: new HttpLink({
      uri: BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
