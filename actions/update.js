import handler from '../libs/handler-lib';
import dynamoDb from '../libs/dynamodb-lib';

export const main = handler(async (event, context) => {
    const data = JSON.stringify(event.body);
    const params = {
        TableName: process.env.tableName,
        // 'Key' defines the partition key and sort key of the item to be updated
        // - 'userId': Identity Pool identity id of the authenticated user
        // - 'noteId': path parameter
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        },
        // 'UpdateExpression' defines the attributes to be
        // This should look similar to the  funcAon. Here we make an DynamoDB call with the new  and values in the.
        // Configure the API Endpoint
        // Open the  ﬁle and append the following to
        // it.
        // updated 'ExpressionAttributeValues' defines the value in the update expression,
        UpdateExpression: "SET content = :content, attachment = :attachment",
        ExpressionAttributeValues: {
            ":content": data.content || null,
            ":attachment": data.attachment || null
        },
        ReturnValues: "ALL_NEW"
    };

    await dynamoDb.update(params);
    return { status: true };
});