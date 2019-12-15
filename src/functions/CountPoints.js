export default function countPoints(
        event, 
        char, 
        attribute,
        starting, 
        conditional
    ) {
    let pointCount = pointTally(char, attribute)
    let remaining = starting - pointCount
    if (remaining < 0 || conditional) {
        char[attribute][event.target.name].score -= 1
        event.target.value -= 1
        remaining = starting - pointTally(char, attribute)
        console.log('Remaining: ', remaining)
    }
    char.updateProps()
    return remaining
}

function pointTally(char, attribute) {
    let pointCount = 0
    Object.keys(char[attribute]).forEach((a) => {
        pointCount += char[attribute][a].score
    })
    return pointCount
}

// TODO: Needs work. Gets stuck in infinite loops. Probably due to "conditional" parameter.