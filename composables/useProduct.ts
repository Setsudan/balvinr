import {
  collection,
  doc,
  getFirestore,
  setDoc,
  where,
} from 'firebase/firestore'
import useFirebase from './useFirebase'
import { type IUser } from '~/types/users.type'
import { addDoc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore'
import type { ICreateProduct, IProduct } from '~/types/product.type'

export default function useProduct() {
  useFirebase()
  const db = getFirestore()

  const getProduct = async (id: string) => {
    const docRef = doc(db, 'products', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      return null
    }
  }

  const getProducts = async () => {
    const productsCollection = collection(db, 'products')
    const productsSnapshot = await getDocs(productsCollection)
    const products = productsSnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })
    return products
  }

  const getProductBySellerId = async (sellerId: string) => {
    const q = query(collection(db, 'products'), where('seller', '==', sellerId))
    const querySnapshot = await getDocs(q)
    const products = querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      }
    })
    return products
  }

  return {
    getProduct,
    getProducts,
    getProductBySellerId,
  }
}
