import { collection, doc, getFirestore, setDoc, where } from 'firebase/firestore'
import useFirebase from "./useFirebase";
import { type IUser } from "~/types/users.type";
import { addDoc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import type { ICreateProduct, IProduct } from '~/types/product.type';
export default function useFirestore() {
    useFirebase();
    const db = getFirestore();

    const createUser = async (user: IUser, id: string) => {
        try {
            await setDoc(doc(collection(db, "users"), id), {
                uid: id,
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

    const updateUser = async (user: IUser, id: string) => {
        const userRef = doc(db, "users", id);
        await updateDoc(userRef, {
            email: user.email,
            username: user.username,
            role: user.role,
            birthdate: user.birthdate,
            updatedAt: new Date(),
        });
    }

    const addProfilePicture = async (id: string, file: File) => {
        const userRef = doc(db, "users", id);
        const storageRef = doc(db, `profile-pictures/${id}`);
        await updateDoc(userRef, {
            profilePicture: storageRef,
        });
    }

    const addBannerPicture = async (id: string, file: File) => {
        const userRef = doc(db, "users", id);
        const storageRef = doc(db, `banner-pictures/${id}`);
        await updateDoc(userRef, {
            bannerPicture: storageRef,
        });
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

    const createProduct = async (product: ICreateProduct): Promise<string> => {
        try {
            const docRef = await addDoc(collection(db, "products"), {
                title: product.title,
                description: product.description,
                price: product.price,
                image: '',
                seller: product.seller,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            return docRef.id;
        } catch (error) {
            console.error("Error adding document: ", error);
            return '';
        }
    }

    const getProduct = async (id: string): Promise<IProduct> => {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data() as IProduct;
        } else {
            console.log("No such document!");
            return {} as IProduct;
        }
    }

    const getProducts = async (): Promise<IProduct[]> => {
        const querySnapshot = await getDocs(collection(db, "products"));
        let products: IProduct[] = [];
        querySnapshot.forEach((doc) => {
            products.push(doc.data() as IProduct);
        });
        return products;
    }

    const updateProduct = async (product: IProduct, id: string) => {
        const productRef = doc(db, "products", id);
        await updateDoc(productRef, {
            title: product.title,
            description: product.description,
            price: product.price,
            updatedAt: new Date(),
        });
    }

    const addImageToProduct = async (id: string, file: File) => {
        const productRef = doc(db, "products", id);
        const storageRef = doc(db, `product-images/${id}`);
        await updateDoc(productRef, {
            image: storageRef,
        });
    }

    return { createUser, getUser, getUsers, updateUser, addProfilePicture, addBannerPicture, createProduct, getProduct, getProducts, updateProduct, addImageToProduct }
}