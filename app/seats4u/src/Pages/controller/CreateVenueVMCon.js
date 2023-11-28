import { post } from "./Api"

export function createVenueVMCon() {
    let venueName = document.getElementById("venueName")
    let location = document.getElementById("location")
    let rows = document.getElementById("numRows")
    let leftColumns = document.getElementById("leftCols")
    let centerColumns = document.getElementById("centerCols")
    let rightColumns = document.getElementById("rightCols")

    // prepare payload for the post
    let data = { 'name': venueName.value, 'location': location.value, 
    'rows': rows.value, 'leftColumns': leftColumns.value, 'centerColumns': centerColumns.value, 'rightColumns': rightColumns.value }

    
    const handler = (response) => {
        document.getElementById("token").value = JSON.parse(response.token)
        console.log(JSON.parse(response.token))
    }

    post('/createVenueVM', data, handler)
  
}
