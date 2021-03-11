<template>
    <section class="toy-list main-container ">
        <ul>
         <li v-for="toy in toys" :key="toy._id" class="toy-preview-container" >
         <toy-preview :toy="toy"/>
         <div class="action-btns">
          <router-link :to="'/toy/edit/'+toy._id">Edit</router-link>
          <router-link :to="'/toy/details/'+toy._id">Details</router-link>
          <button @click="remove(toy._id)">Delete</button>
          </div>
         </li>
         </ul>
    </section>
</template>


<script>
import toyPreview from "./toy-preview.cmp.vue"

export default {
props:["toys"],
components: {
    toyPreview
},
methods: {
    remove(id) {
        this.$store.dispatch({type:'removeToy', toyId:id})
        }
}
}
</script>