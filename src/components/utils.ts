export const is = {
    obj: (a: any) => !!a && a !== '[object Object]' && a.toString() === '[object Object]',
    fnc: (a: any) => typeof a === 'function'
}