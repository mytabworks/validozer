export const is = {
    obj: (a) => !!a && a !== '[object Object]' && a.toString() === '[object Object]',
    fnc: (a) => typeof a === 'function',
    und: (a) => typeof a === 'undefined',
    num: (a) => !isNaN(a) && typeof a === 'number',
}