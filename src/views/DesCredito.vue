<template>
<div class="w-full router-view-height flex justify-center items-center">
    <transition name="fade">
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white cus-w" v-if="currentDescuento">
            <img class="w-full h-56 bg-gray-500 object-cover" :src="currentDescuento.photoUrl" alt="Cliente">
            <div class="px-6 py-4 text-left">
                <div class="font-bold text-xl mb-2">{{currentDescuento.nombres}} {{currentDescuento.apellidoPaterno}} {{currentDescuento.apellidoMaterno}}</div>
                <p>
                    <span class="font-bold">Licencia de conducir:</span> {{currentDescuento.licencia}}
                </p>
                <p>
                    <span class="font-bold">Cedula de identidad:</span> {{currentDescuento.ci}}
                </p>
                <p>
                    <span class="font-bold">Operador:</span> {{currentDescuento.operador}}
                </p>
            </div>
            <div class="px-6 py-4 text-xl">
                Crédito restante: <span class="font-bold">{{currentDescuento.credito}} Bs</span>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
export default {
    name: "descuentos",
    data() {
        return {
            currentDescuento: null
        }
    },
    sockets: {
        descuento: function (data) {
            if (data) {
                const newData = {
                    ...data,
                    type: 'descuento'
                }
                this.currentDescuento = null
                setTimeout(() => {
                    this.currentDescuento = newData
                }, 100)
            }
        }
    }
}
</script>

<style>
.cus-w {
    width: 350px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
}
</style>
