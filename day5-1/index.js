const R = require('ramda')

const input = require('./input')

// can't do this recursively because it exceeds the max call stack size
const doReaction = x => {
    let i = 0

    while(i < x.length - 1) {
        const current = x.charAt(i)
        const next = x.charAt(i + 1)

        if(current !== next && (current.toUpperCase() === next || current.toLowerCase() === next)) {
            x = x.substring(0, i) + x.substring(i + 2)
        }
        // only go to next index if nothing happens. if something happens, might be
        // another section to remove at this index now, so will want to check again.
        else {
            i++
        }
    }

    return x
}

const doAllReactions = x => {
    const next = doReaction(x)

    return next === x
        ? x
        : doAllReactions(next)
}

const result = doAllReactions(input)

console.log(result.length)
