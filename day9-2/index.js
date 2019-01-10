const R = require('ramda')
const {get, liftA} = require('@cullylarson/f')

const input = `486 players; last marble is worth 7083300 points`
// const input = `486 players; last marble is worth 70833 points`

const valuesFromInput = x => {
    const result = /^([0-9]+) players; last marble is worth ([0-9]+) points$/.exec(x)
    return {
        numPlayers: parseInt(result[1]),
        numMarbles: parseInt(result[2]) + 1,
    }
}

const getMarbleIdxCw = (circle, fromIdx, distance) => {
    const end = fromIdx + (distance % circle.length)
    return end > circle.length - 1
        ? end - circle.length
        : end
}

const getMarbleIdxCcw = (circle, fromIdx, distance) => {
    const end = fromIdx - (distance % circle.length)
    return end < 0
        ? circle.length + end
        : end
}

const getNextPlayerIdx = (numPlayers, playerIdx) => {
    return playerIdx + 1 === numPlayers
        ? 0
        : playerIdx + 1
}

const buildPlayers = numPlayers => {
    return Array(numPlayers).fill(0)
}

const placeAllMarbles = (numPlayers, numMarbles) => {
    let circle = [0]
    let currentIdx = 0
    let marble = 1
    let players = buildPlayers(numPlayers)
    let playerIdx = 0

    for(let marble = 1; marble < numMarbles; marble++) {
        if(marble % 100000 === 0) console.log(marble)

        if(marble % 23 === 0) {
            const marbleRemoveIdx = getMarbleIdxCcw(circle, currentIdx, 7)

            players[playerIdx] += marble + circle[marbleRemoveIdx]
            circle.splice(marbleRemoveIdx, 1)
            currentIdx = marbleRemoveIdx
        }
        else {
            const nextCurrentIdx = getMarbleIdxCw(circle, currentIdx, 1) + 1

            circle.splice(nextCurrentIdx, 0, marble)
            currentIdx = nextCurrentIdx
        }

        playerIdx = getNextPlayerIdx(numPlayers, playerIdx)
    }

    return {circle, players}
}

const maxList = xs => {
    return R.reduce((acc, x) => {
        return x > acc
            ? x
            : acc
    }, xs[0], xs)
}

function report(x) {
    console.log(x)
    return x
}

const reportM = R.curry((msg, x) => {
    console.log(msg, x)
    return x
})

const gameValues = valuesFromInput(input)

const result = placeAllMarbles(gameValues.numPlayers, gameValues.numMarbles)

console.log(maxList(result.players))
