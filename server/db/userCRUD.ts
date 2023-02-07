import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from 'firebase/auth'

export const getUser = async () => {
	const auth = getAuth()
	const currentUser = auth.currentUser

	if (currentUser) {
		const uid = currentUser.uid
		const email = currentUser.email
		const userName = currentUser.displayName

		return {
			uid,
			email,
			userName,
			status: 200,
		}
	} else {
		return {
			status: 400,
		}
	}
}

export const addUser = async (email: string, password: string) => {
	const auth = getAuth()
	return await createUserWithEmailAndPassword(auth, email, password)
		.then(async () => {
			return {
				message: 'User Registered with Email: ' + email,
				status: 200,
			}
		})
		.catch((error) => {
			return {
				message: error.code,
				status: 400,
			}
		})
}

export const loginUser = async (email: string, password: string) => {
	const auth = getAuth()
	return await signInWithEmailAndPassword(auth, email, password)
		.then(async () => {
			return {
				message: 'User Logged in with Email: ' + email,
				status: 200,
			}
		})
		.catch((error) => {
			return {
				message: error.code,
				status: 400,
			}
		})
}

export const logoutUser = async () => {
	const auth = getAuth()
	return await auth.signOut().then(() => {
		return {
			message: 'User Logged out',
			status: 200,
		}
	})
}
