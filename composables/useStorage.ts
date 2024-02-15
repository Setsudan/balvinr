import { getDownloadURL, getStorage } from "firebase/storage";
import { ref as fbref } from "firebase/storage";

export default function useStorage() {
    useFirebase();
    const storage = getStorage();

    const getProfilePicture = async (id: string) => {
        const ref = fbref(storage, `profile-pictures/${id}`);
        const url = await getDownloadURL(ref);
        return url;
    }

    const getBannerPicture = async (id: string) => {
        const ref = fbref(storage, `banner-pictures/${id}`);
        const url = await getDownloadURL(ref);
        return url;
    }

    return {
        getProfilePicture,
        getBannerPicture
    }
}