<template>
    <div id="app">
        <Navbar @navigate-to="handleNavigation" />
        <Header :currentRole="currentRole" @update-role="updateRole" @toggle-sidebar="toggleSidebar"
            :isSidebarVisible="isSidebarVisible" />
        <div class="app-content">
            <Sidebar :currentRole="currentRole" :isSidebarVisible="isSidebarVisible" @showComponent="navigateTo" />
            <div class="main-content" :class="{ expanded: isSidebarVisible }">
                <component :is="currentView" :currentComponent="currentComponent" v-if="currentRole === 'admin'"
                    @add-user="handleAddUser" @edit-user="handleEditUser" @delete-user="handleDeleteUser"
                    @add-item="handleAddItem" />
                <component :is="currentView" v-else :currentComponent="currentComponent" />
            </div>
        </div>
        <div class="main-content">
            <div v-if="currentPage === 'user'">
                <UserComponent />
                @@ -15,46 +46,100 @@
            </div>
        </div>
    </div>
</template>

<script>
import Navbar from './components/MyNavbar.vue'
import UserComponent from './components/UserList.vue'
import ItemComponent from './components/admin/item/ItemList.vue'
import TransactionComponent from './components/MyTransaction.vue'
import Header from './components/dashboard/MyHeader.vue'
import Sidebar from './components/dashboard/SideBar.vue'
import AdminView from './views/AdminView.vue'
import UserView from './views/UserView.vue'
import { EventBus } from './utils/EventBus'
export default {
    components: {
        Navbar,
        UserComponent,
        ItemComponent,
        TransactionComponent,
        Header,
        Sidebar,
        AdminView,
        UserView,
    },
    data() {
        const params = new URLSearchParams(window.location.search)
        return {
            currentPage: 'user',
            currentRole: params.get('role') || 'admin',
            currentComponent: params.get('component') || 'items',
            isSidebarVisible: params.get('sidebar') !== 'hidden',
        }
    },
    computed: {
        currentView() {
            return this.currentRole === 'admin' ? AdminView : UserView
        },
    },
    methods: {
        handleNavigation(page) {
            this.currentPage = page
        },
        updateRole(role) {
            this.currentRole = role
            this.navigateTo('items')
        },
        navigateTo(component) {
            this.currentComponent = component
            this.updateURLParams()
        },
        toggleSidebar() {
            this.isSidebarVisible = !this.isSidebarVisible
            this.updateURLParams()
        },
        updateURLParams() {
            const params = new URLSearchParams()
            params.set('role', this.currentRole)
            params.set('component', this.currentComponent)
            params.set('sidebar', this.isSidebarVisible ? 'visible' : 'hidden')
            window.history.replaceState(
                {},
                '',
                `${window.location.pathname}?${params}`
            )
        },
        handleSearch(newQuery) {
            console.log('Search term:', newQuery)
            if (this.currentRole === 'admin') {
                console.log('Search in admin items')
            } else if (this.currentRole === 'user') {
                console.log('Search in user items')
            }
        },
    },
    mounted() {
        EventBus.on('search', this.handleSearch)
    },
    beforeUnmount() {
        EventBus.off('search', this.handleSearch)
    },
}

</script>



<style scoped>
#app {
    /* Aturan untuk #app jika ada */
    font-family: Avenir, Helvetica, Arial, sans-serif;
    display: flex;
    flex-direction: column;
    font: 1em sans-serif;
    height: 100vh;
    margin-top: 60px;
}

.app-content {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    display: flex;
    flex-direction: column;
    font: 1em sans-serif;
    height: 100vh;
    margin-top: 60px;
}

.main-content {
    flex: 1;
    padding: 20px;
    background-color: #ffffff;
    flex-grow: 1;
    transition: margin-left 0.3s ease;
}

.main-content.expanded {
    margin-left: 200px;
}

@media (max-width: 768px) {
    .main-content {
        margin-left: 0;
    }
}
</style>
