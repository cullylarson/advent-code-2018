const R = require('ramda')
const {get, liftA} = require('@cullylarson/f')

const input = require('./input')

const getMetas = (nodeList, numMeta, startIdx) => {
    return numMeta === 0
        ? {
            metas: [],
            endIdx: startIdx,
        }
        : {
            metas: R.slice(startIdx, startIdx + numMeta, nodeList),
            endIdx: startIdx + numMeta - 1,
        }
}

const getChildren = (nodeList, numChildren, startIdx) => {
    let children = []
    let nextChildIdx = startIdx

    for(let i = 0; i < numChildren; i++) {
        const childInfo = getNode(nextChildIdx, nodeList)
        children.push(childInfo.node)
        nextChildIdx = childInfo.endIdx + 1
    }

    return {
        children,
        endIdx: children.length ? nextChildIdx - 1 : startIdx,
    }
}

const createNode = (metas, children) => ({
    metas,
    children,
})

const getNode = R.curry((startIdx, nodeList) => {
    const numChildren = nodeList[startIdx]
    const numMeta = nodeList[startIdx + 1]

    const childrenInfo = getChildren(nodeList, numChildren, startIdx + 2)

    const metasStartIdx = numChildren === 0
        ? startIdx + 2
        : childrenInfo.endIdx + 1

    const metasInfo = getMetas(nodeList, numMeta, metasStartIdx)

    return {
        node: createNode(metasInfo.metas, childrenInfo.children),
        endIdx: metasInfo.endIdx,
    }
})

const sumAllMeta = node => {
    return node.children.length === 0
        ? R.sum(node.metas)
        : R.sum(node.metas) + R.sum(R.map(sumAllMeta, node.children))
}

function report(x) {
    console.log(x)
    return x
}

const reportM = R.curry((msg, x) => {
    console.log(msg, x)
    return x
})

R.compose(
    report,
    sumAllMeta,
    get('node', null),
    getNode(0),
    R.map(x => parseInt(x)),
    R.filter(x => !!x),
    R.map(R.trim),
    R.split(' '),
)(input)
