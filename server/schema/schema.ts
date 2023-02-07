import {
	GraphQLBoolean,
	GraphQLID,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
} from 'graphql'

import {
	addTodo,
	deleteTodo,
	getTodo,
	getTodos,
	updateTodo,
} from '../db/todoCRUD'
import { addUser, loginUser } from '../db/userCRUD'

// Todo Type
const TodoType = new GraphQLObjectType({
	name: 'Todo',
	fields: () => ({
		id: { type: GraphQLID },
		title: { type: GraphQLString },
		description: { type: GraphQLString },
		completed: { type: GraphQLBoolean },
		color: { type: GraphQLString },
	}),
})

// User Type
const UserType = new GraphQLObjectType({
	name: 'User',
	fields: () => ({
		id: { type: GraphQLID },
		email: { type: GraphQLString },
		password: { type: GraphQLString },
		currentUser: { type: GraphQLString },
		status: { type: GraphQLString },
		message: { type: GraphQLString },
	}),
})

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		todosGQL: {
			type: new GraphQLList(TodoType),
			async resolve(parent, args) {
				return await getTodos()
			},
		},
		todoGQL: {
			type: TodoType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return getTodo(args.id)
			},
		},
	},
})

const RootMutations = new GraphQLObjectType({
	name: 'Mutations',
	fields: {
		addTodoGQL: {
			type: TodoType,
			args: {
				title: { type: new GraphQLNonNull(GraphQLString) },
				completed: { type: new GraphQLNonNull(GraphQLBoolean) },
				description: { type: GraphQLString },
				color: { type: GraphQLString },
			},
			resolve(parent, args) {
				return addTodo({
					title: args.title,
					completed: args.completed,
					description: args.description,
					color: args.color,
				})
			},
		},
		updateTodoGQL: {
			type: TodoType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
				title: { type: new GraphQLNonNull(GraphQLString) },
				completed: { type: new GraphQLNonNull(GraphQLBoolean) },
				description: { type: GraphQLString },
				color: { type: GraphQLString },
			},
			resolve(parent, args) {
				return updateTodo(
					{
						title: args.title,
						completed: args.completed,
						description: args.description,
						color: args.color,
					},
					args.id
				)
			},
		},
		deleteTodoGQL: {
			type: TodoType,
			args: {
				id: { type: new GraphQLNonNull(GraphQLID) },
			},
			resolve(parent, args) {
				return deleteTodo(args.id)
			},
		},
		login: {
			type: UserType,
			args: {
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
			},
			async resolve(parent, args) {
				return await loginUser(args.email, args.password)
			},
		},
		register: {
			type: UserType,
			args: {
				email: { type: new GraphQLNonNull(GraphQLString) },
				password: { type: new GraphQLNonNull(GraphQLString) },
			},
			async resolve(parent, args) {
				return await addUser(args.email, args.password)
			},
		},
	},
})

export const schema = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutations,
})
