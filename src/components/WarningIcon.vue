<template>
    <div class="w-56 px-3 py-2 text-gray-600 select-none">
        <font-awesome-icon :icon="['fa', 'exclamation']" class="text-5xl mb-2"/>
        <p class="text-sm">{{message}}</p>
    </div>
</template>
<script>
export default {
    props:{
        message:String
    }
}
</script>