<template>
    <div id="search">
        <div class="text-center"> 
            <img src="../assets/logo.png" width="85" height="25"> 
        </div>
        <div class="text-center">
            <div> Find your favourite Characters, Films, Species, Starships and Planets </div>
        </div>
        <div class="form-row search-form">
            <div class="input-group input-group-lg col-md-3 mx-auto">
                <div class="input-group-prepend">
                    <span class="input-group-text">
                        <font-awesome-icon icon="user-secret"/>
                    </span>
                </div>
                <input type="text" class="form-control" placeholder="Your Amount" aria-describedby="basic-addon1">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "search"
}
</script>

<style>
#search {
    display: grid;
    padding: 80px;
    grid-auto-rows: 40px;
    grid-row-gap: 8px;
}
</style>
