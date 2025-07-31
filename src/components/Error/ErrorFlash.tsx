import './Error.css'
import { useEffect, useState } from 'react'

interface ErrorFlashProps {
    message:string,
    setErrorMessage: (value: string) => void
}


function ErrorFlash({message, setErrorMessage}: ErrorFlashProps) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (message.length > 0) {
            setIsVisible(true)

            const hideTimer = setTimeout(() => {
                setIsVisible(false)
            }, 4500)

            const removeTimer = setTimeout(() => {
                setErrorMessage('')
            }, 5200)

            return () => {
                clearTimeout(hideTimer)
                clearTimeout(removeTimer)
            }
        }
    }, [message, setErrorMessage])

    if (message.length === 0) return null

    return <div className={`error ${isVisible ? 'error--visible' : 'error--hidden'}`}>
        {message}
    </div>
}

export default ErrorFlash