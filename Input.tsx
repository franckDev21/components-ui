import React, { forwardRef, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  inputClassName?: string;
  label?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      containerClassName = 'flex flex-col',
      inputClassName = 'w-full px-4 py-2 border rounded-md',
      label,
      isDisabled,
      isInvalid,
      errorMessage,
      isRequired,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={containerClassName}>
        {label && (
          <label
            className="mb-2 text-sm font-medium text-gray-700"
            htmlFor={rest.id}
          >
            {label}
            {isRequired && <span className="text-red-500">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={classNames(
            inputClassName,
            {
              'bg-gray-100 cursor-not-allowed': isDisabled,
              'border-red-500': isInvalid,
            },
            'border-0  focus:outline-none outline-none'
          )}
          disabled={isDisabled}
          aria-invalid={isInvalid}
          required={isRequired}
          {...rest}
        />
        {isInvalid && (
          <p className="mt-2 text-sm font-medium text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);

export default Input;