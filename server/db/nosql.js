const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';

let client = null;
let db;
let collection; 
async function getCollection(dbName='dove' , collectionName = 'product'){
    try{
        // 連接到Mongo
        client = await MongoClient.connect(url);
        // 選取資料庫和集合
        db = client.db(dbName);
        collection = db.collection(collectionName);
        return client;
    }
    catch(error){
        console.log("錯誤："+ error.message);
    }
}

async function searchData(whereObj , sortStr = '' , sortNum = '0'){
    // sortNum  -1遞減  0不排序 1遞增
    if(sortStr.length === 0 || sortNum ==='0')
    {
        return await collection.find(whereObj).toArray();
    }
    else
    {
        return await collection.find(whereObj).sort({[sortStr]:sortNum}).toArray();
    }
}

async function insertData(whereObj){
    return await collection.insertMany([whereObj]);
}

async function updateData(whereObj, updateObj){
    return await collection.updateOne(whereObj,updateObj);
}

async function closeClient(){
    let tmp = client.s.hasBeenClosed;
    if(client != null) await client.close();
    console.log('DBClient Close Status:',tmp,' -> ',client.s.hasBeenClosed);
}


module.exports = {
    collection , 
    getCollection,
    searchData,
    insertData,
    updateData,
    closeClient
};

