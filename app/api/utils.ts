export function createErrorResponse(message: string, status: number) {
  return Response.json({ error: message }, { status });
}
