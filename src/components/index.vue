<template>
    <section> 
        <Starships/>
        <Planets/>
        <Characters/>
    </section> 
</template>

<script>
import Starships from './Starships'
import Planets from './Planets'
import Characters from './Characters'

export default {
    name: "mainCompenent",
    components: {
        Starships,
        Planets,
        Characters
    }
}
</script>

<style>

</style>