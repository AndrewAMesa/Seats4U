import { post } from "./Api"

export function createShowVMCon() {
    let token = document.getElementById("token")
    let venueName = document.getElementById("venueName")
    let showName = document.getElementById("showName")
    let showDate = document.getElementById("showDate")
    let showTime = document.getElementById("showTime")
    let defaultPrice = document.getElementById("defaultPrice")

    // prepare payload for the post
    let data = {
        'token': token.value, 'venueName': venueName.value, 'showName': showName.value,
        'date': showDate.value, 'time': showTime.value, 'price': defaultPrice.value
    }

    const handler = (response) => {
        console.log(JSON.parse(response.statusCode))
    }

    post('/createShowVM', data, handler)

}
