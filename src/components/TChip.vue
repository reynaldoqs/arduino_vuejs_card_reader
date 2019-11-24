<template>
    <div class="w-full bg-gray-900">
       <div @click="() => {transaccion.type === 'validacion'?$store.dispatch('selectTransaction', transaccion):''}" class="border-b border-gray-700 px-2 py-1 hover:bg-gray-800 cursor-pointer">
            <div class="flex">
                <div class="flex avatar mr-2 items-center justify-center py-1">
                    <img class="block rounded-full w-10 h-10 object-cover" :src="transaccion.photoUrl" alt="">
                </div>
                <div class="pl-1 w-full flex items-center">
                    <div class="block w-full">
                        <p class="font-bold text-xs text-gray-500  text-left leading-normal">{{transaccion.nombres}} {{transaccion.apellidoPaterno}} {{transaccion.apellidoMaterno?transaccion.apellidoMaterno.charAt(0):''}}.</p>
                        <div class="flex justify-between">
                            <p class="text-xs text-left text-gray-600 leading-none">{{transaccion.ci}}</p>
                            <p v-if="transaccion.type === 'validacion'" class="border-green-200 border px-1 custom-p rounded text-xs text-left text-green-200 leading-none">{{transaccion.type}}</p>
                            <p v-if="transaccion.type === 'validado'" class="border-green-500 border px-1 custom-p rounded text-xs text-left text-green-600 leading-none">{{transaccion.type}}</p>
                            <p v-if="transaccion.type === 'descuento'" class="border-orange-500 border px-1 custom-p rounded text-xs text-left text-orange-600 leading-none">{{transaccion.type}}</p>
                            <p v-if="transaccion.type === 'actualizacion'" class="border-blue-500 border px-1 custom-p rounded text-xs text-left text-blue-600 leading-none">{{transaccion.type}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        transaccion: Object
    }
}
</script>
<style scoped>
    .avatar{
        width: 70px;
    }
    .custom-p{
        padding-top: 1px;
        padding-bottom: 1px;
    }
</style>