import allowedOrigins from "./allowedOrigins";

const corsOptionsDelegate = {
    origin: (req, callback) => {
        var corsOptions;
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            corsOptions = { origin: true }
        } else {
            corsOptions = { origin: false }
        }
    },
}

export default corsOptionsDelegate
