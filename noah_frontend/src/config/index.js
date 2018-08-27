import devSettings from "./dev"
import prodSettings from "./prod"

let settings = {}

if (ENV == "production") settings = prodSettings
else if (ENV == "development") settings = devSettings

export default settings