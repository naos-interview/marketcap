export interface GetCurrentMarketcapRequest {
  contractAddress: string;
}

export interface GetMarketcapHistoryRequest {
  date: Date;
  contractAddress: string;
}
