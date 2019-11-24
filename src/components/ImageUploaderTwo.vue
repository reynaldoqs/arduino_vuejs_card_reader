<template>
    <div class="w-full h-full bg-gray-500 relative loader-container">

        <img class="w-full h-full object-cover select-none" draggable="false" :src="currentImgUrl" alt="">
        <div v-if="editable" class="left-0 top-0 opt absolute w-full h-full flex-column items-center justify-center">
            <div class="h-full w-full flex items-center justify-center">
                <div class="text-center">
                    <input type="file" name="fileCar" id="fileCar" class="inputfile" @change="onCarFileSelected"/>
                    <label for="fileCar" class="border border-gray-900 px-2 font-bold text-xs text-center">Subir<font-awesome-icon :icon="['fa', 'image']" class="text-md ml-2 text-center"/></label>
                    <!--<button @click="upLoadFirebase" class="border border-gray-900 px-2 font-bold text-xs text-center" >Subir<font-awesome-icon :icon="['fa', 'upload']" class="text-md ml-2 text-center"/></button>-->
                </div>
            </div>
            <div class="my-progres-bar bg-gray-900">
                <div class="my-progres-indicator bg-purple-600" :style="{width:`${completedPercent}%`}"></div>
            </div>
        </div>        
    </div>
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/storage'
export default {
    name:'image-uploader-car',
    data () {
        return {
            completedPercent: 0,
            currentFile: null,
            pictureUrl:null
        }
    },
    props: {
        oldPictureUrl:{
            type: String,
            default: null
        },
        profile: {
            type: Boolean,
            default: false
        },
        title: String,
        editable: Boolean
    },

    computed:{
        currentImgUrl(){
            if(this.pictureUrl){
                return this.pictureUrl
            }
            return this.oldPictureUrl
        }
    },
    methods:{
        onCarFileSelected(event) {
            this.currentFile = event.target.files[0]
            this.upLoadFirebase()
        },
        upLoadFirebase(){
            const storageRef = firebase.storage().ref()
            const childRef = storageRef.child(`usuarios/${this.currentFile.name}`)
            const task = childRef.put(this.currentFile)
            const context = this
            task.on('state_changed', snapshot => {
                context.completedPercent = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            }, error => {console.log(error.message)},
            () => {

                task.snapshot.ref.getDownloadURL().then((url) => {
                    context.pictureUrl = url
                    context.$emit('onCarImageUploaded', url)
                })
            })
        }
    }
}
</script>
<style scoped>
    .my-progres-bar{
        width: 100%;
        height: 6px;
    }
    .my-progres-indicator {
        height: 100%;
    }
    .inputfile {
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
    }
    .inputfile + label {
        display: inline-block;
        cursor: pointer; 
    }
    .opt{
        transition: 1s visibility;
    }
    .loader-container:hover .opt{
        visibility: visible;
    }
    .opt{
        background-color: rgba(200, 200, 200, .9);
        visibility: hidden;
    }
    .opt:hover {
        visibility: visible;
    }

</style>