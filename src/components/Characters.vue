<template>
    <section class="characters"> 
        <b-modal v-model="showModal" centered scrollable :title="currentCharacter.name">
            <b-container fluid>
                <div><b>Name:</b> {{currentCharacter.name}}</div>
                <div><b>Height:</b> {{currentCharacter.height}}</div>
                <div><b>Mass:</b> {{currentCharacter.mass}}</div>
                <div><b>hair_color:</b> {{currentCharacter.hair_color}}</div>
                <div><b>skin_color:</b> {{currentCharacter.skin_color}}</div>
                <div><b>eye_color:</b> {{currentCharacter.eye_color}}</div>
                <div><b>birth_year:</b> {{currentCharacter.birth_year}}</div>
                <div><b>gender:</b> {{currentCharacter.gender}}</div>
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

        <h3 class="heading"> Popular Characters </h3>

        <b-container fluid class="container-width">
            <b-row class="w-50">
                <b-form-select 
                    v-model="selected"
                    class="mb-3"
                >
                    <template slot="first">
                        <option :value="null" disabled>-- Please select an option to filter--</option>
                    </template>
                    <option value="all">All</option> 
                    <option value="male">Male</option> 
                    <option value="female">Female</option>
                    <option value="robot">Robot</option>
                </b-form-select>
            </b-row>
            <b-row>
                <b-col v-for="(character, id) in filterCharacters" :key="id" md="4" sm="12" class="row-gap">
                    <b-card no-body class="overflow-hidden" style="max-width: 540px;">
                        <b-row no-gutters>
                            <b-col md="6">
                                <b-card-img 
                                    :src="img_url + `character-${getImageN(1,4)}.jpg?raw=true`"
                                    class="rounded-0">
                                </b-card-img>
                            </b-col>
                            <b-col md="6">
                                <b-card-body :title="character.name">
                                    <b-card-text>
                                        <div><b> Gender:</b>  {{character.gender}}</div>
                                        <div><b> Birth Year:</b>  {{character.birth_year}}</div>
                                    </b-card-text>
                                    <div slot="footer" style="position: absolute; bottom: 0; right: 0;">
                                        <b-button 
                                            @click="showDetial(character)"
                                            size="sm" 
                                            href="#">Read more
                                        </b-button>
                                    </div>
                                </b-card-body>
                            </b-col>
                        </b-row>
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
    name: "characters",
    data () {
        return {
            showModal: false,
            next_page: null,
            characters: [],
            loading: false,
            currentCharacter: {},
            selected: null,
            img_url: "https://github.com/random-guys/swapi-frontend-developer-test/blob/master/assets/"
        }
    },
    created() {
        axios.get('/people/')
            .then(response => {
                const { count, next, results } = response.data

                this.characters = results || []
                this.next_page = next
            })
    },
    mounted(){
        EventBus.$on('searchItem', (search) => {
            axios.get(`/people/?search=${search}`)
                .then(response => {
                    const { count, next, results } = response.data

                    this.characters = results
                    this.next_page = next
                    this.loading = false
                })
        })
    },
    beforeDestroy() {
        EventBus.$off('searchItem')
    },
    computed: {
        filterCharacters() {
            const filter = (character) => {

                if (this.selected === "male") return character.gender === "male"
                if (this.selected === "female") return character.gender === "female"
                if (this.selected === "robot") return character.gender === "robot"

                return () => true
            }

            return this.characters.filter(filter)
        }
    },
    methods: {
        showDetial(character) {
            this.showModal = true
            this.currentCharacter = character
        },
        loadMore() {
            if (!this.loadMoreContent) 
                return this.$router.push('/characters')

            if (this.next_page) {
                this.loading = true

                axios.get(this.next_page)
                    .then(response => {
                        const { count, next, results } = response.data

                        this.characters.push(...results)
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
.read-more {
    cursor: pointer;
}
</style>
