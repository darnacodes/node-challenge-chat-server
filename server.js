const express = require("express");
const cors = require("cors");
const { response } = require("express");

const app = express();

app.use(cors());

app.use(express.json())


const welcomeMessage = {
  id: 0,
  from: "Bart",
  text: "Welcome to CYF chat system!",
};

//This array is our "data store".
//We will start with one message in the array.
//Note: messages will be lost when Glitch restarts our server.
let messages = [welcomeMessage];

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/index.html");
});
//create new message 

app.post("/messages", function (request,response){
const newMessage= request.body
newMessage.id=messages.length
console.log(newMessage)
//validation reject request that has an empty or missing text 
if (notValidRequest(message)){
  response.status(400).send({sucess:false})
}

messages.push(newMessage)
response.status(201).send({success:true})
});

function notValidRequest(message){
  return  message.id == undefined ||
     message.from == undefined ||
     message.text == undefined 
     
  }

//read all messages
app.get("/messages", function (request, response) {
  response.send(messages);
});


//read one message by id
app.get("/messages/:id", function (request, response){

  const id= request.params.id
  console.log(id)

  const searchMessageId= messages.find(message=>message.id==id)  
  console.log(searchMessageId)
  response.send(searchMessageId)

});

//delete message by id
app.delete("/messages/:id", function (request, response){
const id=request.params.id
const messageFiltered= messages.filter(function(message){
  return message.id !=id})
messages=messageFiltered
response.send({sucess:true})

});

//read only messages whose text contains a given substring: /messages/search?text=express

app.get("/messages/search?text=express", function (request,response){
  
})

//read last 

app.get("/last-messages/:number", function (request, response) {
  const number = request.params.number;
  // number=4, messages = [x,x,x,x,x,x,x,x] (length=8)
  const firstIndex = messages.length - number; // 4th element onwards
  const finalMessages = messages.filter((m, i) => i >= firstIndex);
  response.send(finalMessages);
});

//port
const port= 4000
app.listen(port, () => {
   console.log("Listening on port" + port )
  });
