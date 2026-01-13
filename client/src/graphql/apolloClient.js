import { ApolloClient, InMemoryCache, HttpLink  } from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';

// 1. Создаем HTTP-ссылку для подключения к GraphQL API
// В production используем относительный путь /graphql (проксируется через nginx)
// В development используем прямой URL к серверу
const graphqlUri = import.meta.env.PROD
  ? '/graphql'
  : (import.meta.env.VITE_API_URL || 'http://localhost:4000/graphql');

const httpLink = new HttpLink({
  uri: graphqlUri,
});

// 2. Создаем ссылку для аутентификации с автоматическим добавлением токена
const authLink = new SetContextLink(async (prevContext, operation) => {
  const token = await localStorage.getItem('token')
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
})

// 4. Объединяем ссылки в цепочку: сначала обработка ошибок, затем аутентификация, затем HTTP
const linkChain = authLink.concat(httpLink)

// 5. Создаем клиент Apollo
const client = new ApolloClient({
  link: linkChain,
  cache: new InMemoryCache()
});

export default client;