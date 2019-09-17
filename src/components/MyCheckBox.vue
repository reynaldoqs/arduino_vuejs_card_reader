<template>
    <div class="my-2">
    <label class="custom-label flex text-left">
        <div class="bg-white shadow w-6 h-6 p-1 flex justify-center items-center mr-2">
            <input :checked="value" ref="checkValue" @input="update()" type="checkbox" class="hidden">
            <svg class="hidden w-4 h-4 text-purple-600 pointer-events-none" viewBox="0 0 172 172"><g fill="none" stroke-width="none" stroke-miterlimit="10" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode:normal"><path d="M0 172V0h172v172z"/><path d="M145.433 37.933L64.5 118.8658 33.7337 88.0996l-10.134 10.1341L64.5 139.1341l91.067-91.067z" fill="currentColor" stroke-width="1"/></g></svg>
        </div>

        <!--<input :value="value" ref="checkValue" id="checkInput" @input="update()" type="checkbox">        -->
        <span class="select-none text-xs leading-none mt-1">{{label}}</span>
    </label>   
    </div>
</template>
<script>
export default {
    props:{
        value:{
            type: Boolean,
            default: function (value) {
                if(typeof value === "boolean"){
                    return value
                }
                return false
            }
        },
        label: String
    },
    methods: {
        update(){
            this.$emit('input', this.$refs.checkValue.checked)
        }
    }
}
</script>
<style scoped>
    .custom-label input:checked + svg {
    display: block !important;
}
</style>