const BASE_URL = 'https://api.exchange.coinbase.com';

/*
 ** Helpers Start **
 */
// const ERROR_BODY = 'Response body is not a valid JSON';
const {Request} = global;

interface HttpResponse<T> extends Response {
  parsedBody?: T;
}

async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
  const response: HttpResponse<T> = await fetch(request);

  try {
    // may error if there is no body
    response.parsedBody = await response.json();
  } catch (ex) {
    // TODO: Handle error here
    // throw new Error(ERROR_BODY);
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

async function get<T>(
  path: string,
  // args: RequestInit = {method: 'get'},
): Promise<HttpResponse<T>> {
  return http<T>(`${BASE_URL}${path}`);
  // If we need args you can use the below, but causes require cycle
  // return await http<T>(new Request(`${BASE_URL}${path}`, args));
}

async function post<T>(path: string, body: T): Promise<HttpResponse<T>> {
  return await http<T>(
    new Request(`${BASE_URL}${path}`, {
      method: 'post',
      body: JSON.stringify(body),
    }),
  );
}

type HistoricalTradeSide = 'buy' | 'sell';

export type HistoricalTrade = {
  time: string;
  trade_id: number;
  price: string;
  size: string;
  side: HistoricalTradeSide;
};

export type History = HistoricalTrade[];

/**
 * Docs
 * https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getproducttrades
 */
const history = async () => get<History>('/products/BTC-USD/trades');
const addHistory = async (newHistory: History) =>
  post<History>('/products/BTC-USD/trades', newHistory);

export const api = {
  history,
  addHistory,
};
