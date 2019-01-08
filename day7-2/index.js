const R = require('ramda')
const {map, filter, set, get} = require('@cullylarson/f')

const input = require('./input')

const lineToRequires = R.compose(
    // first item requires second item
    x => ([x[7], x[1]]),
    R.split(' '),
)

const augRequirements = R.reduce((acc, x) => {
    acc[x[0]].reqs.push(x[1])

    return acc
})

const buildLettersList = R.compose(
    R.reduce((acc, x) => set(x, {reqs: [], busy: false}, acc), {}),
    R.flatten,
)

const getAvailableSteps = R.compose(
    xs => xs.sort(),
    R.keys,
    filter(x => x.reqs.length === 0 && !x.busy),
)

const removeByKey = R.curry((key, x) => {
    const { [key]: _, ...y } = x
    return y
})

const completeStep = R.curry((step, reqsByLetter) => {
    return R.compose(
        // remove step from each individual list
        map(x => set('reqs', R.filter(x => x !== step, x.reqs), x)),
        // remove the step from the reqs list itself
        removeByKey(step),
    )(reqsByLetter)
})

const getCompleteTime = (baseTime, step) => {
    const stepToTime = step => step.charCodeAt() - 64

    return baseTime + 60 + stepToTime(step)
}

const assignSteps = R.curry((steps, time, workers) => {
    const getFreeWorkerIdx = xs => {
        for(let i = 0; i < xs.length; i++) {
            if(xs[i].step === null) return i
        }

        return null
    }

    return R.reduce((acc, step) => {
        const freeWorkerIdx = getFreeWorkerIdx(acc)

        return freeWorkerIdx === null
            ? acc
            : set(freeWorkerIdx, {
                step,
                busyUntil: getCompleteTime(time, step),
            }, acc)
    }, workers, steps)
})

const getAssignedStepsFromWorkers = R.compose(
    R.flatten,
    R.filter(x => !!x),
    map(get('step', null)),
)

const getNextAvailableWorkerIdx = R.compose(
    get('idx', null),
    R.head,
    R.sort((a, b) => a.busyUntil - b.busyUntil),
    R.filter(x => x.step !== null),
    map((x, idx) => ({idx, ...x})),
)

const markStepsBusy = R.curry((reqsByLetter, steps) => {
    return R.reduce((acc, step) => {
        return set([step, 'busy'], true, acc)
    }, reqsByLetter, steps)
})

const haveBusyWorkers = R.compose(
    x => x.length > 0,
    R.filter(x => x.step !== null),
)

const doSequence = (workers, time, reqsByLetter) => {
    const steps = getAvailableSteps(reqsByLetter)

    if(!steps.length && !haveBusyWorkers(workers)) return time

    const workersAssigned = assignSteps(steps, time, workers)

    const nextCompleteStepInfo = R.compose(
        workers => {
            const nextAvailableWorkerIdx = getNextAvailableWorkerIdx(workers)

            return {
                time: workers[nextAvailableWorkerIdx].busyUntil,
                step: workers[nextAvailableWorkerIdx].step,
                workers: set(nextAvailableWorkerIdx, {step: null, busyUntil: null}, workers),
            }
        },
        assignSteps(steps, time),
    )(workers)

    const reqsByLetterUpdated = R.compose(
        completeStep(nextCompleteStepInfo.step),
        markStepsBusy(reqsByLetter),
        getAssignedStepsFromWorkers,
    )(nextCompleteStepInfo.workers)

    return doSequence(nextCompleteStepInfo.workers, nextCompleteStepInfo.time, reqsByLetterUpdated)
}

const buildWorkers = num => {
    const workers = []

    for(let i = 0; i < num; i++) {
        workers.push({
            step: null,
            busyUntil: null,
        })
    }

    return workers
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

const workers = buildWorkers(5)

const lettersList = buildLettersList(reqs)

const reqsByLetter = augRequirements(lettersList, reqs)

console.log(doSequence(workers, 0, reqsByLetter))
