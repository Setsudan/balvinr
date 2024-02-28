import {
  getAuth,
  type User,
  onAuthStateChanged,
  type UserCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'
import { setDoc, doc, getFirestore, getDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, uploadBytes } from 'firebase/storage'
import { ref as fbref } from 'firebase/storage'
import type { IUser } from '~/types/users.type'

export default function useAuth() {
  useFirebase()
  const auth = getAuth()
  const user = ref<User | null>(auth.currentUser)
  const firestore = getFirestore()

  onAuthStateChanged(auth, (u) => {
    user.value = u
  })

  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      return { ...userCredential }
    } catch (error: any) {
      return error.message
    }
  }

  const register = async (
    user: IUser,
    password: string
  ): Promise<UserCredential | Error> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        password
      )
      useUserStore().setUser(userCredential.user)
      useFirestore().createUser(user, userCredential.user.uid)
      return userCredential
    } catch (error) {
      return error as Error
    }
  }

  const signOut = async () => {
    await auth.signOut()
  }

  const isLoggedIn = () => {
    return user.value !== null
  }

  const addProfilePicture = async (file: File) => {
    const currentUser = auth.currentUser
    if (currentUser) {
      const storage = getStorage()
      const storageRef = fbref(storage, `profile-pictures/${currentUser.uid}`)
      await uploadBytes(storageRef, file)
    }
  }

  const getProfilePicture = async (uid: string) => {
    // Check if the file exists
    const storage = getStorage()
    const storageRef = fbref(storage, `profile-pictures/${uid}`)
    try {
      const url = await getDownloadURL(storageRef)
      return url
    } catch (error: any) {
       return null
    }
  }

  const getUserNameById = async (uid: string) => {
    const userRef = doc(firestore, 'users', uid)
    const userSnap = await getDoc(userRef)
    if (userSnap.exists()) {
      return userSnap.data().username
    } else {
      return null
    }
  }

  return {
    user,
    register,
    signIn,
    signOut,
    isLoggedIn,
    addProfilePicture,
    getProfilePicture,
  }
}
