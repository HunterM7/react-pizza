import React from 'react'
import { useLocation } from 'react-router-dom'

// Redux
import { useSelector } from 'react-redux'
import { selectCart } from '../../redux/cart/selectors'

// Files
import styles from './Header.module.scss'

// Components
import { Logo, Search, CartButton } from '../'
import Login from '../../pages/LoginPage/LoginPage'

const Header: React.FC = () => {
  // Login
  const [loginPopup, setLoginPopup] = React.useState<boolean>(false)

  const location: string = useLocation().pathname

  // Cart in LocalStorage
  const { items } = useSelector(selectCart)
  const isMounted = React.useRef(false)

  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items)

      localStorage.setItem('cart', json)
    }

    isMounted.current = true
  }, [items])

  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__container}`}>
        <Logo />
        {location !== '/cart' && (
          <>
            <Search />

            <CartButton />
          </>
        )}
        <button className={styles.btn} onClick={() => setLoginPopup(true)}>
          Войти
        </button>

        {loginPopup && <Login func={setLoginPopup} />}
      </div>
    </header>
  )
}

export default Header
