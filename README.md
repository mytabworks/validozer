# validozer
a javascript validation inspired by laravel validator.

- [Validozer](#validator)
    - [Basic Usage](#basic-usage)
    - [Extend Rules Usage](#extend-rule-usage)
    - [Collection Field Usage](#collection-field-usage)
    - [Rules](#rules)
- [License](#license)
  
### Basic Usage
```js
import Validozer from "mytabworks-utils";

const result = Validozer.validate("sample_sadas@", "required|email|min:10|max:20", "E--mail")

console.log(result) 
/*{ isInvalid: true, message: "The E--mail must be a valid email"}*/
```
> Note! rules must be tight on each other without spaces.

### Extend Rule Usage
Validozer rules is extensible which is custom rules are applicable.

> Note! validation rules are reusable, when rules are extended, it only need to be extended once or else it will be overidden.

> Note! the rules example below are already part of the Validozers validation it is only an insight on how to make your own rules

> Note! on `exe` returning `true` means it is invalid

```js
import Validozer from "mytabworks-utils";

const required = {
    exe({received}) {
        return !received.length;
    },
    required: 'The :attribute field is required.',
}

const url = {
    exe({received}) {
        const expression = /^(?:https?:\/\/)?([a-z]{3}\.)?([a-z]{3,20}\.)?[\w]{3,20}\.[a-z]{2,3}(?:\/.*)?$/
        return received.length && !expression.test(received);
    },
    message: "The :attribute must be a valid url"
}

const required_if = {
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
    required_if: 'The :attribute field is required when :required_if is :value.',
}

const same = {
    exe({received, parameter, data}) { 
        return received.length && data[parameter] !== received;
    },
    same: 'The :attribute and :same must match.',
}

Validozer.rulesExtend({ required, url, required_if, same })
```

## Collection Field Usage
it can validate collections of form fields.

```js
const data = {
    first_name: "john",
    last_name: "doe",
    password: "bwadpit",
    confirm_passowrd: "bwadpit",
    email: "johndoe@gmail",
    web: "mytabworks.com",
}

const rules = {
    first_name: { 
        label: "First Name", 
        rules: "required|alpha" 
    },
    last_name: { 
        label: "Last Name", 
        rules: "required|alpha|min:3" 
    },
    password: { 
        label: "Password", 
        rules: "required|min:8" 
    },
    confirm_password: { 
        label: "Confirm Password", 
        rules: "required|same:password" 
    },
    email: { 
        label: "E-mail", 
        rules: "required|email"
    },
    web: { 
        label: "Website", 
        rules: "url"
    }
}

const validator = Validozer.make(data, rules)

if(validator.fails()) {

    const error_messages = validator.errors()
 
}
```

> Note! `validator.errors()` will return [`new Map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

## Rules
The main validation rules which is commonly use.
|NAME           |HOW TO USE                      |DESCRIPTION| MESSAGE |
|-------------|---------------------------|-------------|-------------|
| required    | required                  | it will require the form field to be filled| The :attribute field is required |
| email       | email                     | it will validate if the field contain a valid e-mail| The :attribute field must be valid email|
| min         | min:<number>              | it will validate the minumum character, number, checkbox is checked, select(multiple) is selected, file(multiple) is selected. `e.g. min:10` | The :attribute field must be atleast :min (character, items, files) |
| max         | max:<number>              | it will validate the maximum character, number, checkbox is checked, select(multiple) is selected, file(multiple) is selected. `e.g. max:20` | The :attribute field may not be greater than :max (character, items, files) |
| mimes       | mimes:<mime_types>        | it will validate the specific mimes of the files which are allowed. `e.g. mimes:jpg,pdf,rar`| The :attribute only allows :mimes|
| alpha       | alpha                     | it will validate if the field value is only contain letter | The :attribute may only contain letters|
| alpha_space | alpha_space       | it will validate if the field only contain letters with spaces | The :attribute must contain alphabet with spaces |
| alpha_num   | alpha_num                   | it will validate if the field contain letters with numbers| The :attribute may only contain letters and numbers.|
| alpha_dash  | alpha_dash                  | it will validate if the field contain letters with numbers and dashes | The :attribute may only contain letters, numbers, and dashes.|
| url         | url                         | it will validate if the field contain valid url | The :attribute must be a valid url. |
| max_size    | max_size:<number>           | it will validate if the field contain a maximum file size and the size must calculate in kilobytes. `e.g. max_size:5000`| The :attribute may not be greater :max_size kilobytes.|
| min_size    | min_size:<number>           | it will validate if the field contain a minimum file size and the size must calculate in kilobytes. `e.g. min_size:1000`| The :attribute must be atleast :min_size kilobytes.|
| required_if | required_if:<target_field_name>=<target_expected_value> | it will require the field, if the target field matches the expected value. you can use exact value or regular expression like `required_if:bio=.+`. `.+` means has any value. `e.g. required_if:country=AU` since most of the time field names are not the same as the labels and same with the values label. that is why you can use Aliasing(@) `e.g. required_if:country@Country=AU@Australia`  | The :attribute field is required when :required_if is :third_party. | 
| same        | same:<target_field_name>               | it will validate the field until the target field contain the same value. `e.g. same:pass` since most of the time field names are not the same as the labels you can use Aliasing(@) `e.g. same:pass@Password` | The :attribute and :same must match. |

### License
MIT Licensed. Copyright (c) fernandto tabamo jr (Mytabworks) 2020.