
export const prettify = (json: string|object): string => JSON.stringify(json, null, 2)

const compareJson = (json: string|object, compare: string|object, sortFn: (a: number, b: number) => {} | undefined) => {
    const ADDITION = 'addition'
    const SUBTRACTION = 'subtraction'

    if (typeof json !== 'string') {
        json = JSON.stringify(json, null, 2)
    }

    if (typeof compare !== 'string') {
        compare = JSON.stringify(compare, null, 2)
    }

    const data = [json.split('\n'), compare.split('\n')]
    const longest: number = data[0].length > data[1].length ? 0 : 1
    const shortest: number = longest === 1 ? 0 : 1

    let result: string = ''
    data[longest].forEach((line: string, index: number) => {
        // if (line)
    })
}
