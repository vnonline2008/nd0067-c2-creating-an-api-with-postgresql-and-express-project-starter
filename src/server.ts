import express, { Request, Response } from 'express'
import cors from 'express';
import bodyParser from 'body-parser'
import { usersRouter } from './handlers/users.router';
import { productsRouter } from './handlers/products.router';
import { ordersRouter } from './handlers/orders.router';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(cors()); // enable CORS
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

usersRouter(app);
productsRouter(app);
ordersRouter(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app