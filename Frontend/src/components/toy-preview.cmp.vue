<template>
    <section class="toy-preview">
        <h2>{{toy.name}}</h2>
        <h4>Price: {{toy.price}} $</h4>
    </section>
</template>



<script>
export default {
    props:['toy'],
}
</script>
