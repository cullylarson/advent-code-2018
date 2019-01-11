const R = require('ramda')
const {reduce, set} = require('@cullylarson/f')

const input = require('./input')

const getBounds = R.reduce((acc, coord) => {
    if(acc === null) {
        return {
            l: coord.x,
            r: coord.x,
            t: coord.y,
            b: coord.y,
        }
    }
    else {
        return R.compose(
            u => coord.y > u.b ? R.set(R.lensProp('b'), coord.y, u) : u,
            u => coord.y < u.t ? R.set(R.lensProp('t'), coord.y, u) : u,
            u => coord.x > u.r ? R.set(R.lensProp('r'), coord.x, u) : u,
            u => coord.x < u.l ? R.set(R.lensProp('l'), coord.x, u) : u,
        )(acc)
    }
}, null)

const lineToCoord = R.compose(
    u => ({
        x: parseInt(u[0]),
        y: parseInt(u[1]),
    }),
    R.map(R.trim),
    R.split(','),
)

const allCoordsFromBounds = bounds => {
    const coords = []

    for(let x = bounds.l; x <= bounds.r; x++) {
        for(let y = bounds.t; y <= bounds.b; y++) {
            coords.push({x, y})
        }
    }

    return coords
}

const getDistance = R.curry((a, b) => {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
})

const augDistanceFromInputCoords = R.curry((inputCoords, u) => {
    return R.compose(
        x => set('distance', x, u),
        R.sum,
        R.map(getDistance(u)),
    )(inputCoords)
})

function report(x) {
    console.log(x)
    return x
}

const inputCoords = R.compose(
    R.map(lineToCoord),
    R.filter(x => !!x),
    R.map(R.trim),
    R.split('\n'),
)(input)

R.compose(
    report,
    R.prop('length'),
    R.filter(x => x.distance < 10000),
    R.map(augDistanceFromInputCoords(inputCoords)),
    allCoordsFromBounds,
    getBounds,
)(inputCoords)
