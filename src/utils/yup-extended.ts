import * as yup from 'yup';

yup.addMethod<yup.StringSchema>(yup.string, 'emptyAsUndefined', function () {
  return this.transform((value) => (value ? value : undefined));
});

yup.addMethod<yup.NumberSchema>(yup.number, 'emptyAsUndefined', function () {
  return this.transform((value, originalValue) =>
    String(originalValue)?.trim() ? value : undefined,
  );
});

yup.addMethod<yup.StringSchema>(
  yup.string,
  'confirmationPassword',
  function (anotherField: string, message: string = 'Password do match') {
    return this.test('confirmation-password', message, function (value) {
      let anotherFieldValue = undefined;
      try {
        anotherFieldValue = String(anotherField)
          .split('.')
          .reduce((carry, key) => {
            carry = carry[key];
            return carry;
          }, this.parent);
      } catch (error) {
        // console.log(`${JSON.parse(JSON.stringify(this))['type']}: `, error);
      }
      if (!value && !anotherFieldValue) {
        return true;
      }
      return anotherFieldValue === value;
    });
  },
);

declare module 'yup' {
  // Declare types of new rules
  // interface StringSchema<
  //   TType extends Maybe<string> = string | undefined,
  //   TContext extends AnyObject = AnyObject,
  //   TOut extends TType = TType,
  // > extends yup.BaseSchema<TType, TContext, TOut> {
  //   emptyAsUndefined(): StringSchema<TType, TContext>;
  // }

  // interface NumberSchema<
  //   TType extends Maybe<number> = number | undefined,
  //   TContext extends AnyObject = AnyObject,
  //   TOut extends TType = TType,
  // > extends yup.BaseSchema<TType, TContext, TOut> {
  //   emptyAsUndefined(): NumberSchema<TType, TContext>;
  // }

  // interface StringSchema<
  //   TType extends Maybe<string> = string | undefined,
  //   TContext extends AnyObject = AnyObject,
  //   TOut extends TType = TType,
  // > extends yup.BaseSchema<TType, TContext, TOut> {
  //   confirmationPassword(
  //     anotherField: string,
  //     message?: string,
  //   ): StringSchema<TType, TContext>;
  // }

  interface NumberSchema {
    emptyAsUndefined(): yup.NumberSchema;
  }

  interface StringSchema {
    emptyAsUndefined(): yup.StringSchema;
    // this = yup.StringSchema;
    confirmationPassword(anotherField: string, message?: string): this;
  }
}

export default yup;
