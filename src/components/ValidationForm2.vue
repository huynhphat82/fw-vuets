<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

yup.addMethod(yup.string, 'confirmationPassword', function (...args) {
  const [anotherField, message] = args;
  console.log('args => ', anotherField, message);
  return this.test('confirmation-password', message, function (value) {
    // const { path, createError } = this;
    // [value] - value of the property being tested
    // [path]  - property name,
    console.log('value => ', value, anotherField, this.parent.password);
    return `${anotherField}` == value;
  });
});

const { handleSubmit, errors } = useForm({
  validationSchema: yup.object({
    user: yup.object({
      name: yup.string().required(),
      addresses: yup.array().of(yup.string().required()),
    }),
    password: yup.string().min(5).required(),
    confirmationPassword: yup
      .string()
      .required()
      .confirmationPassword('password', 'xxxxxx'),
    // .oneOf([yup.ref('password')], 'Passwords do not match'),
  }),
});

const { value: name } = useField('user.name');
const { value: address } = useField('user.addresses[0]');
const { value: password } = useField('password');
const { value: confirmationPassword } = useField('confirmationPassword');

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>

<template>
  <form @submit="onSubmit">
    <input v-model="name" />
    <span>{{ errors['user.name'] }}</span>
    <input v-model="address" />
    <span>{{ errors['user.addresses[0]'] }}</span>

    <div>
      <label>Password</label>
      <br />
      <input type="password" v-model="password" />
      <span>{{ errors.password }}</span>
    </div>
    <div>
      <label>Confirmation Password</label>
      <br />
      <input type="password" v-model="confirmationPassword" />
      <span>{{ errors.confirmationPassword }}</span>
    </div>
    <button>Submit</button>
  </form>
</template>

<style scoped>
.error {
  color: red;
}
</style>
