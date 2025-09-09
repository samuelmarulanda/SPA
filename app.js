const { createApp, ref, computed, onMounted } = Vue;
const { createVuetify } = Vuetify;

const vuetify = createVuetify();

createApp({
  setup() {
    const users = ref([]);
    const searchTerm = ref('');
    const selectedUser = ref(null);
    const modalVisible = ref(false);

    const filteredUsers = computed(() =>
      users.value.filter(u =>
        u.name.toLowerCase().includes(searchTerm.value.toLowerCase())
      )
    );

    const openModal = user => {
      selectedUser.value = user;
      modalVisible.value = true;
    };

    const closeModal = () => {
      modalVisible.value = false;
      selectedUser.value = null;
    };

    onMounted(async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      users.value = await res.json();
    });

    return {
      users,
      searchTerm,
      filteredUsers,
      selectedUser,
      modalVisible,
      openModal,
      closeModal
    };
  }
}).use(vuetify).mount('#app');

