<template>
<div>
    <div class="router-view-height activity-container flex justify-center items-center">
        <div class="mb-16">
            <div v-if="clientObj">
                <transito-reg-card
                :isValidate="false"
                nextText="Guardar"
                v-on:onCancel="cancelar()"
                v-on:onAcept="guardar()"
                @onImageUploaded="onImageUploaded"
                @onCarImageUploaded="onCarImageUploaded"
                :objValue="clientObj"
                :editable="true"></transito-reg-card>
            </div>
            <warning-icon v-else message="No existe actividad, seleccione a un usuario para validar"></warning-icon>
        </div>
    </div>
</div>
</template>

<script>
import {
    getCliente,
    updateCliente
} from '@/services/clientes'
import WarningIcon from '@/components/WarningIcon'
import TransitoRegCard from '@/components/TransitoRegCard'
export default {
    name: 't-edit',
    data() {
        return {
            clientObj: null,
            photoUrl:null,
            carPhotoUrl: null,
            isLoading: false,
            error: null
        }
    },
    methods: {
        cancelar() {
            this.$router.go(-1)
        },
        async guardar() {
            try {
                this.error = null
                this.isLoading = true
                const {
                    _id
                } = this.clientObj
                if(this.photoUrl) {
                    this.clientObj.photoUrl = this.photoUrl
                }
                if(this.carPhotoUrl)
                {
                    this.clientObj.carPhotoUrl = this.carPhotoUrl
                }
                await updateCliente(_id, this.clientObj)
                this.isLoading = false
                this.$router.go(-1)
            } catch (error) {
                console.error(error)
                this.error = error
                this.isLoading = false
            }
        },
        onImageUploaded(url) {
            this.photoUrl = url
        },
        onCarImageUploaded(url) {
            this.carPhotoUrl = url
        },
        async fetch() {
            try {
                this.isLoading = true
                const id = this.$route.params.id
                const {
                    data
                } = await getCliente(id)
                this.clientObj = data
                this.isLoading = false

            } catch (error) {
                console.error(error)
                this.error = error
                this.isLoading = false

            }
        }
    },
    mounted() {
        this.fetch()
    },
    components: {
        WarningIcon,
        TransitoRegCard
    }
}
</script>
