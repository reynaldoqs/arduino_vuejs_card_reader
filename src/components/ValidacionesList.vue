<template>
    <div class="w-full h-full py-3">
        <t-chip v-for="(transaccion, index) in transacciones" :key="index" :transaccion="transaccion"/>
    </div>
</template>
<script>
import TChip from '@/components/TChip'
export default {
    components:{
        TChip
    },
    computed:{
        transacciones(){
            return this.$store.getters.transactionsList
        }
    }
}
</script>