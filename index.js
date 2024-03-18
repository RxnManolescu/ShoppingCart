
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://shopping-list-42f48-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const addBtnEl = document.getElementById("add-button")
const inputEl = document.getElementById("input-field")
const ulEl = document.getElementById("shopping-list")

addBtnEl.addEventListener("click", function() {

    let inputValue = inputEl.value

    push(shoppingListInDB, inputValue)

    clearInputElValue()    

})

onValue(shoppingListInDB, function(snapshot) {

    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())

        clearUlEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]

            appendLiToUlEl(currentItem)
        }
    } else { 

        ulEl.innerHTML = "No items entered yet..."
    }
    
})

function clearInputElValue() {
    inputEl.value = ""
}

function clearUlEl() {
    ulEl.innerHTML = ""
}

function appendLiToUlEl(item) {

    let itemID = item[0]
    let itemValue = item[1]

    let newLiEl = document.createElement("li")

    newLiEl.textContent = itemValue

    newLiEl.addEventListener('dblclick', function() {
        let locationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(locationOfItemInDB)
    })
    ulEl.append(newLiEl)
}