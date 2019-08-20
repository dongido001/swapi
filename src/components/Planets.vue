<template>
    <section class="planets"> 
        <h2 class="heading"> Popular Planets </h2>
        <b-container>
            <b-row>
                <div class="col-md-8 mx-auto">
                    <carousel class="text-center">
                        <slide v-for="(planet, id) in planets" :Key="id">
                            <b-card
                                border-variant="secondary"
                                :header="planet.name"
                                header-border-variant="secondary"
                                align="center"
                                style="margin: 9px"
                            >
                                <b-card-text>
                                    <div> <b>Temperature:</b>  {{planet.name}} </div>
                                    <div> <b>Population:</b> {{planet.population}} </div>
                                </b-card-text>
                            </b-card>
                        </slide>
                    </carousel>
                </div>
            </b-row>
        </b-container>
    </section> 
</template>

<script>
import axios from 'axios'
import EventBus from '../EventBus'

export default {
    name: "planets",
    data () {
        return {
            planets: [],
        }
    },
    created() {
        axios.get(`${process.env.VUE_APP_API_URL}/planets/`)
            .then(response => {
                const { results } = response.data

                this.planets = results || []
            })

        EventBus.$on('searchItem', (search) => {
            axios.get(`${process.env.VUE_APP_API_URL}/planets/?search=${search}`)
                .then(response => {
                    const { count, next, results } = response.data

                    this.planets = results
                    this.next_page = next
                    this.loading = false
                })
        })
    },
    props: {
        // used to know if to redirect to a new page 
        // or load more of the content
        loadMoreContent: { 
            type: Boolean,
            required: false,
            default: false
        }
    },
}
</script>

<style>

</style>