import { getDownloadURL, getStorage, uploadBytes } from 'firebase/storage'
import { ref as fbref } from 'firebase/storage'

export default function useStorage() {
  useFirebase()
  const storage = getStorage()

  const getProfilePicture = async (id: string) => {
    const ref = fbref(storage, `profile-pictures/${id}`)
    if (!ref) return ''
    const url = await getDownloadURL(ref)
    return url
  }

  const getBannerPicture = async (id: string) => {
    const ref = fbref(storage, `banner-pictures/${id}`)
    if (!ref) return ''
    const url = await getDownloadURL(ref)
    return url
  }

  const addImageToProduct = async (id: string, file: File) => {
    const ref = fbref(storage, `products/${id}`)
    await uploadBytes(ref, file)
  }

  const getProductImage = async (id: string) => {
    const ref = fbref(storage, `products/${id}`)
    const url = await getDownloadURL(ref)
    return url
  }

  return {
    getProfilePicture,
    getBannerPicture,
    addImageToProduct,
    getProductImage,
  }
}
