import {Kafka, logLevel} from 'kafkajs'
import dotenv from 'dotenv'
import ip from 'ip'
dotenv.config();

const host = process.env.HOST_IP || ip.address()

export const kafka = new Kafka({
    logLevel: logLevel.INFO,
    clientId: 'node-consumer',
    brokers: [`172.24.22.107:9094`]
})