<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import type { IUser } from '~/types/users.type'

const editMode = ref(false)
const user = ref<IUser>({
  id: '',
  username: '',
  email: '',
  birthdate: '',
  role: '',
  profilePicture: '',
  bannerPicture: '',
  createdAt: '',
})
const profilePicture = ref<File>()
const banner = ref<File>()
const loading = ref(true)
const currentUser = useAuth().user

onMounted(async () => {
  if (currentUser.value?.uid) {
    const usr = await useFirestore().getUser(currentUser.value?.uid ?? '')
    user.value = usr
    await getPictures()
    loading.value = false
  }
})

watch(currentUser, async (newUser) => {
  if (newUser?.uid) {
    const usr = await useFirestore().getUser(newUser?.uid ?? '')
    user.value = usr
  }
})

const editUser = async () => {
  if (profilePicture.value) {
    useFirestore().addProfilePicture(user.value.id ?? '', profilePicture.value)
  }
  if (banner.value) {
    useFirestore().addBannerPicture(user.value.id ?? '', banner.value)
  }
  await useFirestore().updateUser(user.value, user.value.id ?? '')
  editMode.value = false
}

const handleProfilePicture = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    profilePicture.value = file
  }
}

const handleBanner = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    banner.value = file
  }
}

const getPictures = async () => {
  const profile = await useStorage().getProfilePicture(user.value.id ?? '')
  const banner = await useStorage().getBannerPicture(user.value.id ?? '')
  user.value.profilePicture = profile
  user.value.bannerPicture = banner
}
</script>

<template>
  <main id="profile">
    <h1>My Profile</h1>

    <section v-if="loading">
      <p>Loading...</p>
    </section>
    <section v-else>
      <main v-if="editMode">
        <div>
          <label for="profilePicture">Profile Picture</label>
          <img :src="user.profilePicture" :alt="user.username" />
          <input type="file" @change="handleProfilePicture" />
        </div>
        <div>
          <label for="banner">Banner Picture</label>
          <img :src="user.bannerPicture" :alt="user.username" />
          <input type="file" @change="handleBanner" />
        </div>
        <div>
          <label for="username">Username</label>
          <input
            v-model="user.username"
            type="text"
            id="username"
            :disabled="!editMode"
          />
        </div>
        <div>
          <label for="email">Email</label>
          <input
            v-model="user.email"
            type="email"
            id="email"
            :disabled="!editMode"
          />
        </div>
        <div>
          <label for="birthdate">Birthdate</label>
          <input
            v-model="user.birthdate"
            type="date"
            id="birthdate"
            :disabled="!editMode"
          />
        </div>
        <div>
          <label for="role">Role</label>
          <select v-model="user.role" id="role" :disabled="!editMode">
            <option value="client">Client</option>
            <option value="seller">Seller</option>
          </select>
        </div>
        <button @click="editUser">Save</button>
      </main>
      <main v-else>
        <header>
          <img :src="user.bannerPicture" :alt="user.username" />
          <img :src="user.profilePicture" :alt="user.username" />
          <h2>{{ user.username }}</h2>
          <p>{{ user.email }}</p>
          <p>{{ user.birthdate }}</p>
          <p>{{ user.role }}</p>
        </header>
      </main>
    </section>

    <button @click="editMode = !editMode">
      {{ editMode ? 'Save' : 'Edit' }}
    </button>
    <DebugInfo
      message="Le profile ne s'affiche pas parce que l'utilisateur n'a pas de photo de profile. Je n'ai pas le temps de finir l'app entièrement - Launay Ethan"
    />
  </main>
</template>

<style lang="scss" scoped>
#profile {
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }

    input {
      margin: 1rem 0;
    }
  }
}
</style>
