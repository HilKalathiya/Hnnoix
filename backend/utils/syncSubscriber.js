const { Long } = require("mongodb");
const connectDB = require("../config/db");

function extract(regex, text) {
    const match = text.match(regex);
    if (!match) {
        throw new Error(`Unable to extract value using regex: ${regex}`);
    }
    return match[1].trim();
}

async function syncSubscriber(ueContent) {
    const db = await connectDB();
    const subscribers = db.collection("subscribers");

    const imsi = extract(/imsi\s*=\s*"(.*?)"/, ueContent);
    const key = extract(/key\s*=\s*"(.*?)"/, ueContent);
    const opc = extract(/opc\s*=\s*"(.*?)"/, ueContent);
    const dnn = extract(/dnn\s*=\s*"(.*?)"/, ueContent);

    const subscriber = {
        ambr: {
            downlink: {
                value: 1,
                unit: 3,
            },
            uplink: {
                value: 1,
                unit: 3,
            },
        },

        schema_version: 1,

        msisdn: [],
        imeisv: "6754567890123413",
        mme_host: [],
        mme_realm: [],
        purge_flag: [],

        access_restriction_data: 32,
        subscriber_status: 0,
        operator_determined_barring: 0,
        network_access_mode: 0,
        subscribed_rau_tau_timer: 12,

        imsi,

        security: {
            k: key,
            amf: "8000",
            op: null,
            opc: opc,
            sqn: Long.fromNumber(1568),
        },

        slice: [
            {
                sst: 1,
                default_indicator: true,

                session: [
                    {
                        qos: {
                            arp: {
                                priority_level: 8,
                                pre_emption_capability: 1,
                                pre_emption_vulnerability: 1,
                            },
                            index: 9,
                        },

                        ambr: {
                            downlink: {
                                value: 1,
                                unit: 3,
                            },
                            uplink: {
                                value: 1,
                                unit: 3,
                            },
                        },

                        name: dnn || "internet",
                        type: 3,
                        pcc_rule: [],
                    },
                ],
            },
        ],
    };

    await subscribers.updateOne(
        { imsi },
        { $set: subscriber },
        { upsert: true }
    );

    console.log(`Subscriber ${imsi} synchronized.`);
}

module.exports = syncSubscriber;


