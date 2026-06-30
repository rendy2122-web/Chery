'use client'

import { useState, useCallback } from 'react'

interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'min' | 'max' | 'url'
  value?: number | string | RegExp
  message: string
}

interface FormFieldProps {
  name: string
  label: string
  type?: 'text' | 'number' | 'email' | 'url' | 'textarea' | 'select' | 'datetime-local' | 'checkbox'
  placeholder?: string
  defaultValue?: string | number | boolean
  value?: string | number | boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
  required?: boolean
  disabled?: boolean
  rows?: number
  options?: { label: string; value: string }[]
  helperText?: string
  validation?: ValidationRule[]
  className?: string
}

export default function FormField({
  name,
  label,
  type = 'text',
  placeholder,
  defaultValue,
  value,
  onChange,
  required = false,
  disabled = false,
  rows = 3,
  options,
  helperText,
  validation,
  className = '',
}: FormFieldProps) {
  const [touched, setTouched] = useState(false)
  const [error, setError] = useState('')
  const [fieldValue, setFieldValue] = useState(defaultValue ?? value ?? (type === 'checkbox' ? false : ''))

  const validate = useCallback((val: string | number | boolean): string => {
    if (!validation) return ''

    const strVal = String(val)
    for (const rule of validation) {
      switch (rule.type) {
        case 'required':
          if (!val && val !== false) return rule.message
          if (type !== 'checkbox' && !strVal.trim()) return rule.message
          break
        case 'minLength':
          if (strVal.length < (rule.value as number)) return rule.message
          break
        case 'maxLength':
          if (strVal.length > (rule.value as number)) return rule.message
          break
        case 'min':
          if (Number(val) < (rule.value as number)) return rule.message
          break
        case 'max':
          if (Number(val) > (rule.value as number)) return rule.message
          break
        case 'pattern':
          if (rule.value instanceof RegExp && !rule.value.test(strVal)) return rule.message
          break
        case 'url':
          if (strVal && !/^https?:\/\/.+/.test(strVal) && !strVal.startsWith('/')) return rule.message
          break
      }
    }
    return ''
  }, [validation, type])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const newVal = type === 'checkbox'
      ? (e as React.ChangeEvent<HTMLInputElement>).target.checked
      : e.target.value
    setFieldValue(newVal)
    if (touched) {
      setError(validate(newVal))
    }
    onChange?.(e)
  }

  const handleBlur = () => {
    setTouched(true)
    const currentVal = (type === 'checkbox' && typeof fieldValue === 'boolean')
      ? fieldValue
      : String(fieldValue)
    setError(validate(currentVal))
  }

  const inputClass = `w-full px-4 py-2.5 text-sm border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 ${
    touched && error
      ? 'border-red-300 focus:ring-red-500/30 bg-red-50'
      : touched && !error && fieldValue
        ? 'border-green-300 focus:ring-green-500/30 bg-green-50/30'
        : 'border-gray-200 focus:ring-chery-red/50 hover:border-gray-300'
  } ${disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : ''} ${className}`

  const isControlled = value !== undefined

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {type === 'textarea' ? (
        <textarea
          name={name}
          value={isControlled ? value as string : fieldValue as string}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          rows={rows}
          disabled={disabled}
          required={required}
          className={inputClass}
        />
      ) : type === 'select' ? (
        <select
          name={name}
          value={isControlled ? value as string : fieldValue as string}
          onChange={handleChange}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          className={inputClass}
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : type === 'checkbox' ? (
        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            name={name}
            checked={isControlled ? value as boolean : fieldValue as boolean}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            className="w-4 h-4 text-chery-red border-gray-300 rounded focus:ring-chery-red/50"
          />
          <span className="text-sm text-gray-500">{placeholder || label}</span>
        </div>
      ) : (
        <input
          type={type}
          name={name}
          value={isControlled ? value as string : fieldValue as string}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={inputClass}
        />
      )}

      {/* Inline Error */}
      {touched && error && (
        <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}

      {/* Success Indicator */}
      {touched && !error && fieldValue && type !== 'checkbox' && (
        <p className="mt-1.5 text-xs text-green-500 flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Looks good
        </p>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <p className="mt-1.5 text-xs text-gray-400">{helperText}</p>
      )}
    </div>
  )
}