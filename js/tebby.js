function clock() {
    let time = new Date()

    let hour = time.getHours()
    let min = time.getMinutes()
    let day = time.getDay()
    let date = time.getDate()
    let mon = time.getMonth()
    let year = time.getFullYear()

    let ampm = (hour >= 12) ? 'pm' : 'am'

    document.getElementById('clock').innerHTML = `${zeroPad(hour)}:${zeroPad(min)}`
    document.getElementById('ampm').innerHTML = `${ampm}`
    document.getElementById('date').innerHTML = `${days[day]} ${date} ${months[mon]} ${year}`

    setTimeout(clock, 1000)
}

function zeroPad(num) {
    return (num < 10) ? '0' + num : num
}

const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']

clock()