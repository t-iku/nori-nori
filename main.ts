import { Nori } from "https://deno.land/x/nori@v0.0.2/src/nori.ts";

const app = new Nori();

app.get("/", async ({ response }) => {
  const html = await Deno.readTextFile("./static/index.html");
  return response.html(html)
});

app.get("/id/:id", ({ result, response }) => {
  const { id } = result.pathname.groups;
  if (!id) return response.error();
  return response.text(id);
});

app.get("/json", ({ request, response }) => {
  const data = {
    "key": "value",
    "url": request.url,
  };

  return response.json(data);
});

app.get("/redirect", ({ request, response }) => {
  const root = new URL(request.url).origin;
  return response.redirect(root);
});

app.serve(8080);
