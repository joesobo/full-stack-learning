import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from 'firebase/auth'

export const addUser = async (email: string, password: string) => {
	const auth = getAuth()
	return await createUserWithEmailAndPassword(auth, email, password)
		.then(async () => {
			const token = await auth.currentUser?.getIdToken()

			return {
				currentUser: JSON.stringify({
					uid: auth.currentUser?.uid,
					email: auth.currentUser?.email,
					userName: auth.currentUser?.providerData[0].displayName,
					token,
				}),
				message: 'User Registered with Email: ' + email,
				status: 200,
			}
		})
		.catch((error) => {
			return {
				currentUser: '',
				message: error.message,
				status: error.code,
			}
		})
}

export const loginUser = async (email: string, password: string) => {
	const auth = getAuth()
	return await signInWithEmailAndPassword(auth, email, password)
		.then(async () => {
			const token = await auth.currentUser?.getIdToken()

			return {
				currentUser: JSON.stringify({
					uid: auth.currentUser?.uid,
					email: auth.currentUser?.email,
					userName: auth.currentUser?.providerData[0].displayName,
					token,
				}),
				message: 'User Logged in with Email: ' + email,
				status: 200,
			}
		})
		.catch((error) => {
			return {
				currentUser: '',
				message: error.message,
				status: error.code,
			}
		})
}
