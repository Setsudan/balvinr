import { getAuth, type User } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, uploadBytes } from "firebase/storage";
import { ref as fbref } from "firebase/storage";

export default function useStorage() {
    useFirebase()
    const auth = getAuth();
    const user = ref<User | null>(auth.currentUser);
    const firestore = getFirestore();

    const addProfilePicture = async (file: File) => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const storage = getStorage();
            const storageRef = fbref(storage, `profile-pictures/${currentUser.uid}`);
            await uploadBytes(storageRef, file);
        }
    }

    const getProfilePicture = async (uid: string) => {
        const storageRef = fbref(getStorage(), `profile-pictures/${uid}`);
        const url = await getDownloadURL(storageRef);
        return url;
    }

    const uploadImage = async (file: File) => {
        const storage = getStorage();
        const storageRef = fbref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
    }

    const getImageUrl = async (imageName: string) => {
        const storageRef = fbref(getStorage(), `images/${imageName}`);
        const url = await getDownloadURL(storageRef);
        return url;
    }

    return { addProfilePicture, getProfilePicture, uploadImage };
}