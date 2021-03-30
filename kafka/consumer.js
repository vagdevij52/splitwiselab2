const {Kafka} = require("kafkajs")
run();
async function run(){
    try{
        const kafka = new Kafka({
            "clientId": "splitwiselab2",
            "brokers": ["localhost:9092"]
        })

        const consumer = kafka.consumer({"groupId" : "test"});
        console.log("Connecting.......")
        await consumer.connect();
        console.log("Connected!");
        consumer.subscribe({
            "topic" : "Users",
            "fromBeginning" : "true"
        })
        await consumer.run({
            "eachMessage" : async result => {
                console.log(`Received message ${result.message.value} on partition ${result.partition}`);
            }
        })
        // await consumer.disconnect();
    }catch(ex){
        console.error(`Something bad happen $(ex)`)
    }
    finally{
    }
}