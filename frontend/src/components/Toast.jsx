import { useEffect } from 'react'

function Toast({ message, type = 'success', onClose }) {

    useEffect(() => {

        const timer = setTimeout(() => {
            onClose()
        }, 3500)

        return () => clearTimeout(timer)
    }, [onClose])

    return (
        <div className={`toast-custom ${type === 'error' ? 'error' : ''}`}>
            {message}
        </div>
    )
}

export default Toast