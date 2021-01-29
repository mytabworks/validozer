import validators from './validators';
import messages from './messages';
import { is } from './utils';
export default class Validozer {
    data;
    rules;
    messages = [] 

    static rulesExtend(extension) {
        if(!is.obj(extension)) {
            throw new Error(`Invalid rule extention`);
        }
        Object.keys(extension).forEach((extname) => {
            const { message, ...validator } = extension[extname]
            if(!is.fnc(validator.exe)) {
                throw new Error(`Invalid rule extention method \`exe\` is missing in rule \`${extname}\``);
            }
            Object.assign(messages, { [extname]: message });
            Object.assign(validators, { [extname]: validator });
        })
    }
    
    static rulesUpdateMessage(name, message) {
        if (!validators[name]) {
            throw new Error(`"${name}" is not part of Validozer rules`);
        }
        messages[name] =
            is.obj(message) && ['min', 'max'].includes(name)
                ? { ...messages[name], ...message }
                : message;
    }
    
    static validate(received = "", rules, attribute, data) {
        const array_rules = rules.split('|');
        let catch_name, catch_param, catch_value;
        const isInvalid = array_rules.some((validation) => { 
            const [name, param, value] = validation.split(/:|=/);
            catch_name = name;
            catch_param = param;
            catch_value = value;
            if (!validators[name])
                throw new TypeError(
                    `Validozer does not recognize rule \`${name}\` in \`${attribute}\``
                ); 

            return validators[name].exe({ 
                received, 
                data,
                parameter: param && param.split('@')[0],
                parameter_value: value && value.split('@')[0],
            })
        });
    
        if (isInvalid || validators[catch_name].allowMessageEvenValid) {
            let messageFromstack = messages[catch_name] || validators[catch_name].message || `The :attribute is ${catch_name}`;
            let message;
            if (messageFromstack.toString() === '[object Object]') {
                if (!Array.isArray(received) && !isNaN(received)) {
                    messageFromstack = messageFromstack.numeric;
                } else if (typeof received === 'string') {
                    messageFromstack = messageFromstack.string;
                } else if (Array.isArray(received)) {
                    messageFromstack = messageFromstack.array;
                } else {
                    messageFromstack = messageFromstack.file;
                }
            }
    
            message = messageFromstack.replace(':attribute', attribute);
    
            if (catch_param) {
                if (catch_param.includes('@')) {
                    const [, alias] = catch_param.split('@');
                    catch_param = alias;
                }
                message = message.replace(
                    `:${catch_name}`,
                    (catch_param || '').replace(/,/g, ', ')
                );
            }
    
            if (catch_value) {
                if (catch_value.includes('@')) {
                    const [, alias] = catch_value.split('@');
                    catch_value = alias;
                }
                message = message.replace(':value', catch_value);
            }
    
            return {
                isInvalid,
                message,
                failedIn: isInvalid ? catch_name : null,
            };
        }
    
        return { isInvalid, failedIn: null };
    }

    static make(data, rules) {
        const instance = new Validozer() 
        instance.data = data
        instance.rules = rules
        return instance
    }

    fails() {
        let isFail = false;

        this.messages = Object.keys(this.rules)
            .map((name) => {
                const { rules, label } = this.rules[name];
                const validate = Validozer.validate(
                    this.data[name],
                    rules,
                    label || name,
                    this.data
                );
                if (validate.isInvalid && !isFail) {
                    isFail = true;
                }
                return [name, validate.message];
            })
            .filter(([, message]) => !!message);

        return isFail;
    }

    errors() {
        return new Map(this.messages);
    }
}
