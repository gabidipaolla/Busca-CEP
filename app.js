var submitButton = document.querySelector('#app form button')
var zipCodeField = document.querySelector('#app form input')
var content = document.querySelector('#app main')

submitButton.addEventListener('click', run)

function run(event){
    event.preventDefault()

    var zipCode = zipCodeField.value
    zipCode = zipCode.replace(' ', '')//não considera espaço vazio no meio da string
    zipCode = zipCode.replace('.','')//desconsidera o .
    zipCode = zipCode.trim()//desconsidera o espaço vazio no começo e no fim da string

    console.log(zipCode)
    

    axios.get('https://viacep.com.br/ws/' + zipCode +'/json/')
    .then(function(response){

        if(response.data.erro){
            throw new Error('CEP inválido')
        }

        content.innerHTML = ' '
        creatLine(response.data.logradouro) 
        creatLine(response.data.bairro) 
        creatLine(response.data.localidade + '/' + response.data.uf) 
        
    })
    .catch(function(erro){
        content.innerHTML = ' '
        console.log('error')
        creatLine('Ops! Algo não está correto!')
    })

}

function creatLine(text){
        var line = document.createElement('p')
        var text = document.createTextNode(text)

        line.appendChild(text)
        content.appendChild(line)
}