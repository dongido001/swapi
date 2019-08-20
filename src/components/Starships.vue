<template>
    <section class="starship"> 
        <b-modal v-model="showModal" centered scrollable :title="currentStarship.name">
            <b-container fluid>
                <div><b>Name:</b> {{currentStarship.name}}</div>
                <div><b>model:</b> {{currentStarship.model}}</div>
                <div><b>manufacturer:</b> {{currentStarship.manufacturer}}</div>
                <div><b>cost_in_credits:</b> {{currentStarship.cost_in_credits}}</div>
                <div><b>length:</b> {{currentStarship.length}}</div>
                <div><b>crew:</b> {{currentStarship.crew}}</div>
                <div><b>passengers:</b> {{currentStarship.passengers}}</div>
                <div><b>cargo_capacity:</b> {{currentStarship.cargo_capacity}}</div>
                <div><b>consumables:</b> {{currentStarship.consumables}}</div>
            </b-container>

            <div slot="modal-footer" class="w-100">
                <b-button
                    variant="primary"
                    size="sm"
                    class="float-right"
                    @click="showModal=false"
                >
                    Close
                </b-button>
            </div>
        </b-modal>

        <h3 class="heading"> Popular Starships </h3>

        <b-container>
            <b-row>
                <b-col v-for="(starship, id) in starships" :key="id" md="4" sm="12" class="row-gap">
                    <b-card
                        :title="starship.name"
                        :img-src="img_url + `starship-${getImageN(1,6)}.jpg?raw=true`"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem;"
                        class="mb-2"
                    >
                        <b-card-text>
                            <div> <b>Model:</b> {{starship.model}} </div>
                            <div> <b>Cargo Capacity:</b>  {{starship.cargo_capacity}} </div>
                        </b-card-text>

                        <b-button 
                            @click="showDetial(starship)"
                            size="sm"
                        >
                            Read more
                        </b-button>
                    </b-card>
                </b-col>
            </b-row>
        </b-container>
        <div v-if="loading" class="text-center">Loading...</div>
        <div
            class="text-center read-more" 
            @click="loadMore"
            v-else-if="next_page"
        >
            View More
        </div>
    </section> 
</template>

<script>
import axios from 'axios'
import EventBus from '../EventBus'

export default {
    name: "starships",
    data () {
        return {
            showModal: false,
            next_page: null,
            starships: [],
            loading: false,
            currentStarship: {},
            img_url: "https://github.com/random-guys/swapi-frontend-developer-test/blob/master/assets/"
        }
    },
    created() {
        axios.get('/starships/')
            .then(response => {
                const { count, next, results } = response.data

                this.starships = results || []
                this.next_page = next
            })
        
        EventBus.$on('searchItem', (search) => {
            axios.get(`/starships/?search=${search}`)
                .then(response => {
                    const { count, next, results } = response.data

                    this.starships = results
                    this.next_page = next
                    this.loading = false
                })
        })
    },
    methods: {
        showDetial(starship) {
            this.showModal = true
            this.currentStarship = starship
        },
        loadMore() {
            if (!this.loadMoreContent) 
                return this.$router.push('/starships')

            if (this.next_page) {
                this.loading = true

                axios.get(this.next_page)
                    .then(response => {
                        const { count, next, results } = response.data

                        this.starships.push(...results)
                        this.next_page = next
                        this.loading = false
                    })
            }
        },
        getImageN(min, max) {
            return Math.ceil(Math.random() * (max - min) + min);
        }
    },
    props: {
        // user to know if to redirect to a new page 
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