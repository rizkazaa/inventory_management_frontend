<template>
    <div class="item-list container py-4">
        <div class="header d-flex justify-content-between align-items-center mb-3">
            <h2>Daftar Barang</h2>
            <button class="btn btn-primary" @click="showAddForm"> Tambah Item </button>
        </div>
        <div class="item-cards row">
            <ItemCard v-for="item in items" :key="item.kode" :item="item" @edit-item="editItem"
                @delete-item="deleteItem" class="col-md-6 col-lg-4" />
        </div>
        <Modal :visible="showForm" @close="cancelEditForm">
            <ItemForm :item="selectedItem" :isEdit="isEdit" @submit="handleSubmit" @cancel="cancelEditForm" />
        </Modal>
    </div>
</template>

<script>

import { useItemStore } from "@/store/itemStore";

import ItemCard from "@/components/admin/item/itemCard.vue";

import Modal from "@/components/admin/MyModal.vue";

import ItemForm from "@/components/admin/item/ItemForm.vue";

import { EventBus } from "@/utils/EventBus";

export default {

    components: {

        ItemCard,

        Modal,

        ItemForm,

    },

    data() {

        return {

            showForm: false,

            selectedItem: null,

            isEdit: false,

            searchQuery: "",

        };

    },

    computed: {

        items() {

            return this.itemStore.items; // Mengakses state 'items' dari store Pinia

        },

        filteredItems() {

            return this.items.filter((item) => {

                return (

                    item.kode.toLowerCase().includes(this.searchQuery.toLowerCase()) ||

                    item.nama.toLowerCase().includes(this.searchQuery.toLowerCase())

                );

            });

        },

    },

    methods: {

        showAddForm() {

            this.selectedItem = { kode: "", nama: "", deskripsi: "", stok: "" };

            this.isEdit = false;

            this.showForm = true;

        },

        editItem(item) {

            this.selectedItem = { ...item };

            this.isEdit = true;

            this.showForm = true;

        },

        handleSubmit(item) {

            if (

                item.kode &&

                item.nama &&

                item.deskripsi &&

                item.stok !== null &&

                !isNaN(item.stok)

            ) {

                if (this.isEdit) {

                    this.itemStore.updateItem(item); // Memanggil action 'updateItem' dari store

                } else {

                    this.itemStore.addItem(item); // Memanggil action 'addItem' dari store

                }

                this.showForm = false;

            }

        },

        cancelEditForm() {

            this.showForm = false;

        },

        deleteItem(kode) {

            this.itemStore.deleteItem(kode); // Memanggil action 'deleteItem' dari store

        },

        handleSearch(query) {

            this.searchQuery = query;

        },

    },

    mounted() {

        EventBus.on("search", this.handleSearch);

    },

    beforeUnmount() {

        EventBus.off("search", this.handleSearch);

    },

    setup() {

        const itemStore = useItemStore();

        return { itemStore };

    },

};

</script>

<style scoped>
.item-list {
    background-color: white;
    border-radius: 8px;
    margin: auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header h2 {
    color: #4b3f6b;
    font-size: 24px;
}

.header .btn-primary {
    background-color: #4b3f6b;
    border-color: #4b3f6b;
}

.header .btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
}
</style>
