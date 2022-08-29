import { ExePropTypes } from "./type";

const validators = {
    alpha: {
        regexp: /^[A-Za-z]+$/,
        exe({received}: ExePropTypes) {
            return received.length && !this.regexp.test(received);
        },
    },

    numeric: {
        exe({received}: ExePropTypes) {
            return `${received}`.length > 0 && isNaN(received);
        },
    },

    email: {
        regexp: /^[\w.]{2,40}@[\w]{2,20}\.[a-z]{2,3}(?:\.[a-z]{2})?$/,
        exe({received}: ExePropTypes) {
            return received.length && !this.regexp.test(received);
        },
    },

    max: {
        exe({received, parameter}: ExePropTypes) {
            const max = parseFloat(parameter!);

            return !Array.isArray(received) && !isNaN(received)
                ? received && parseFloat(received) > max
                : received.length && received.length > max;
        },
    },

    min: {
        exe({received, parameter}: ExePropTypes) {
            const min = parseFloat(parameter!);

            return !Array.isArray(received) && !isNaN(received)
                ? received && parseFloat(received) < min
                : received.length && received.length < min;
        },
    },

    required: {
        exe({received}: ExePropTypes) {
            return typeof received !== 'number' && (typeof received === 'undefined' || received === null || !received.length);
        },
    },

    mimes: {
        exe({received, parameter}: ExePropTypes) {
            return !Array.from(received as FileList).every((file) => {
                const filename = file.name.split('.');
                return parameter!.includes(filename[filename.length - 1].toLowerCase());
            });
        },
    },
    
    alpha_space: {
        regexp: /^[A-Za-z\s]+$/,
        exe({received}: ExePropTypes) {
            return received.length && !this.regexp.test(received);
        },
    },

    alpha_slug: {
        regexp: /^[a-zA-Z\d_]+$/,
        exe({received}: ExePropTypes) {
            return received.length && !this.regexp.test(received);
        },
    },

    alpha_dash: {
        regexp: /^[a-zA-Z\d-]+$/,
        exe({received}: ExePropTypes) {
            return received.length && !this.regexp.test(received);
        },
    },

    alpha_num: {
        regexp: /^[a-zA-Z\d]+$/,
        exe({received}: ExePropTypes) {
            return received.length && !this.regexp.test(received);
        },
    },

    url: {
        regexp: /^(?:https?:\/\/)?([a-z]{3}\.)?([a-z]{3,20}\.)?[\w]{3,20}\.[a-z]{2,3}(?:\/.*)?$/,
        exe({received}: ExePropTypes) {
            return received.length && !this.regexp.test(received);
        },
    },

    max_size: {
        exe({received, parameter}: ExePropTypes) {
            const max_size = parseInt(parameter!);
            return (
                received.length &&
                Array.from(received as FileList).some((value) => value.size / 1000 > max_size)
            );
        },
    },

    min_size: {
        exe({received, parameter}: ExePropTypes) {
            const min_size = parseInt(parameter!);
            return (
                received.length &&
                Array.from(received as FileList).some((value) => value.size / 1000 < min_size)
            );
        },
    },

    required_if: {
        exe({received, parameter, parameter_value, data}: ExePropTypes) {
            const other_value = data![parameter!]
            
            if(Array.isArray(other_value)) {
                return !received.length && other_value.some(
                    (val) => new RegExp(`^${parameter_value!.trim()}$`).test(val)
                )
            }
            return (
                !received.length && new RegExp(`^${parameter_value!.trim()}$`).test(other_value)
            );
        },
    },

    same: {
        exe({received, parameter, data}: ExePropTypes) { 
            return received.length && data![parameter!] !== received;
        },
    },
};

export default validators