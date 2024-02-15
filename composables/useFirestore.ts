import { collection, doc, getFirestore } from "firebase/firestore";
import useFirebase from "./useFirebase";
import { type IUser } from "~/types/users.type";
import { addDoc, getDoc, getDocs } from "firebase/firestore";
export default function useFirestore() {
    useFirebase();
    const db = getFirestore();

    const createUser = async (user: IUser, id: string) => {
        try {
            await addDoc(collection(db, "users"), user);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    const getUser = async (id: string) => {
        try {
            const docRef = doc(db, "users", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.error("No such document!");
            }
        }
        catch (error) {
            console.error("Error getting document:", error);
        }
    }

    const getUsers = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "users"));
            let users: IUser[] = [];
            querySnapshot.forEach((doc) => {
                users.push(doc.data() as IUser);
            });
            return users;
        } catch (error) {
            console.error("Error getting documents: ", error);
        }
    }

    return { createUser, getUser, getUsers }
}
