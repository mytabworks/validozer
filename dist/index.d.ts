declare module 'validozer';

export type ExePropTypes = { 
    received?: any;
    data?: any;
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

export type RuleType = {
    label: string;
    rules: string;
}

export type NestedRuleType = {
    [name: string]: RuleType
}

export type DataType = {
    [name: string]: any;
}

export interface ValidozerInstanceType {
    fails(): boolean;
    errors(): Map<any, any>;
}

export interface ValidozerType {
    (): ValidozerInstanceType;
    make(data: DataType, rules: NestedRuleType): ValidozerInstanceType;
    rulesExtend(extension: RuleExtention): void;
    rulesUpdateMessage(ruleName: string, message: string | { [name: string]: string }): void;
    validate(received: any, rules: string, attribute: string, data: DataType): {
        isInvalid: boolean;
        message?: string;
        failedIn: string | null;
    };
}

declare const Validozer: ValidozerType

export default Validozer;