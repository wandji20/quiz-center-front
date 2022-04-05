import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BASE_URL } from '../utils/constants';
import { getAuthToken } from '../utils/utils';

const createApolloClient = () => {
  const httpLink = createHttpLink({
    uri: BASE_URL,
  });

  const authLink = setContext((_, { headers }) => {
    const token = getAuthToken();
    console.log(token);
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
