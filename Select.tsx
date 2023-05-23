import React, { ChangeEvent, forwardRef, Fragment, SelectHTMLAttributes } from 'react';
import classNames from 'classnames';
import { UseFormRegisterReturn } from 'react-hook-form';
import { formatDatetime } from '@/utils/helper';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  containerClassName?: string;  
  inputClassName?: string;
  label?: string;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isRequired?: boolean;
  errorMessage?: string; 
  options?: any[];
  hasDefaultOption?: boolean;
  loading?: boolean;
  handleChange?: (e:ChangeEvent<HTMLSelectElement>) => any;
  register?: UseFormRegisterReturn;
  params?: {
    key: string;
    value: string;
    valueTwo?: string;
    valueType?: "text"|"date";
  }
}

// eslint-disable-next-line react/display-name
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      containerClassName = 'flex flex-col',
      inputClassName = 'w-full px-4 py-2 border rounded-md',
      label,
      isDisabled,
      isInvalid,
      errorMessage,
      isRequired,
      options = [],
      hasDefaultOption = true,
      loading,
      handleChange = () => {},
      register,
      params,
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
        <select
          ref={ref}
          {...register}
          onChange={e => {
            handleChange(e)
            register?.onChange(e)
          }}
          className={classNames(
            inputClassName,
            {
              'bg-gray-100 cursor-not-allowed': isDisabled,
              'border-red-500': isInvalid,
            },
            `border-0  focus:outline-none outline-none relative ${loading && 'opacity-20'}`
          )}
          disabled={isDisabled}
          aria-invalid={isInvalid}
          required={isRequired}
          {...rest}
        >
          
          {hasDefaultOption && <option value=""></option>}
          {options?.map((option,i) => {
            return <Fragment key={i}>
              {!params && <option data-set={option} value={i === 0 ? undefined:option} key={i}>{option}</option>}
              {params && <option value={option[params.key]} key={i}>

                {params.valueType === 'date' ? 
                <>
                  {formatDatetime(option[params.value])?.replace('à 00:00','')} au {params.valueTwo && formatDatetime(option[params.valueTwo])?.replace('à 00:00','')}
                </> :
                <>
                  {option[params.value]} {params.valueTwo && option[params.valueTwo]}
                </>
              }
              </option>}
            </Fragment>
          })}
        </select>
        {isInvalid && (
          <p className="mt-2 text-sm font-medium text-red-500">{errorMessage}</p>
        )}
      </div>
    );
  }
);

export default Select;

