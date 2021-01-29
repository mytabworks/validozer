export const is = {
    obj: (a) => !!a && a !== '[object Object]' && a.toString() === '[object Object]',
    fnc: (a) => typeof a === 'function'
}