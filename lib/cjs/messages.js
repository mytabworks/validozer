const messages = {
  alpha: 'The :attribute may only contain letters.',
  numeric: 'The :attribute may only contain numbers.',
  email: 'The :attribute must be a valid email.',
  max: {
    numeric: 'The :attribute may not be greater than :max.',
    file: 'The :attribute may not be greater than :max files.',
    string: 'The :attribute may not be greater than :max characters.',
    array: 'The :attribute may not be greater than :max items.'
  },
  min: {
    numeric: 'The :attribute must be atleast :min.',
    file: 'The :attribute must be atleast :min files.',
    string: 'The :attribute must be atleast :min characters.',
    array: 'The :attribute must be atleast :min items.'
  },
  required: 'The :attribute field is required.',
  mimes: 'The :attribute only allow :mimes.',
  alpha_space: 'The :attribute must contain letters with spaces.',
  alpha_slug: 'The :attribute may only contain letters, numbers, and underscores.',
  alpha_dash: 'The :attribute may only contain letters, numbers, and dashes.',
  alpha_num: 'The :attribute may only contain letters and numbers.',
  url: 'The :attribute must be a valid url.',
  max_size: 'The :attribute may not be greater :max_size kilobytes.',
  min_size: 'The :attribute must be atleast :min_size kilobytes.',
  required_if: 'The :attribute field is required when :required_if is :value.',
  same: 'The :attribute and :same must match.'
};
export default messages;