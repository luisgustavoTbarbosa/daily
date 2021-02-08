const Modal = {
    openSing(){
      //abri modal
      //adicionar classe active ao modal
      document.querySelector('.modal-overlay').classList.add('active')
    },
    closeSing(){
      //fechar modal
      //remover classe active do modal
      document.querySelector('.modal-overlay').classList.remove('active')
    },
    openInfo(){
        document.querySelector('.modal-day').classList.add('active')
        DOM.innerHTMLInfo()
        
    },
    closeInfo(){
        document.querySelector('.modal-day').classList.remove('active')
    }
} 

//armazenar dados
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

//adicionar novos dados
const Day = {
    all: Storage.get(),

    add(day){
        Day.all.push(day)
        app.reload()
    },
    remove(index){
        Day.all.splice(index, 1)

        app.reload()
        Modal.closeInfo()
    }
}

const DOM = {
    daysContainer: document.querySelector("#days"),
    infoContainer: document.querySelector("#modal-info"),

    addDay(day){
        $(DOM.daysContainer).append( $(DOM.innerHTMLDay(day)));
    },
    innerHTMLDay(day){
        const html = `
            <div class="day" onClick="Modal.openInfo()">
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
    },
    innerHTMLInfo(index){
        const html = `
            <div class="d-info">
                <a class="buttons-info" href="#" onclick="Modal.closeInfo()"><img src="./assets/cancel.svg"></img></a>
                <a class="buttons-info" href="#" onclick="Day.remove(${index})"><img src="./assets/remove.svg"></img></a>
            </div>
        `

        return DOM.infoContainer.innerHTML = html
    }
}

//receber dados
//validar dados
//formatar dados
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
    clearFields() {
        Form.title.value = ""
        Form.date.value = ""
        Form.description.value = ""
    },

    submit(event) { //function executada quando o usuario confirma o envio das informações
        event.preventDefault()

        try {
          Form.validateFields()

          const day = Form.formatValues()

          Day.add(day)

          Form.clearFields()

          Modal.closeSing()

          Form.clearFields()

          console.log(day.title)

        } catch (error) {
            alert(error.message)
        }
    }
}

const Utils = {
    formatDate(date){
        const splittedDate = date.split("-") //quebra uma string com base em um parametro e armazenas as partes em um array
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    }
}

//carregar dados na pagina


//atualizar page a cada carregamento
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













