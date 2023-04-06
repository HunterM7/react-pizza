/* eslint-disable*/
import React from 'react'

// Firebase
import { signInWithPhoneNumber } from 'firebase/auth'

import { auth } from '../../firebase/firebaseConfig'
import { generateRecaptcha } from '../../firebase/LoginWithPhoneFuncs'

// Styles
import styles from './LoginPage.module.scss'

declare global {
  interface Window {
    confirmationResult: any
  }
}

// --- --- --- --- --- --- --- --- --- --- --- ---

type LoginType = {
  func: React.Dispatch<React.SetStateAction<boolean>>
}

const Login: React.FC<LoginType> = ({ func }) => {
  // Blocking overflow on body
  React.useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  // Handle click out of popup area
  const bgRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const _e = e as MouseEvent & {
        path: Node[]
      }

      if (containerRef.current && !_e.path.includes(containerRef.current)) {
        func(false)
      }
    }

    bgRef.current?.addEventListener('click', handleClick)

    return () => {
      bgRef.current?.removeEventListener('click', handleClick)
    }
  }, [func])

  // Controll input
  const [phone, setPhone] = React.useState<string>('+7')

  const handlePhoneInput = (input: string) => {
    if (/[0-9]/.test(input[input.length - 1]) && input.length <= 12)
      setPhone(input)
  }

  // --- --- --- --- --- --- --- --- --- --- --- ---

  // Firebase
  const [expandForm, setExpandForm] = React.useState(false)
  const [SMS, setSMS] = React.useState('')

  const requestSMS = () => {
    setExpandForm(true)
    generateRecaptcha()

    let captcha = window.recaptchaVerifier

    signInWithPhoneNumber(auth, phone, captcha)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult
      })
      .catch(error => {
        console.log('error sms', error)
      })
  }

  const verifySMS = (sms: string) => {
    setSMS(sms)

    if (sms.length === 6) {
      window.confirmationResult
        .confirm(sms)
        .then((result: any) => {
          // User signed in successfully.
          const user = result.user
          console.log('succes')

          console.log(user)
        })
        .catch((error: Error) => {
          console.log(error)
        })
    }
  }

  // --- --- --- --- --- --- --- --- --- --- --- ---

  return (
    <div className={styles.wrapper}>
      <div ref={containerRef} className={styles.container}>
        <h2>Вход на сайт</h2>
        <p>
          Подарим подарок на день рождения, сохраним адрес доставки и расскажем
          об акциях
        </p>
        <input
          type="tel"
          value={phone}
          onChange={e => handlePhoneInput(e.target.value)}
        />
        <button
          className="singinBtn"
          disabled={phone.length !== 12}
          onClick={requestSMS}
        >
          Выслать код
        </button>

        {expandForm && (
          <input
            type="number"
            value={SMS}
            onChange={e => verifySMS(e.target.value)}
          />
        )}

        <div id="recaptcha-container"></div>
      </div>

      <div ref={bgRef} className={styles.bg}></div>
    </div>
  )
}

export default Login
