import { collection, doc, getFirestore, where } from 'firebase/firestore'
import useFirebase from "./useFirebase";
import { type IUser } from "~/types/users.type";
import { addDoc, getDoc, getDocs,query } from "firebase/firestore";

export default function useFirestore() {
    useFirebase();
    const db = getFirestore();

    const createUser = async (user: IUser, id: string) => {
        try {
            await addDoc(collection(db, "users"), {
                id: id,
                email: user.email,
                username: user.username,
                role: user.role,
                birthdate: user.birthdate,
                createdAt: new Date(),
                updatedAt: new Date(),
                profilePicture: '',
                bannerPicture: '',
            });
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    const getUser = async (id: string) => {
        // we need to find a doc where the key id is equal to the id we are looking for
        const q = query(collection(db, "users"), where("id", "==", id));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs[0].data() as IUser;
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
