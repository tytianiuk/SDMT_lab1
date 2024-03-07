'use strict'

const { readFile, writeFile } = require('./fileSystem.js')

const main = () => {
    const args = process.argv.slice(2)
    const inputFilePath = args[0]
    const outputFlagIndex = args.indexOf('--out')
    const outputFilePath = outputFlagIndex === 1 ? args[outputFlagIndex + 1] : 0

    const data = readFile(inputFilePath)

    if (outputFilePath) {
        writeFile(outputFilePath, data)
    } else {
        console.log(data)
    }
}

main()