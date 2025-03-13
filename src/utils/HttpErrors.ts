import { HTTPError, KyRequest, KyResponse, NormalizedOptions } from "ky";
export class UnauthorizedError extends HTTPError {
  constructor(response: KyResponse, request: KyRequest, options: NormalizedOptions) {
    super(response, request, options);
    this.name = "UnauthorizedError";
  }
}
