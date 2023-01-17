//primeiro declaro uma variavel do HTMLObject, o qual receberá todos os pokemons
const $pokedex = document.querySelector(".pokedex")

let PokemonsList = []

const $alert = document.querySelector(".alert")
const $input = document.querySelector(".poke-quant")
const $btn = document.querySelector(".poke-btn")


$btn.addEventListener("click", showPokes)


//crio uma função com 'async', para declará-la como assíncrona, que irá inserir os pokemons no HTML, com um parametro que indica a quantidade de pokemons que serão inseridos.
async function setPokemons(quant) {
    
    //crio um loop, com limite definido pelo parameto 'quant' , para requisitar um id diferente em cada execução deste
    for (let i = 1; i<= quant; i++) {
        
        //atribuo em uma variavel a função getPokemon(id) com 'await', para declarar que o retorno dela espera uma requisição
        const get = await getPokemon(i)
        
        //o seu retorno eu atribuo à lista e ao HTML
        $pokedex.innerHTML += get
    
    }
    console.log(PokemonsList)
}

//função que faz a requisição à PokeAPI, com o parâmmetro que representará o id do pokemon requisitado
async function getPokemon(id) {
    
    
    //requisição e parseamento da response da promise atribuídos em variáveis
    const getUrl = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const Urlresponse = await getUrl.json()
    
    
    //coletando os dados desejados da promise
    const pokemonName =  Urlresponse.name
    const pokemonType = Urlresponse.types[0].type.name
    const pokemonImage = Urlresponse.sprites.front_default
    
    const object = {
        name: pokemonName,
        type: pokemonType,
        sprite: pokemonImage
    }
    
    PokemonsList.push(object)
    
    //atribuo eles a uma variável, inserindo por template string em um texto html
    const result = `
    <li class='card ${pokemonType}'>
        <img src='${pokemonImage}' class='card-image'>
        <h1 class='card-title'>${pokemonName}</h1>
        <h2 class='card-subtitle'>${pokemonType}</h2>
    </li>`
    
    //retorno o texto
    return result
}

//chamo a função que edita o HTML, passando a quantidade de pokemons que aparecerão 
function showPokes() {
    PokemonsList = []
     
    
    if ($input.value === 0 || $input.value > 20 || $input.value.includes("-") === true) {
        $alert.style.opacity = "1"
        $alert.innerHTML = "Apenas números de 1 a 20"
    }
    else if ($input.value === "") {
        $alert.style.opacity = "1"
        $alert.innerHTML = "Digite algo antes"
    } 
    else {
        $alert.innerHTML = ""
        $pokedex.innerHTML = ""
        setPokemons($input.value)
    }
    
    
}



    









