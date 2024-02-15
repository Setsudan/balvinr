import { update } from "firebase/database";
import useFirebase from "./useFirebase";
import { getFirestore } from "firebase/firestore";
import { getStorage, uploadBytes, getDownloadURL } from "firebase/storage";
import {
    getDocs,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    collection,
} from "firebase/firestore";
import type { ICreateProduct, IProduct } from "~/types/product.type";

export default function useProduct() {
    useFirebase();

    const db = getFirestore();
    const storage = getStorage();

    // Get products
    const getProducts = async () => {
        const querySnapshot = await getDocs(collection(db, "products"));
        const products: IProduct[] = [];
        querySnapshot.forEach((doc) => {
            products.push({ ...doc.data(), id: doc.id } as IProduct);
        });
        return products;
    };

    // Get product
    const getProduct = async (id: string) => {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    };

    const createProduct = async (product: ICreateProduct) => {
        const docRef = await addDoc(collection(db, "products"), product);
        return docRef.id;
    }

    const updateProduct = async (id: string, product: IProduct) => {
        const docRef = doc(db, "products", id);
        await updateDoc(docRef, { ...product });
    }

    const deleteProduct = async (id: string) => {
        const docRef = doc(db, "products", id);
        await deleteDoc(docRef);
    }

    return { getProducts, getProduct, createProduct, updateProduct, deleteProduct };
}