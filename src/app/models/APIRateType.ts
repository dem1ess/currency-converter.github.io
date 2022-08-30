export interface APIRateType {
  motd: {
    msg: string
    url: string
  }
  query: {
    from: string
    to: string
    amount: number
  }
  info: {
    rate: number
  }
  historical: boolean
  date: string
  result: number
}
