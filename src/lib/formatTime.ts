import dayjsLib from "dayjs"
import RelativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-br"

dayjsLib.locale("pt-br")
dayjsLib.extend(RelativeTime)

export const dayjs = dayjsLib