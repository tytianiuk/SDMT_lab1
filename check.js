'use strict'

const { STRINGS } = require('./strings')

const checkingArgs = (inputFilePath, outputFlagIndex, outputFilePath) => {
    if (process.argv.length === 3) {
        if (!inputFilePath.includes('.md')) {
            console.log(STRINGS.errThreeArgs)
            process.exit(1)
        }
    } else if (process.argv.length === 5) {
        if (!outputFilePath.includes('.html') || outputFlagIndex !== 1) {
            console.log(STRINGS.errFiveArgs)
            process.exit(1)
        }
    } else {
        console.log(STRINGS.errArgs)
        process.exit(1)
    }
}

module.exports = { checkingArgs }
