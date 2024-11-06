import { generateRandomString } from "@/app/lib/data";
import { fetchBaseAccessToken, getJsApiTicket } from "@/app/lib/wx";

export async function GET() {

  const { access_token } = await fetchBaseAccessToken()
  const { ticket: jsapi_ticket } = await getJsApiTicket(access_token)
  const noncestr = generateRandomString(16)
  const timestamp = Math.floor(Date.now() / 100)
  const url = 'http://localhost:3000'
  return Response.json({})
}
