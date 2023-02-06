import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from '@apollo/client/core'

export const apolloClient = new ApolloClient({
	cache: new InMemoryCache({
		addTypename: false,
	}),
	link: createHttpLink({
		uri: 'http://localhost:4000/graphql',
	}),
})
