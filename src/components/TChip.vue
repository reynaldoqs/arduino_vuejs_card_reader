<template>
    <div class="w-full bg-gray-900">
       <div class="border-b border-gray-700 px-2 py-1 hover:bg-gray-800 cursor-pointer">
            <div class="flex">
                <div class="flex avatar mr-2 items-center justify-center py-1">
                    <img class="block rounded w-8 object-cover" src="https://lh3.googleusercontent.com/a-/AAuE7mAxk2KAwQILAirQbEtxma5zQPUm6OaQdux_8TyC" alt="">
                </div>
                <div class="pl-1 w-full flex items-center">
                    <div class="block w-full">
                        <p class="font-bold text-xs text-gray-500  text-left leading-normal">{{transaccion.nombres}} {{transaccion.apellidoPaterno}} {{transaccion.apellidoMaterno.charAt(0)}}.</p>
                        <div class="flex justify-between">
                            <p class="text-xs text-left text-gray-600 leading-none">{{transaccion.ultimaValidacion}}</p>
                            <p class="text-xs text-left text-gray-600 leading-none">{{transaccion.valido?'no autorizado':'autorizado'}}</p>
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
</style>