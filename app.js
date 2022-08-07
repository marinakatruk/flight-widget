const tableBody = document.getElementById('table-body')

let flights = [
    {
        time: "07:25",
        destination: "PORTO",
        flight: "PR 203",
        gate: "A 01",
        remarks: "ON TIME"
    },
    {
        time: "08:00",
        destination: "STOCKHOLM",
        flight: "STL 102",
        gate: "C 07",
        remarks: "ON TIME"
    },
    {
        time: "10:25",
        destination: "VIENNA",
        flight: "VN 525",
        gate: "A 14",
        remarks: "CANCELLED"
    },
    {
        time: "11:50",
        destination: "TALLINN",
        flight: "TLN 344",
        gate: "M 03",
        remarks: "ON TIME"
    },
    {
        time: "12:30",
        destination: "BANGKOK",
        flight: "BNG 843",
        gate: "B 10",
        remarks: "DELAYED"
    }
]

const destinations = ["BANGKOK", "TALLINN", "VIENNA", "STOCKHOLM", "PORTO"]
const remarks = ["ON TIME", "DELAYED", "CANCELLED"]
let hour = 12

function populateTable() {

    for (const flight of flights) {
        const tableRow = document.createElement("tr")

        for (const flightDetail in flight) {
            const tableCell = document.createElement("td")
            const word = Array.from(flight[flightDetail])
            
            for (const [index, letter] of word.entries()) {
                const letterElement = document.createElement('div')

                setTimeout(() => {
                    letterElement.classList.add('flip')
                    letterElement.textContent = letter
                    tableCell.append(letterElement)
                }, 100 * index)

            }

            tableRow.append(tableCell)
        }

        tableBody.append(tableRow)
    }
}

populateTable()

function generateRandomLetter() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length))
}

function generateRandomNumber(maxNumber) {
    const numbers = "0123456789"
    if (maxNumber) {
        const newNumbers = numbers.slice(0, maxNumber + 1)
        return newNumbers.charAt(Math.floor(Math.random() * newNumbers.length))
    }
    return numbers.charAt(Math.floor(Math.random() * numbers.length))
}

function generateTime() {
    let displayHour = hour
    
    if (hour < 24) {
        hour++
    }
    if (hour >= 24) {
        hour = 1
        displayHour = hour
    }
    if (hour < 10) {
        displayHour = "0" + hour
        hour++
    }

    return displayHour + ":" + generateRandomNumber(5) + generateRandomNumber()
}

function shuffleUp() {
    flights.shift()
    flights.push({
        time: generateTime(),
        destination: destinations[Math.floor(Math.random() * destinations.length)],
        flight: generateRandomLetter() + generateRandomLetter() + " " + generateRandomNumber() + generateRandomNumber() + generateRandomNumber(),
        gate: generateRandomLetter() + " " + generateRandomNumber() + generateRandomNumber(),
        remarks: remarks[Math.floor(Math.random() * remarks.length)]
    })
    tableBody.textContent = ""
    populateTable()
}

setInterval(shuffleUp, 5000)