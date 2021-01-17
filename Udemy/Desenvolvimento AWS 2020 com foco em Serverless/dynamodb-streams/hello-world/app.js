exports.lambdaHandler = async (event, context) => {
    console.log(event.Records)
    
    event.Records.forEach(item => {
        console.log(item.dynamodb)
    })
}
