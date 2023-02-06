import cors from 'cors'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'

import { schema } from './schema/todoSchema'

const app: express.Application = express()
const port = process.env.PORT || 4000

app.use(cors())

app.use(express.json())

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: process.env.NODE_ENV === 'development',
	})
)

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})
