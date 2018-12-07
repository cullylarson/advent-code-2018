const R = require('ramda')
const {reduce} = require('@cullylarson/f')

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

const getDistance = (a, b) => {
    return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

const getClosest = (point, coords) => {
    const distances = R.map(u => ({
        ...u,
        distance: getDistance(u, point)
    }), coords)

    const closest = R.reduce((acc, u) => {
        return acc === null || u.distance < acc.distance
            ? u
            : acc
    }, null, distances)

    const numAtClosest = R.reduce((acc, u) => {
        return u.distance === closest.distance
            ? acc + 1
            : acc
    }, 0, distances)

    return numAtClosest > 1
        ? null
        : closest
}

const fillGrid = (coords, bounds) => {
    const grid = []

    for(let x = bounds.l; x <= bounds.r; x++) {
        grid[x] = []

        for(let y = bounds.t; y <= bounds.b; y++) {
            grid[x][y] = getClosest({x, y}, coords)
        }
    }

    return grid
}

const lineToCoord = R.compose(
    u => ({
        x: parseInt(u[0]),
        y: parseInt(u[1]),
    }),
    R.map(R.trim),
    R.split(','),
)

const keyFromCoord = ({x, y}) => `${x},${y}`

const isEdge = (bounds, {x, y}) => y === bounds.t || y === bounds.b || x === bounds.l || x === bounds.r

const getInfiniteCoords = (grid, bounds) => {
    return R.compose(
        R.values,
        grid => grid.reduce((acc, u, x) => {
            return u.reduce((acc, v, y) => {
                if(v && isEdge(bounds, {x, y})) {
                    acc[keyFromCoord(v)] = v
                }

                return acc
            }, acc)
        }, {})
    )(grid)
}

const getMostArea = R.compose(
    reduce((acc, u) => {
        return acc === null || u.count > acc.count
            ? u
            : acc
    }, null),
    R.reduce((acc, u) => {
        if(u === undefined) return acc

        return u.reduce((acc, v) => {
            if(v === null) return acc

            const key = keyFromCoord(v)

            if(!acc.hasOwnProperty(key)) {
                acc[key] = {
                    ...v,
                    count: 0,
                }
            }

            acc[key].count++

            return acc
        }, acc)
    }, {}),
)

const gridToStr = R.curry((coords, bounds, grid) => {
    const nextCode = code => {
        return code[1] === 90
            ? [code[0] + 1, 65]
            : [code[0], code[1] + 1]
    }

    const codeToStr = code => String.fromCharCode(code[0], code[1])

    const coordsToCodes = coords => {
        let code = [65, 65]

        return coords.reduce((acc, u) => {
            acc[keyFromCoord(u)] = codeToStr(code)

            code = nextCode(code)

            return acc
        }, {})
    }

    const coordCodes = coordsToCodes(coords)

    for(let y = bounds.t; y <= bounds.b; y++) {
        for(let x = bounds.l; x <= bounds.r; x++) {
            const coord = grid[x][y]

            if(coord === null) {
                process.stdout.write(`[..]`)
            }
            else {
                const code = coord.distance === 0
                    ? coordCodes[keyFromCoord(coord)]
                    : coordCodes[keyFromCoord(coord)].toLowerCase()

                process.stdout.write(`[${code}]`)
            }
        }

        process.stdout.write("\n")
    }

    return grid
})

const removeInfiniteFromGrid = grid => {
    const infiniteCoordKeys = R.map(keyFromCoord, getInfiniteCoords(grid, bounds))

    return grid.map((u, x) => {
        return u.map((v, y) => {
            if(v === null) return null

            const key = keyFromCoord(v)

            return infiniteCoordKeys.includes(key)
                ? null
                : v
        })
    })
}

function report(x) {
    console.log(x)
    return x
}

const coords = R.compose(
    R.map(lineToCoord),
    R.filter(x => !!x),
    R.map(R.trim),
    R.split('\n'),
)(input)

const bounds = getBounds(coords)

R.compose(
    report,
    R.prop('count'),
    getMostArea,
    removeInfiniteFromGrid,
)(fillGrid(coords, bounds))
