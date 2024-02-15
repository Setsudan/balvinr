import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, type UserCredential, onAuthStateChanged } from "firebase/auth";
import type { IUser } from "~/types/users.type";

export default function useAuth() {
    useFirebase();
    const userStore = useUserStore();
    const auth = getAuth();


    onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
            userStore.setUser(firebaseUser);
        } else {
            userStore.clearUser();
        }
    });

    const signIn = async (email: string, password: string): Promise<UserCredential | Error> => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            userStore.setUser(userCredential.user);
            return userCredential;
        } catch (error) {
            return error as Error;
        }
    };

    const signUp = async (user: IUser, password: string): Promise<UserCredential | Error> => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, user.email, password);
            userStore.setUser(userCredential.user);
            useFirestore().createUser(user, userCredential.user.uid);
            return userCredential;
        } catch (error) {
            return error as Error;
        }
    };

    const signOut = async () => {
        await auth.signOut();
        userStore.clearUser();
    };

    const user = ref(auth.currentUser);

    return { signIn, signUp, signOut, user };
}