module.exports = {
    devServer: {
        proxy: 'https://swapi.co/api/'
        // proxy: {
        //     '/api': {
        //         target: 'https://swapi.co/api/',
        //     }
        // }
    }
}