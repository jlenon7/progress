export interface ApiRequestContract {
  where?: WhereContract[]
  orderBy?: OrderByContract[]
  includes?: IncludesConctract[]
}

export interface IncludesConctract {
  relation: any
  where?: WhereContract[]
  orderBy?: OrderByContract[]
  includes?: IncludesConctract[]
}

export interface WhereContract {
  key: string
  value: string | number | boolean
}

export interface OrderByContract {
  key: string
  ordenation: 'asc' | 'desc'
}
