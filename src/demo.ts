import Validozer from '../dist'

const form: any = document.getElementById('demo')

const errorDiv = document.getElementById('errors')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = {}

    formData.forEach((value, key) => {
        data[key] = value
    })
    
    const rules = {
        fname: {
            label: "First Name",
            rules: "required|alpha"
        },
        lname: {
            label: "Last Name",
            rules: "required|alpha"
        },
        age: {
            label: "Age",
            rules: "required|numeric|min:20|max:100"
        },
        password: {
            label: "Password",
            rules: "required|min:8"
        },
        confirm: {
            label: "Confirm",
            rules: "required|same:password@Password"
        }
    }

    const validozer = Validozer.make(data, rules)

    errorDiv.innerHTML = ""

    if(validozer.fails()) {
        let ul = document.createElement('ul')
        validozer.errors().forEach(error => {
            const li = document.createElement('li')
            li.innerText = error
            ul.append(li)
        })

        errorDiv.append(ul)
    }
})