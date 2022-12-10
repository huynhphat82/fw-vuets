<script setup lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate';
import * as yup from 'yup';

const schema = yup.object().shape({
  password: yup.string().min(5).required(),
  passwordConfirmation: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

const onSubmit = (values) => {
  alert(JSON.stringify(values, null, 2));
};
</script>

<template>
  <div>
    <h1>vee-validate cross-field Validation</h1>

    <Form @submit="onSubmit" :validation-schema="schema">
      <p>
        These inputs use `yup` to perform validation. The confirmation field
        makes use of <strong>`yup.string.oneOf`</strong> rule with
        <strong>`Yup.ref`</strong> to target another field's value.
      </p>

      <div>
        <label for="password">Password</label>
        <br />
        <Field id="password" name="password" type="password" />
        <br />
        <ErrorMessage name="password" class="error" />
      </div>

      <div>
        <label for="passwordConfirmation">Confirm Password </label>
        <br />
        <Field
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="password"
        />
        <br />
        <ErrorMessage name="passwordConfirmation" class="error" />
      </div>
      <button type="submit">Submit</button>
    </Form>
  </div>
</template>

<style scoped>
.error {
  color: red;
}
</style>
