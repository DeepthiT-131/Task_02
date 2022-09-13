const aws = require('aws-sdk');
const dynamodb = new aws.DynamoDB.DocumentClient();
exports.handler = async (event) => {
    try{
        if(event.path == "/student"){
            console.log(event)
            const params = {
                TableName : process.env.StudentTableName,
                Item:{
                    "StudentId" : event.queryStringParameters.StudentId,
                    "Name":event.queryStringParameters.Name,
                    "Age": event.queryStringParameters.Age,
                    "Department":event.queryStringParameters.Department
                }
            };
            
         let response = await dynamodb.put(params).promise(); 
         return {
            statusCode : 200,
            body:JSON.stringify({
                "message": true,
                "data": "Entered data Successfully" 
            })
            
    };
        }
        else if(event.path == "/teachers"){
            const params1 ={
            TableName:process.env.TeacherTableName,
            Item:{
                "TeacherId" : event.queryStringParameters.TeacherId,
                "Name":event.queryStringParameters.Name,
                "Age": event.queryStringParameters.Age,
                "Department":event.queryStringParameters.Department,
                "Salary":event.queryStringParameters.Salary
            }
        }
    
        let res1 = await dynamodb.put(params1).promise(); 
         return {
            statusCode : 200,
            body:JSON.stringify({
                "message": true,
                "data": "Entered teachers data Successfully" 
            })
        };
        }
    } 
    catch(err){
        console.log("[ERROR]",err);
        return{ 
            statusCode:400,  
            body:JSON.stringify({
                "message":false, 
                "data": " Enter the Parameters"
            })
        }
         
    }

}