import React from 'react'
import { useNavigate } from 'react-router-dom'
import QueryString from 'qs'

// Import files
import styles from './Home.module.scss'

// Redux
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../redux/store'
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../../redux/filter/slice'
import { fetchPizzas } from '../../redux/pizzas/asyncActions'
import { selectPizzas } from '../../redux/pizzas/selectors'
import { selectFilter } from '../../redux/filter/selectors'

// Components
import {
  Sort,
  Categories,
  Pagination,
  PizzaCard,
  PizzaCardSkeleton,
} from '../../components'
import { NotFound } from '../'
import { PizzaItem } from '../../redux/pizzas/types'
import { sortList } from 'utils/sortList'

// --- --- --- --- --- --- --- --- --- --- --- ---

const Home: React.FC = () => {
  // Redux
  const dispatch = useAppDispatch()
  const { categoryId, sortType, currentPage, searchValue } =
    useSelector(selectFilter)
  const { items: pizzas, status } = useSelector(selectPizzas)

  const onChangeCategory = React.useCallback(
    (id: number) => {
      dispatch(setCategoryId(id))
      dispatch(setCurrentPage(1))
    },
    [dispatch],
  )

  const onChangePage = (num: number) => dispatch(setCurrentPage(num))

  // --- --- --- --- --- --- --- ---

  const isUrlSearch = React.useRef(false)
  const isMounted = React.useRef(false)

  const getPizzas = () => {
    dispatch(
      fetchPizzas({
        currentPage,
        sortType,
        categoryId,
        searchValue,
      }),
    )
  }

  // URL
  const navigate = useNavigate()

  // If params were changed and the first render was
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = QueryString.stringify({
        categoryId,
        sortProperty: sortType.sortProperty,
        order: sortType.order,
        currentPage,
        searchValue,
      })

      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [categoryId, sortType, currentPage, searchValue, navigate])

  // At first render check for URL and send them to Redux
  React.useEffect(() => {
    const UrlSearchValue = window.location.search

    if (UrlSearchValue) {
      type SearchPizzaParams = {
        categoryId: string
        currentPage: string
        order: string
        sortProperty: string
        searchValue: string
      }

      const params = QueryString.parse(
        UrlSearchValue.substring(1),
      ) as SearchPizzaParams

      const sortType = sortList.find(
        obj =>
          obj.sortProperty === params.sortProperty &&
          obj.order === params.order,
      )

      dispatch(
        setFilters({
          searchValue: params.searchValue,
          categoryId: +params.categoryId,
          currentPage: +params.currentPage,
          sortType: sortType || sortList[0],
        }),
      )

      isUrlSearch.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // If first render was, then fetch for pizzas
  React.useEffect(() => {
    window.scrollTo(0, 0)

    if (!isUrlSearch.current) {
      getPizzas()
    }

    isUrlSearch.current = false
  }, [categoryId, sortType, searchValue, currentPage])

  const skeletons = [...new Array(4)].map((_, i) => {
    return (
      <li key={`skeleton *${i}`} className={styles.pizzas__item}>
        <PizzaCardSkeleton />
      </li>
    )
  })

  const pizzaList = pizzas
    .map((obj: PizzaItem) => (
      <li key={obj.key} className={styles.pizzas__item}>
        <PizzaCard {...obj} />
      </li>
    ))
    .slice(currentPage * 4 - 4, currentPage * 4)

  return (
    <div className={`container ${styles.container}`}>
      <div className={styles.filters}>
        <Categories
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>

      <h2 className={styles.title}>Все пиццы</h2>

      {status === 'error' ? (
        <NotFound />
      ) : (
        <ul className={styles.pizzas}>
          {status === 'loading' ? skeletons : pizzaList}
        </ul>
      )}

      <div className={styles.pagination}>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={onChangePage}
          pageCount={Math.ceil(pizzas.length / 4)}
        />
      </div>
    </div>
  )
}

export default Home
