import { ExePropTypes } from "./type";
declare const validators: {
    alpha: {
        regexp: RegExp;
        exe({ received }: ExePropTypes): boolean;
    };
    numeric: {
        exe({ received }: ExePropTypes): boolean;
    };
    email: {
        regexp: RegExp;
        exe({ received }: ExePropTypes): boolean;
    };
    max: {
        exe({ received, parameter }: ExePropTypes): boolean;
    };
    min: {
        exe({ received, parameter }: ExePropTypes): boolean;
    };
    required: {
        exe({ received }: ExePropTypes): boolean;
    };
    mimes: {
        exe({ received, parameter }: ExePropTypes): boolean;
    };
    alpha_space: {
        regexp: RegExp;
        exe({ received }: ExePropTypes): boolean;
    };
    alpha_slug: {
        regexp: RegExp;
        exe({ received }: ExePropTypes): boolean;
    };
    alpha_dash: {
        regexp: RegExp;
        exe({ received }: ExePropTypes): boolean;
    };
    alpha_num: {
        regexp: RegExp;
        exe({ received }: ExePropTypes): boolean;
    };
    url: {
        regexp: RegExp;
        exe({ received }: ExePropTypes): boolean;
    };
    max_size: {
        exe({ received, parameter }: ExePropTypes): boolean;
    };
    min_size: {
        exe({ received, parameter }: ExePropTypes): boolean;
    };
    required_if: {
        exe({ received, parameter, parameter_value, data }: ExePropTypes): boolean;
    };
    same: {
        exe({ received, parameter, data }: ExePropTypes): boolean;
    };
};
export default validators;
