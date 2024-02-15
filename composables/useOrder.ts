import useFirebase from "./useFirebase";
import { getFirestore } from "firebase/firestore";
import {
    getDocs,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    collection,
} from "firebase/firestore";

export default function useOrder() {
    useFirebase();

    const db = getFirestore();

    // Get orders
    const getOrders = async () => {
        const orders = [] as any;
        const querySnapshot = await getDocs(collection(db, "orders"));
        querySnapshot.forEach((doc) => {
            orders.push(doc.data());
        });
        return orders;
    };

    // Get order
    const getOrder = async (id: string) => {
        const docRef = doc(db, "orders", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            return null;
        }
    };

    // Add order
    const addOrder = async (data: any) => {
        await addDoc(collection(db, "orders"), data);
    };

    // Update order
    const updateOrder = async (id: string, data: any) => {
        await updateDoc(doc(db, "orders", id), data);
    };

    // Delete order
    const deleteOrder = async (id: string) => {
        await deleteDoc(doc(db, "orders", id));
    };

    return { getOrders, getOrder, addOrder, updateOrder, deleteOrder };
}