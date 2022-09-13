import { Observable } from 'rxjs';

export interface CreateContractAddressRequest {
  tokenAddress: string;
}

export interface CreateContractAddressResponse {
  message: string;
}

export interface GetAllContractAddressRequest {
  data: string;
}

export interface GetAllContractAddressResponse {
  data: [];
}
export interface ContractServiceClient {
  getAllContractAddress({}): Observable<GetAllContractAddressResponse>;
  createContractAddress(
    request: CreateContractAddressRequest,
  ): Observable<CreateContractAddressResponse>;
}
