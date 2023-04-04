import {
  SortName,
  SortOrder,
  SortPropertyEnum,
  SortType,
} from 'redux/pizzas/types'

export const sortList: SortType[] = [
  {
    name: SortName.RATING_ASC,
    sortProperty: SortPropertyEnum.RATING,
    order: SortOrder.ASC,
  },
  {
    name: SortName.RATING_DESC,
    sortProperty: SortPropertyEnum.RATING,
    order: SortOrder.DESC,
  },
  {
    name: SortName.PRICE_ASC,
    sortProperty: SortPropertyEnum.PRICE,
    order: SortOrder.ASC,
  },
  {
    name: SortName.PRICE_DESC,
    sortProperty: SortPropertyEnum.PRICE,
    order: SortOrder.DESC,
  },
  {
    name: SortName.TITLE_ASC,
    sortProperty: SortPropertyEnum.TITLE,
    order: SortOrder.ASC,
  },
  {
    name: SortName.TITLE_DESC,
    sortProperty: SortPropertyEnum.TITLE,
    order: SortOrder.DESC,
  },
]
