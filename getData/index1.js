const aws = require('aws-sdk');
const dynamodb = new aws.DynamoDB.DocumentClient();
exports.handler = async (event)=>{
    try{
        if(event.path == "/student"){
            const params = {
                TableName: process.env.StudentTableName,
                Key:{
                    StudentId : event.queryStringParameters.StudentId
                }
            }
        let response = await dynamodb.get(params).promise();
        console.log("students info",response) 
        return{
            body:JSON.stringify({
                "data": response
            })
        }
        }
        else if (event.path == "/teachers"){
            const params1 = {
                TableName: process.env.TeacherTableName,  
                Key:{
                    TeacherId : event.queryStringParameters.TeacherId
                }
            }
        let res1 = await dynamodb.get(params1).promise();
        console.log("teachers info",res1)
        return{
            body:JSON.stringify({
                "data":res1 
            })
        }
        }
    }
    catch(err){
        console.log(err)
        return{ 
            statusCode:400,  
            body:JSON.stringify({
                "message":false, 
                "data": "Enter the key value to retrive the data" 
            })
        }
        
    }
}