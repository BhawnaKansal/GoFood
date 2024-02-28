const express=require('express')
const mongoose=require('mongoose')
const Messages =require('./DbMessasges')
const Pusher=require('pusher')
const cors=require('cors')
const app=express()
const port=process.env.Port || 9000
const pusher = new Pusher({
    appId: "1751634",
    key: "5e71a8ce70a0f77718aa",
    secret: "1f63905c874f74d94010",
    cluster: "ap2",
    useTLS: true
  });
const connection_url='mongodb+srv://whatsapp-mern:whatsapp123@cluster2.qns1eyp.mongodb.net/messageCollection?retryWrites=true&w=majority'
app.use(express.json()) //middleware
app.use(cors())

// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','*')
//     res.setHeader('Access-Control-Allow-Headers','*');
//     next();
// })


//DB connection
mongoose.connect(connection_url)

const db=mongoose.connection
db.once('open',()=>{
    console.log('DB connected')

    const msgCollection=db.collection('messagecontents')
    const changeStream=msgCollection.watch()
    changeStream.on('change',(change)=>{
        console.log(change)
        if(change.operationType=== 'insert'){
            const messageDetails=change.fullDocument;
            pusher.trigger('messages','inserted',
            {
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received
            })
        }
        else{
            console.log('Error triggering pusher')
        }
    })

})

app.get('/',(req,res)=>{
    res.status(200).send('Hello world')
})
app.get('/messages/sync',(req,res)=>{
    Messages.find().then((result)=>{
            res.status(200).send(result)
        }).catch((err)=>{
            res.status(500).send(err)
        })
    })
app.post('/messages/new',(req,res)=>{
    const dbMessage=req.body;
    Messages.create(dbMessage).then((result)=>{
            res.status(200).send(result)
        }).catch((err)=>{
            res.status(500).send(err)
        })
    })

app.listen(port,()=>console.log(`Listening on localhost ${port}`))
