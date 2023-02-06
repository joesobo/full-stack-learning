import { provideApolloClient } from '@vue/apollo-composable'
import type { App } from 'vue'

import { apolloClient } from './utils/apolloClient'

export default (app: App) => {
	provideApolloClient(apolloClient)
}
