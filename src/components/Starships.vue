<template>
    <section class="starship"> 
        <h3 class="heading"> Popular Starships </h3>
        <b-container>
            <b-row>
                <b-col v-for="(starship, id) in starships" :key="id" md="4" sm="12" class="row-gap">
                    <b-card
                        :title="starship.name"
                        img-src="https://picsum.photos/600/300/?image=25"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2"
                    >
                        <b-card-text>
                        Some quick example text to build on the card title
                        </b-card-text>

                        <b-button href="#" variant="primary">Go somewhere</b-button>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
        <div class="text-center"> View More </div>
    </section> 
</template>

<script>
import axios from 'axios'

export default {
    name: "starships",
    data () {
        return {
            starships: [],
        }
    },
    created() {
        axios.get('/starships')
            .then(response => {
                const { results } = response.data

                this.starships = results || []
            })
    }
}
</script>

<style>

</style>