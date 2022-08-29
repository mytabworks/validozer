export declare type RuleType = {
    label: string;
    rules: string;
};
export declare type ExePropTypes = {
    received?: any;
    data?: Record<string, any>;
    parameter?: string;
    parameter_value?: string;
};
export declare type RuleExtention = {
    [name: string]: {
        allowMessageEvenValid?: boolean;
        message: string;
        exe: (props: ExePropTypes) => boolean;
    };
};
