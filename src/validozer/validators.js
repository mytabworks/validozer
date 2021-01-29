import {is} from './utils'

const validators = {
    alpha: {
        regexp: /^[A-Za-z]+$/,
        exe({received}) {
            return received.length && !this.regexp.test(received);
        },
    },

    numeric: {
        exe({received}) {
            return (is.num(received) || received.length) && isNaN(received);
        },
    },

    email: {
        regexp: /^[\w.]{2,40}@[\w]{2,20}\.[a-z]{2,3}(?:\.[a-z]{2})?$/,
        exe({received}) {
            return received.length && !this.regexp.test(received);
        },
    },

    max: {
        exe({received, parameter}) {
            const max = parseFloat(parameter);

            return !Array.isArray(received) && !isNaN(received)
                ? parseFloat(received) > max
                : received.length && received.length > max;
        },
    },

    min: {
        exe({received, parameter}) {
            const min = parseFloat(parameter);

            return !Array.isArray(received) && !isNaN(received)
                ? parseFloat(received) < min
                : received.length && received.length < min;
        },
    },

    required: {
        exe({received}) {
            return is.num(received) ? false : !received.length;
        },
    },

    mimes: {
        exe({received, parameter}) {
            return !Array.from(received).every((file) => {
                const filename = file.name.split('.');
                return parameter.includes(filename[filename.length - 1].toLowerCase());
            });
        },
    },
    
    alpha_space: {
        regexp: /^[A-Za-z\s]+$/,
        exe({received}) {
            return received.length && !this.regexp.test(received);
        },
    },

    alpha_slug: {
        regexp: /^[a-zA-Z\d_]+$/,
        exe({received}) {
            return received.length && !this.regexp.test(received);
        },
    },

    alpha_dash: {
        regexp: /^[a-zA-Z\d-]+$/,
        exe({received}) {
            return received.length && !this.regexp.test(received);
        },
    },

    alpha_num: {
        regexp: /^[a-zA-Z\d]+$/,
        exe({received}) {
            return received.length && !this.regexp.test(received);
        },
    },

    url: {
        regexp: /^(?:https?:\/\/)?([a-z]{3}\.)?([a-z]{3,20}\.)?[\w]{3,20}\.[a-z]{2,3}(?:\/.*)?$/,
        exe({received}) {
            return received.length && !this.regexp.test(received);
        },
    },

    max_size: {
        exe({received, parameter}) {
            const max_size = parseInt(parameter);
            return (
                received.length &&
                Array.from(received).some((value) => value.size / 1000 > max_size)
            );
        },
    },

    min_size: {
        exe({received, parameter}) {
            const min_size = parseInt(parameter);
            return (
                received.length &&
                Array.from(received).some((value) => value.size / 1000 < min_size)
            );
        },
    },

    required_if: {
        exe({received, parameter, parameter_value, data}) {
            const other_value = data[parameter]
            
            if(Array.isArray(other_value)) {
                return !received.length && other_value.some(
                    (val) => new RegExp(`^${parameter_value.trim()}$`).test(val)
                )
            }
            return (
                !received.length && new RegExp(`^${parameter_value.trim()}$`).test(other_value)
            );
        },
    },

    same: {
        exe({received, parameter, data}) { 
            return received.length && data[parameter] !== received;
        },
    },
};

export default validators