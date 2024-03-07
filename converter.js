'use strict'

const regExpes = [
    {
        regExp: /```(?=\r?\n)([\s\S]+?)(?<=\r?\n)```(?=\r?\n)/u,
        tags: ['<pre>', '</pre>'],
        symbol: '------',
        length: 3,
    },
    {
        regExp: /\*\*(?=\S).+?(?<=\S)\*\*/u,
        tags: ['<b>', '</b>'],
        length: 2,
    },
    {
        regExp: /_(?=\S).+?(?<=\S)_/u,
        tags: ['<i>', '</i>'],
        length: 1,
    },
    {
        regExp: /`(?=\S).+?(?<=\S)`/u,
        tags: ['<tt>', '</tt>'],
        length: 1,
    },
]

const preData = []

const convert = (markdownText) => {
    for (const regExp of regExpes) {
        let textPart
        while ((textPart = markdownText.match(regExp.regExp)) != null) {
            const indexStart = textPart.index + regExp.length
            const indexEnd = textPart.index + textPart[0].length - regExp.length
            const formatedPart =
                regExp.tags[0] +
                markdownText.slice(indexStart, indexEnd) +
                regExp.tags[1]

            if (regExp.length === 3) {
                preData.push(formatedPart)
                markdownText = markdownText.replace(
                    regExp.regExp,
                    regExp.symbol,
                )
                continue
            }
            markdownText = markdownText.replace(regExp.regExp, formatedPart)
        }
    }
    return addParagraphs(addPre(markdownText, '------'))
}

const addParagraphs = (text) => {
    const paragraphs = text.split(/\r\n\r\n(?=.)/)

    const wrappedParagraphs = paragraphs.map(
        (paragraph) => `<p>${paragraph}</p>`,
    )

    return wrappedParagraphs.join('\n')
}

const addPre = (text, symbol) => {
    for (const tag of preData) {
        text = text.replace(symbol, tag)
    }
    return text
}

module.exports = { convert }