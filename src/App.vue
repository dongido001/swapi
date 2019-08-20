<template>
  <b-container id="app" fluid>
      <header class="header">
        <img src="./assets/logo.png" width="85" height="25">
        <SearchForm/>
      </header>

      <main>
        <Starships/>
        <Planets/>
        <Characters/>
      </main>
  </b-container>
</template>

<script>
import Characters from '@/components/Characters'
import Planets from '@/components/Planets'
import Starships from '@/components/Starships'
import SearchForm from '@/components/SearchForm'

export default {
  name: 'app',
  components: {
    Characters,
    Planets,
    Starships,
    SearchForm
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
  padding: 0px;
}

.header {
  height: 400px;
  background-image: url("./assets/hero-banner.jpg");
  padding: 10px;
}

.heading {
  text-align: center;
  padding-top: 35px;
  font-weight: 300;
  display: block;
  padding-bottom: 5px;
  position: relative;
}

.heading:before{
    content: "";
    position: absolute;
    width: 5%;
    bottom: 0;
    left: 48%;
    border-bottom: 3px solid gray;
}

.row-gap {
  margin-bottom: 30px;
}

.container-width {
    padding-right: 65px;
    padding-left: 65px;
}
</style>
