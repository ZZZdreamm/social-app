import * as yup from 'yup'


const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,20}$/
export const basicSchema = yup.object().shape({
    email: yup.string().email('Enter valid email').required('Required'),
    password: yup.string().min(5).max(20).matches(passwordRules, {message: 'Create stronger password'}).required('Required')
})