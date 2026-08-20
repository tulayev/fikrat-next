import { useMemo } from 'react'

export default function OtpInput(props) {
    const { value, valueLength, onChange } = props

    const valueItems = useMemo(() => {
        const valueArray = value.split('')
        const items = []

        for (let i = 0; i < valueLength; i++) {
            const char = valueArray[i]
            const regex = new RegExp(/^\d+$/)

            if (regex.test(char)) {
                items.push(char)
            } else {
                items.push('')
            }
        }

        return items
    }, [value, valueLength])

    const focusToPreviousInput = (target) => {
        const previousElementSibling = target.previousElementSibling
    
        if (previousElementSibling) {
            previousElementSibling.focus()
        }
    }

    const focusToNextInput = (target) => {
        const nextElementSibling = target.nextElementSibling
    
        if (nextElementSibling) {
            nextElementSibling.focus()
        }
    }

    const inputOnChange = (e, index) => {
        const target = e.target
        let targetValue = target.value.trim()
        const regex = new RegExp(/^\d+$/)
        const isTargetValueDigit = regex.test(targetValue)

        if (!isTargetValueDigit && targetValue !== '') {
            return
        }

        targetValue = isTargetValueDigit ? targetValue : ' '

        const targetValueLength = targetValue.length

        if (targetValueLength === 1) {
            const newValue = value.substring(0, index) + targetValue + value.substring(index + 1)
            onChange(newValue)
    
            if (!isTargetValueDigit) {
                return
            }
    
            focusToNextInput(target)
        } else if (targetValueLength === valueLength) {
            onChange(targetValue)
            target.blur()
        }
    }

    const inputOnKeyDown = (e) => {
        const key = e.key
        const target = e.target
        const targetValue = target.value

        if (key === 'ArrowRight' || key === 'ArrowDown') {
            e.preventDefault()
            return focusToNextInput(target)
        }
        
        if (key === 'ArrowLeft' || key === 'ArrowUp') {
            e.preventDefault()
            return focusToPreviousInput(target)
        }

        target.setSelectionRange(0, targetValue.length)
        
        if (key !== 'Backspace' || target.value !== '') {
            return
        }

        focusToPreviousInput(target)
    }

    const inputOnFocus = (e) => {
        const target = e.target

        target.setSelectionRange(0, target.value.length)
    }

    return (
        <div className="d-flex">
            {
                valueItems.map((digit, index) => (
                    <input 
                        key={index}
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        pattern="\d{1}"
                        maxLength={valueLength}
                        value={digit}
                        onChange={(e) => inputOnChange(e, index)}
                        onKeyDown={inputOnKeyDown}
                        onFocus={inputOnFocus}
                    />
                ))
            }
        </div>
    )
}