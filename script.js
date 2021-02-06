const Modal = {
    open(){
      //abri modal
      //adicionar classe active ao modal
      document.querySelector('.modal-overlay').classList.add('active')
    },
    close(){
      //fechar modal
      //remover classe active do modal
      document.querySelector('.modal-overlay').classList.remove('active')
    }
} 

const Storage = {
    p: document.querySelector("#day-p"),
    img: document.querySelector("#day-img"),

    get(){
        let json = JSON.parse(localStorage.getItem("daily:days")) || []

        if(json == ""){
            Storage.p.classList.remove("sr-only")
            Storage.img.classList.remove("sr-only")
        }

        return json
    },
    set(days){
        localStorage.setItem("daily:days", JSON.stringify(days))
    }
}

const Day = {
    all: Storage.get(),

    add(day){
        Day.all.push(day)
        app.reload()
    }
}

const Form = {
    title: document.querySelector("#title"),
    date: document.querySelector("#date"),
    description: document.querySelector("#description"),

    getValues() { //fução que pega os valores das input recebidas do form
        return {
            title: Form.title.value,
            date: Form.date.value,
            description: Form.description.value
        }
    },

    validateFields() { //função de valdação dos dados (vaziu ou não)
        const {title, date, description} = Form.getValues() //pegando os valores passados do form

        if(title.trim() === "" || date.trim() === "" || description.trim() === ""){
            throw new Error("Preencha todos os campos")
        }
    },

    formatValues(){
        let {title, date, description} = Form.getValues()

        date = Utils.formatDate(date)
        return {
            title,
            date,
            description
        }
    },

    submit(event) { //function executada quando o usuario confirma o envio das informações
        event.preventDefault()

        try {
          Form.validateFields()

          const day = Form.formatValues()

          Day.add(day)

          Form.clearFields()

          Modal.close()

          console.log(day.title)

        } catch (error) {
            alert(error.message)
        }
    },
    clearFields() {
        Form.title.innerHTML = ""
        Form.date.innerHTML = ""
        Form.description.innerHTML = ""
    }
}

const Utils = {
    formatDate(date){
        const splittedDate = date.split("-") //quebra uma string com base em um parametro e armazenas as partes em um array
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    }
}

const DOM = {
    daysContainer: document.querySelector("#days"),

    addDay(day){
        $(DOM.daysContainer).append( $(DOM.innerHTMLDay(day)));

    },
    innerHTMLDay(day){
        const html = `
            <div class="day">
                <div class="d-head">
                    <div class="title">${day.title}</div>
                    <div class="date">${day.date}</div>
                </div>
                <div class="d-body">
                    <p>
                        ${day.description}
                    </p>
                </div>
            </div>
        `

        return html
    },
    clearDay(){
        DOM.daysContainer.innerHTML = ""
    }
}

const app = {
    init(){
        Day.all.forEach((day) => {
            DOM.addDay(day)
        })

        Storage.set(Day.all)
    },
    reload(){
        DOM.clearDay()
        app.init()
    }
}

app.init()

//armazenar dados

//atualizar page a cada carregamento

//carregar dados na pagina

//adicionar novos dados

//formatar dados

//receber dados

//validar dados