<template>
    <div>
        <form @submit.prevent="submitForm">
            <table>
                <tr>
                    <td>Kode barang</td>
                    <td><input type="text" v-model="form.kode" id="kode" :disabled="isEdit" required></td>
                </tr>
                <tr>
                    <td>Nama barang</td>
                    <td><input type="text" v-model="form.nama" id="nama" required></td>
                </tr>
                <tr>
                    <td>Deskripsi</td>
                    <td><input type="text" v-model="form.deskripsi" id="deskripsi" required></td>
                </tr>
                <tr>
                    <td>Stok</td>
                    <td><input type="number" v-model="form.stock" id="stock" required></td>
                </tr>
                <tr>
                    <td></td>
                    <td><button type="submit">
                            {{ isEdit ? "Simpan Perubahan" : "Tambah Barang" }}
                        </button>
                    </td>
                </tr>
            </table>
        </form>
    </div>
</template>

<script>

export default {
    props: {
        item: {
            type: Object,

            default: () => ({}),

        },

        isEdit: {

            type: Boolean,

            default: false,

        },

    },
    data() {
        return {
            form: {
                kode: "",
                nama: "",
                deskripsi: "",
                stock: 0,
            },
        };
    },
    watch: {
        item: {
            immediate: true,
            handler(newItem) {
                if (this.isEdit) {
                    this.form = { ...newItem };
                } else {
                    this.form = {
                        kode: "",
                        nama: "",
                        deskripsi: "",
                        stock: 0,
                    };
                }
            },
        },
    },
    methods: {
        submitForm() {

            // Memastikan semua field dalam form terisi

            if (

                this.form.kode &&

                this.form.nama &&

                this.form.deskripsi &&

                this.form.stock !== null &&

                this.form.stock !== undefined

            ) {

                // Memancarkan event submit dengan data form

                this.$emit("submit", this.form);

            }

        },

    },

    // Mendefinisikan event yang dapat dipancarkan oleh komponen ini

    emits: ["submit"],

};

</script>
