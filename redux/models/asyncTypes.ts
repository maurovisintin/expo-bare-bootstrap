import { ApiErrorResponse, ApiOkResponse } from 'apisauce';

export interface ReducerState<SuccessData, FailureData> {
  loading: undefined | boolean;
  success: undefined | boolean;
  response:
    | undefined
    | ApiOkResponse<SuccessData>
    | ApiErrorResponse<FailureData>;
}
