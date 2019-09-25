<template>
    <div class="router-view-height flex items-center justify-center">
        <transito-reg-card
        v-on:onCancel="cerrar()"
        v-on:onAcept="createUser()"
        @onAddRelevo="onAddRelevo"
        @onImageUploaded="onImageUploaded"
        :objValue="newObj"
        :editable="true"
        :isValidate="false"></transito-reg-card>
    </div>
</template>
<script>

import TransitoRegCard from '@/components/TransitoRegCard'
import { createCliente } from '@/services/clientes'
export default {
    data() {
        return{
            newObj:{},
            photoUrl: null,
            carPhotoUrl: null,
            editable: true,
            isLoading: false
        }
    },
    methods:{
        async createUser(){
            try {
                if(this.newObj.idTarjeta){
                    this.isLoading = true
                    let obj = {...this.newObj,photoUrl:this.photoUrl,carPhotoUrl:this.carPhotoUrl}
                    await createCliente(obj)
                    this.newObj = {}
                    this.photoUrl = null
                    this.carPhotoUrl = null
                    this.isLoading = false
                    //this.$router.go(-1)
                    this.$router.push('/home')
                }
            } catch (error) {
                console.error(error)
                this.isLoading = false
            }
        },
        cerrar(){
            this.$router.go(-1)
        },
        onImageUploaded(url){
            this.photoUrl = url
        },
        onAddRelevo(relevo){
            if(!this.newObj.relevos){
                this.newObj.relevos = []
            }
            this.newObj.relevos.push(relevo)
        }
    },
    components:{
        TransitoRegCard
    }
}
</script>
<style scoped>

.hide-amd{
    visibility: hidden;
}
.hover-control:hover .hide-amd {
    visibility: visible;
}
</style>