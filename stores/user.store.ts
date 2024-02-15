import type { User } from 'firebase/auth';

0
export const useUserStore = defineStore({
  id: 'user',
  persist: true,
  state: () => ({
    user: null as User | null
  }),
  actions: {
    setUser(userData: User | null) {
      this.user = userData;
    },
    clearUser() {
      this.user = null;
    },
    isLoggedIn(): boolean {
      return this.user !== null;
    }
  }
});