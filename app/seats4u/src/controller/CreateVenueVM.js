import { post } from "Api"

export function createConstant(requestRedraw) {
    // potentially modify the model
    let nameField = document.getElementById("constant-name")
    let valueField = document.getElementById("constant-value")

    // prepare payload for the post
    let data = { 'name': nameField.value, 'value': valueField.value }

    const handler = (json) => {
        console.log(json)
        // clear inputs
        nameField.value = ''
        valueField.value = ''
        requestRedraw()
    }

    post('/constants/create', data, handler)
}

