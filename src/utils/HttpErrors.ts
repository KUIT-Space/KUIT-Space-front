import { HTTPError } from "ky";

export class UnauthorizedError extends HTTPError {
  constructor(response: Response, request?: Request, options?: any) {
    super(response, request || new Request(""), options || {});
    this.name = "UnauthorizedError";
  }
}
