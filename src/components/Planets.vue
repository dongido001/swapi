<template>
    <section class="planets"> 
        <h2 class="heading"> Popular Planets </h2>

        <div>
            <b-card no-body class="overflow-hidden" style="max-width: 540px;">
                <b-row no-gutters>
                <b-col md="6">
                    <b-card-img src="https://picsum.photos/400/400/?image=20" class="rounded-0"></b-card-img>
                </b-col>
                <b-col md="6">
                    <b-card-body title="Horizontal Card">
                    <b-card-text>
                        This is a wider card with supporting text as a natural lead-in to additional content.
                        This content is a little bit longer.
                    </b-card-text>
                    </b-card-body>
                </b-col>
                </b-row>
            </b-card>
        </div>
    </section> 
</template>

<script>
import axios from 'axios'

export default {
    name: "planets",
    data () {
        return {
            planets: [],
        }
    },
    created() {
        axios.get('/planets')
            .then(response => {
                const { results } = response.data

                this.planets = results || []
            })
    }
}
</script>

<style>

</style>