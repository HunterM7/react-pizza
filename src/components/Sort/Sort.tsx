import React from 'react'
import { useSelector } from 'react-redux'

// Redux
import { useAppDispatch } from 'redux/store'
import { SortType } from 'redux/pizzas/types'
import { setSortType } from 'redux/filter/slice'
import { selectSort } from 'redux/filter/selectors'

// Utils
import { triangleIcon } from 'assets/icons'
import { sortList } from 'utils/sortList'

// Styles
import styles from './Sort.module.scss'

const Sort: React.FC = () => {
  // Popup control
  const [open, setOpen] = React.useState(false)
  const sortRef = React.useRef<HTMLDivElement>(null)

  // Функция позволяла не вызывать на каждый клик setOpen(false), но сломалась. Попробовать починить
  // const handleClick = (e: MouseEvent) => {
  //   const _e = e as MouseEvent & {
  //     path: Node[]
  //   }

  //   if (sortRef.current && _e.path?.includes(sortRef.current)) {
  //     setOpen(false)
  //   }
  // }

  // Handling popup
  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.stopPropagation()
    setOpen(!open)
  }

  React.useEffect(() => {
    document.body.addEventListener('click', handleClose)

    return () => {
      document.body.removeEventListener('click', handleClose)
    }
  }, [])

  // Redux
  const dispatch = useAppDispatch()
  const sort = useSelector(selectSort)

  const chooseAndClose = (obj: SortType) => {
    dispatch(setSortType(obj))
    setOpen(false)
  }
  // --- --- --- --- --- --- --- ---

  return (
    <div ref={sortRef} className={styles.sort}>
      <div
        className={`
						${styles.sort__icon}
						${open ? styles.active : ''}
					`}
      >
        {triangleIcon}
      </div>

      <b className={styles.sort__title}>Сортировка по:</b>

      <span className={styles.sort__name} onClick={handleOpen}>
        {sort.name}
      </span>

      {open && (
        <ul className={styles.popup}>
          {sortList.map((obj, i) => {
            return (
              <li
                key={i}
                className={`
									${styles.popup__item}
									${sort.name === obj.name ? styles.active : ''}
								`}
                onClick={() => chooseAndClose(obj)}
              >
                {obj.name}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default Sort
