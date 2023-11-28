import { post } from "/Api"

export function addTwoNumbers() {
    let venueName = document.getElementById("venueName")
    let location = document.getElementById("location")
    let defaultPrice = document.getElementById("defaultPrice")
    let rows = document.getElementById("numRows")
    let leftColumns = document.getElementById("leftCols")
    let centerColumns = document.getElementById("centerCols")
    let rightColumns = document.getElementById("righCols")

    // prepare payload for the post
    let data = { 'name': venueName.value, 'location': location.value, 'defaultPrice': defaultPrice.value, 
    'rows': rows.value, 'leftColumns': leftColumns.value, 'centerColumns': centerColumns.value, 'rightColumns': rightColumns.value }

    const handler = (json) => {
        document.getElementById("token").value = json.token
    }

    post('/createVenueVM', data, handler)
  
}
