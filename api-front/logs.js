import pino from 'pino'
import { createPinoBrowserSend, createWriteStream } from 'pino-logflare'

// create pino-logflare browser stream
const send = createPinoBrowserSend({
    apiKey: "aVcZkw6pfiJZ",
    sourceToken: "e333b6b9-2e93-443e-8698-dd00d1a296cd"
});

// create pino loggger
const logger = pino({
    browser: {
        transmit: {
            send: send,
        }
    }
});

export default {
    sendLogError() {
        logger.error(new Error("things got bad"), "error message");
    },
    sendLogInfo(title, data) {
        const child = logger.child(data);
        child.info(title);
    }
}