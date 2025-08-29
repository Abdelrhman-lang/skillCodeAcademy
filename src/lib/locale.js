
import { headers } from "next/headers"

export const getLocale = async () => {
    const url = (await headers()).get("x-url")
    const locale = url?.split("/")[3]
    return locale
}