declare module 'validozer';
import { RuleExtention, RuleType } from './esm/type';
export default class Validozer {
    data: Record<string, any>;
    rules: Record<string, RuleType>;
    messages: Array<[string, string]>;
    static rulesExtend(extension: RuleExtention): void;
    static rulesUpdateMessage(name: string, message: string | {
        [name: string]: string;
    }): void;
    static validate(received: any, rules: string, attribute: string, data: Record<string, any>): {
        isInvalid: boolean;
        failedIn: null | string;
        message?: null | string;
    };
    static make(data: Record<string, any>, rules: Record<string, RuleType>): Validozer;
    fails(): boolean;
    errors(): Map<string, string>;
    errorsJSON(): Array<{
        field: string;
        message: string;
    }>;
}
