//visualizes selection sort
const selectSort = async () => {
    const cells = document.getElementsByClassName('cellSelect')
    let i = 0
    let j = 0
    let min = 0
    cells.item(min).setAttribute('class', 'cellSelect referenced')
    let len = cells.length
    const interval = setInterval( () => {
        if (i === len-1 && j === len-1) {
            setTimeout( () => {
                for (const childNode of cells){
                    childNode.setAttribute('class', 'cellSelect done')
                }
                showResetBtn("Select")
            }, 900)
            clearInterval(interval)
        }
        if (j < len) {
            if (isGreater(cells.item(min), cells.item(j))){
                cells.item(min).setAttribute('class', 'cellSelect')
                cells.item(j).setAttribute('class', 'cellSelect compared')
                setTimeout( () => {
                    cells.item(j).setAttribute('class', 'cellSelect')
                    min = j
                    cells.item(min).setAttribute('class', 'cellSelect referenced')
                    j++
                }, 900)
            } else {
                setTimeout( () => {
                    j++
                }, 900)
            }
        } else {
            if (min !== i){
                cells.item(i).setAttribute('class', 'cellSelect compared m-right')
                cells.item(min).setAttribute('class', 'cellSelect referenced m-left')
            } else {
                cells.item(min).setAttribute('class', 'cellSelect referenced')
            }

            setTimeout( () => {
                swap(cells.item(min), cells.item(i))
                cells.item(min).setAttribute('class', 'cellSelect')
                cells.item(i).setAttribute('class', 'cellSelect done')
                i++
                j = i
                min = j
            }, 900)
        }

    }, 1000)
}

//visualizes bubble sort
const bubbleSort = async () => {
    const cells = document.getElementsByClassName('cellBubble')
    let i = 0
    let j = cells.length - 1
    const interval = setInterval( () => {
        if (i == j) {
            if (j <= 1) {
                setTimeout( () => {
                    for (const childNode of cells){
                        childNode.setAttribute('class', 'cellBubble done')
                    }
                    showResetBtn("Bubble")
                }, 900)
                return clearInterval(interval)
            }
            j--
            i = 0
        }
        let ref = cells.item(i)
        let compared = cells.item(i+1)

        ref.setAttribute('class', 'cellBubble referenced')
        compared.setAttribute('class', 'cellBubble compared')
        if (isGreater(ref, compared)){
            ref.setAttribute('class', 'cellBubble referenced m-right')
            compared.setAttribute('class', 'cellBubble compared m-left')
            setTimeout( () => {
                ref.setAttribute('class', 'cellBubble')
                compared.setAttribute('class', 'cellBubble')
                swap(ref, compared)
                i++
                if (i === j) {
                    cells.item(j).setAttribute('class', 'cellBubble done')
                }
            }, 900)
        } else {
            setTimeout( () => { 
                i++
                if (i === j) {
                    if (cells.item(j) === ref){
                        ref.setAttribute('class', 'cellBubble done')
                        compared.setAttribute('class', 'cellBubble')
                    } else {
                        compared.setAttribute('class', 'cellBubble done')
                        ref.setAttribute('class', 'cellBubble')
                    }
                } else {
                    ref.setAttribute('class', 'cellBubble')
                    compared.setAttribute('class', 'cellBubble')
                }
            }, 900)
        }
    }, 1000)
}

//visualizes insertion sort
const insertSort = async () => {
    const cells = document.getElementsByClassName('cellInsertion')

    let i = 1
    let j = 0
    let len = cells.length
    let key = cells.item(i).innerText

    const data = document.querySelector('.keyInsertion')
    const node = document.createElement('div')
    const node2 = document.createElement('h3')
    node2.innerText = "KEY:"
    data.appendChild(node2)
    node.setAttribute('id', 'key')
    node.innerText = key
    data.appendChild(node)

    const interval = setInterval( () => {
        if (i === len){
            setTimeout( () => {
                for (const childNode of cells){
                    childNode.setAttribute('class', 'cellInsertion done')
                }
                const parent = document.querySelector('.keyInsertion')
                parent.removeChild(node)
                parent.removeChild(node2)
                showResetBtn("Insertion")
            }, 900)
            return clearInterval(interval)
        }

        let result = false

        if (j >= 0){
            if(Number(cells.item(j).innerText) > Number(key)){
                result = true
            }
        }

        if(result === true){
            cells.item(j).setAttribute('class', 'cellInsertion compared m-right')
            cells.item(j+1).setAttribute('class', 'cellInsertion referenced')
            setTimeout( () => {
                cells.item(j).setAttribute('class', 'cellInsertion')
                cells.item(j+1).setAttribute('class', 'cellInsertion')
                cells.item(j+1).innerText = cells.item(j).innerText
                j--
            }, 1000)
        } else {
            cells.item(j+1).setAttribute('class', 'cellInsertion')
            cells.item(j+1).setAttribute('id', 'key')
            setTimeout( () => {
                cells.item(j+1).setAttribute('class', 'cellInsertion')
                cells.item(j+1).setAttribute('id', '')
                cells.item(j+1).innerText = key
                i++
                j = i - 1
                if (i !== len){
                    key = cells.item(i).innerText
                    const el = document.querySelector('#key')
                    el.innerText = key
                }
            }, 1000)
        }
        
    }, 1500)
}

//swaps values between two nodes
const swap = (nodeA, nodeB) => {
     const temp = nodeA.innerText
     nodeA.innerText = nodeB.innerText
     nodeB.innerText = temp
}

//compares two nodes returns whether first node is larger
//than the second or not
const isGreater = (nodeA, nodeB) => {
    const intA = Number(nodeA.innerText)
    const intB = Number(nodeB.innerText)
    return intA > intB
}

//returns a random integer between 1 and 100
const getRandomNumber = () => {
    return Math.floor(Math.random() * 100 + 1)
}

//resets data to random integers
const resetData = (id) => {
    const data = document.querySelector(`.data${id}`)
    for (let childNode of data.children){
        childNode.innerText = getRandomNumber()
        childNode.setAttribute('class', `cell${id}`)
    }
}

//creates reset button after run button is pushed
//replay will reset data to random integers
const showResetBtn = (id) => {
    const header = document.querySelector(`.header${id}`)
    const replay = document.createElement('button')
    replay.setAttribute('class', 'btn btn-outline-dark')
    replay.innerText = 'Reset'
    replay.addEventListener('click', () => {
        resetData(id)
        header.removeChild(replay)
        flags[id] = false
    })
    header.appendChild(replay)
}

//renders data into blocks for each number
const renderData = (data, id) => {
    const dataNode = document.querySelector(`.data${id}`)
    for (const num of data){
        const childNode = document.createElement('div')
        childNode.setAttribute('class', `cell${id}`)
        childNode.innerText = num
        dataNode.appendChild(childNode)
    }
}

//returns an array of random generated data of specified size
const buildData = (size) => {
    let data = []
    for(let i = 0; i < size; i++){
        data.push(Math.floor(Math.random() * 100 + 1))
    }
    return data
}

//data size
const size = 10

let flags = {
    "Select": false,
    "Bubble": false,
    "Insertion": false
}

//object of available algorithms
const algos = [
    {
        "name": "Selection Sort",
        "id": "Select",
        "algo": selectSort
    },
    {
        "name": "Bubble Sort",
        "id": "Bubble",
        "algo": bubbleSort
    },
    {
        "name": "Insertion Sort",
        "id": "Insertion",
        "algo": insertSort
    }
]

//loops thru each algorithm in algos object and creates respective btn click event
// as well as rendering it's respective random data
for (let algo of algos) {
    let btnRun = document.querySelector(`#run${algo.id}`)
    btnRun.addEventListener('click', () => {
        if (flags[algo.id] === false){
            // console.log(algo.name)
            flags[algo.id] = true
            algo.algo()
        }
    })
    const data = buildData(size)
    renderData(data, algo.id)
}