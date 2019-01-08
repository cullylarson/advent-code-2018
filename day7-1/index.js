const R = require('ramda')
const {map, filter, set} = require('@cullylarson/f')

const input = require('./input')

const lineToRequires = R.compose(
    // first item requires second item
    x => ([x[7], x[1]]),
    R.split(' '),
)

const augRequirements = R.reduce((acc, x) => {
    acc[x[0]].push(x[1])

    return acc
})

const buildLettersList = R.compose(
    R.reduce((acc, x) => set(x, [], acc), {}),
    R.flatten,
)

const getNextAvailable = R.compose(
    xs => xs.length ? R.head(xs) : null,
    xs => xs.sort(),
    R.keys,
    filter(x => x.length === 0),
)

const removeByKey = R.curry((key, x) => {
    const { [key]: _, ...y } = x
    return y
})

const doStep = (reqsByLetter, step) => {
    return R.compose(
        // remove step from each individual list
        map(R.filter(x => x !== step)),
        // remove the step from the reqs list itself
        removeByKey(step),
    )(reqsByLetter)
}

const doSequence = reqsByLetter => {
    const step = getNextAvailable(reqsByLetter)
    return step === null
        ? ''
        : step + doSequence(doStep(reqsByLetter, step))
}

function report(x) {
    console.log(x)
    return x
}

const reqs = R.compose(
    R.map(lineToRequires),
    R.filter(x => !!x),
    R.map(R.trim),
    R.split('\n'),
)(input)

const lettersList = buildLettersList(reqs)

const reqsByLetter = augRequirements(lettersList, reqs)

console.log(doSequence(reqsByLetter))
