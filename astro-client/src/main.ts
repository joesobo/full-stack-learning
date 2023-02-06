import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
} from '@apollo/client/core'
import { provideApolloClient } from '@vue/apollo-composable'
import type { App } from 'vue'

export default (app: App) => {
	const apolloClient = new ApolloClient({
		cache: new InMemoryCache({
			addTypename: false,
		}),
		link: createHttpLink({
			uri: 'http://localhost:4000/graphql',
		}),
	})

	provideApolloClient(apolloClient)
}
