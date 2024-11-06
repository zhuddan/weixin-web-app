import { ApiError } from "../lib/api-request";

export function ApiErrorMessage({ error }: { error?: ApiError | null }) {
  if (!error) {
    return null
  }
  return <p className="mt-2 text-sm text-red-500 px-2" > {error?.statusText} </p>
}
