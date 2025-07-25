import { useImperativeHandle, useState } from 'react'


export default function Input({ value, placeholder, onChange, ref }) {
    const [isPassVisible, setIsPassVisible] = useState(true)

    const inputChangeEvent = (e) => {
        setIsPassVisible(true)
        if (onChange && typeof onChange === 'function') {
            onChange(e.target.value)
        }
    }

    useImperativeHandle(ref, () => {
        return {
            visible: () => {
                if (!value.trim().length) {
                    setIsPassVisible(false)
                }
                return !!value
            }
        }
    })

    return (<div className={["input-container", isPassVisible ? '' : 'input-container--warring'].join(" ")}>
        <input type="text"
            placeholder={placeholder}
            value={value}
            onChange={inputChangeEvent} />
    </div>)
}