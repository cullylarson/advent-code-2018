const R = require('ramda')
const {get, liftA} = require('@cullylarson/f')

const input = `486 players; last marble is worth 7083300 points`

const valuesFromInput = x => {
    const result = /^([0-9]+) players; last marble is worth ([0-9]+) points$/.exec(x)
    return {
        numPlayers: parseInt(result[1]),
        numMarbles: parseInt(result[2]) + 1,
    }
}

const getNextPlayerIdx = (numPlayers, playerIdx) => {
    return playerIdx + 1 === numPlayers
        ? 0
        : playerIdx + 1
}

const buildPlayers = numPlayers => {
    return Array(numPlayers).fill(0)
}

const printCircle = (first, curr) => {
    let next = first

    do {
        if(next === curr) {
            process.stdout.write("[" + next.val + "] ")
        }
        else {
            process.stdout.write(next.val + " ")
        }
        next = next.next
    }
    while(next !== first)

    process.stdout.write("\n")
}

const placeAllMarbles = (numPlayers, numMarbles) => {
    let curr = {val: 0}
    curr.next = curr
    curr.prev = curr
    const zero = curr

    let players = buildPlayers(numPlayers)
    let playerIdx = 0

    for(let marble = 1; marble < numMarbles; marble++) {
        if(marble % 23 === 0) {
            const removeItem = curr.prev.prev.prev.prev.prev.prev.prev

            players[playerIdx] += marble + removeItem.val
            curr = removeItem.next
            removeItem.prev.next = curr
            removeItem.next.prev = curr
        }
        else {
            const newItem = {
                val: marble,
                prev: curr.next,
                next: curr.next.next,
            }

            newItem.prev.next = newItem
            newItem.next.prev = newItem

            curr = newItem
        }

        playerIdx = getNextPlayerIdx(numPlayers, playerIdx)
    }

    return {players}
}

const maxList = xs => {
    return R.reduce((acc, x) => {
        return x > acc
            ? x
            : acc
    }, xs[0], xs)
}

const gameValues = valuesFromInput(input)

const result = placeAllMarbles(gameValues.numPlayers, gameValues.numMarbles)

console.log(maxList(result.players))
