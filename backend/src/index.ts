import { Hono } from 'hono'
import mainRouter from './routes/mainRouter'
import { cors } from 'hono/cors';

const app = new Hono();
app.use("/*", cors());
app.route("/api/v1",mainRouter);

export default app
