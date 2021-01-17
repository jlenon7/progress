const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-2' })

const database = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' })

const TableName = 'PrimeiraTabela'

exports.lambdaHandler = async (event, context) => {
    if (event.path === "/categoria") {
        return getByCategoria()
    }

    if (event.path === "/categoriaScan") {
        return getByCategoriaWithScan()
    }

    if (event.httpMethod === "GET" && event.path == '/hello') {
        return getItem("1")
    }

    if (event.httpMethod === "PUT" && event.path == '/hello') {
        return updateItem("3")
    }

    if (event.httpMethod === "DELETE" && event.path == '/hello') {
        return deleteItem("3")
    }

    if (event.httpMethod === "POST" && event.path == '/hello') {
        return createItem()
    }
}

// Não fazer scan em ambiente de produção,
// é uma listagem demorada demais por que
// ela verifica cada uma das tuplas do banco.
async function getByCategoriaWithScan() {
    let body
    let statusCode

    const params = {
        TableName,
        ProjectionExpression: "id, nome",
        FilterExpression: "#categoria = :categoria and contains(nome, :nome)",
        ExpressionAttributeNames: {
            "#categoria": "categoria"
        },
        ExpressionAttributeValues: {
            ":categoria": 1,
            ":nome": "João"
        }
    }

    try {
        const data = await database.scan(params).promise()

        body = data.Items
        statusCode = 200
    } catch (err) {
        console.log(err)
        body = err
        statusCode = 500
    }


    return {
        statusCode,
        body: JSON.stringify(body)
    }
}

async function getByCategoria() {
    let body
    let statusCode

    const params = {
        TableName,
        IndexName: 'categoria-index',
        ProjectionExpression: "id, nome",
        KeyConditionExpression: "#categoria = :categoria",
        FilterExpression: "contains(nome, :nome)",
        ExpressionAttributeNames: {
            "#categoria": "categoria"
        },
        ExpressionAttributeValues: {
            ":categoria": 1,
            ":nome": "João"
        }
    }

    try {
        const data = await database.query(params).promise()

        body = data.Items
        statusCode = 200
    } catch (err) {
        console.log(err)
        body = err
        statusCode = 500
    }


    return {
        statusCode,
        body: JSON.stringify(body)
    }
}

async function getItem(id) {
    let body
    let statusCode

    const params = {
        TableName: 'PrimeiraTabela',
        Key: { 'id': id }
    }

    try {
        const data = await database.get(params).promise()

        body = data.Item
        statusCode = 200
    } catch (err) {
        console.log(err)
        body = err
        statusCode = 500
    }

    return {
        statusCode,
        body: JSON.stringify(body)
    }
}

async function createItem() {
    let body
    let statusCode

    const params = {
        TableName,
        Item: {
            'id': "3",
            'nome': 'Maria Helena',
            'categoria': 2,
        }
    }

    try {
        const data = await database.put(params).promise()

        body = data.Item
        statusCode = 200
    } catch (err) {
        console.log(err)
        body = err
        statusCode = 500
    }

    return {
        statusCode,
        body: JSON.stringify(body)
    }
}

async function deleteItem(id) {
    let body
    let statusCode

    const params = {
        TableName,
        Key: { 'id': id }
    }

    try {
        const data = await database.delete(params).promise()

        body = data.Item
        statusCode = 200
    } catch (err) {
        console.log(err) 
        body = err
        statusCode = 500
    }

    return {
        statusCode,
        body: JSON.stringify(body)
    }
}

async function updateItem(id) {
    let body
    let statusCode

    const params = {
        TableName,
        Key: { 'id': id },
        UpdateExpression: "set nome = :nome, categoria = :categoria",
        ExpressionAttributeValues: {
            ":nome": "Maria do Carmo",
            ":categoria": 3,
        }
    }

    try {
        const data = await database.update(params).promise()

        body = data.Item
        statusCode = 200
    } catch (err) {
        console.log(err) 
        body = err
        statusCode = 500
    }

    return {
        statusCode,
        body: JSON.stringify(body)
    }
}
