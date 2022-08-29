export type RuleType = {
    label: string;
    rules: string;
}

export type ExePropTypes = { 
    received?: any;
    data?: Record<string, any>;
    parameter?: string;
    parameter_value?: string;
}

export type RuleExtention = {
    [name: string]: {
        allowMessageEvenValid?: boolean;
        message: string;
        exe: (props: ExePropTypes) => boolean;
    }
}