import { kafka } from './kafka.js'


const main = async () => {
    const consumer = kafka.consumer({
        groupId: process.env.GROUP_ID
    })
    
    await consumer.connect()
    await consumer.subscribe({
        topics: ['postgres.public.customers'],
        fromBeginning: true
    })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('topic', topic)
            const value = JSON.parse(message.value)
            const key = JSON.parse(message.key)
            console.log('payload is', value.payload)
        }
    })
}

main().catch(async error => {
    try {
        await consumer.disconnect()
    } catch (e) {
        console.error('Failed to gracefully disconnect consumer', e)
    }
    process.exit(1)
})