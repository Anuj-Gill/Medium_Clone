import { Hono } from 'hono'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  }
}>();
app.use('/*', cors())
app.get('/', (c) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Blog Clone</title>
      <style>
          body {
              margin: 0;
              font-family: Arial, sans-serif;
              background-color: #121212;
              color: #e0e0e0;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 100vh;
              text-align: center;
          }
          h1 {
              font-size: 3rem;
              margin-bottom: 0.5rem;
          }
          p {
              font-size: 1.25rem;
              margin-bottom: 1rem;
          }
          .container {
              background-color: #1e1e1e;
              padding: 2rem;
              border-radius: 10px;
              box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          }
          a {
              color: blue;
              text-decoration: none;
              font-weight: bold;
              font-size: 1rem;
          }
          a:hover {
              text-decoration: underline;
          }
          footer {
              margin-top: 2rem;
              font-size: 1rem;
              color: #aaaaaa;
          }
          footer .heart {
              color: red;
          }
          .dev-warning {
              margin-top: 1.5rem;
              background-color: #00cc00;
              color: #000;
              padding: 0.75rem;
              border-radius: 5px;
              font-size: 1.1rem;
              font-weight: bold;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Welcome to Medium Clone</h1>
          <p>This is a clone server inspired by Medium (yes, the blogging platform!).</p>
          <p>This is the server endpoint of the app.</p>
          <div class="info">
              <p>I created this project to deepen my understanding of <strong>Cloudflare Workers</strong> and <strong>serverless backends</strong>.</p>
              <p>Instead of using Express, I opted for <strong>Hono</strong>, a fast and lightweight web framework designed for Cloudflare Workers and other edge environments. Hono provides a developer experience similar to Express but optimized for serverless platforms, making it ideal for this kind of modern web service.</p>
              <p>Serverless backends like this eliminate the need for managing traditional servers, improving scalability and reducing overhead. Cloudflare Workers allow code to run at the edge, closer to users, resulting in faster response times and better performance globally.</p>
          </div>
          <div class="dev-warning">
              ✅ UI is ready. You can test it out here: <a href="https://medium-clone-rho-pied.vercel.app/" target="_blank">Click Here to View UI</a>
          </div>
      </div>
      <footer>
          Made with <span class="heart">❤</span> by Anuj
      </footer>
  </body>
  </html>
  `;
  return c.html(html);
});

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app
