import express, { Express, Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

const port = 3001;

type Todo = {
  id: number;
  name: string;
};

type HomePage = {
  headline: News;
  trending: News[];
  sports: News[];
};

type News = {
  id: number;
  title: string;
  content: string;
  imageURL: string;
  connection?:string;
};
const article: News[] = [
  {
    connection:"https://www.v3cars.com/media/model-imgs/1625554177-Discovery-Sport.jpg",
    id: 1,
    title: "India brings home its fourth bronze at the Paris Olympicsxxxx",
    content:
      "This is also the first time that India won back-to-back medals after a gap of 52 years. ",
    imageURL:
      "https://images.thequint.com/thequint/2024-08-08/nzckdiku/08081-ap08_08_2024_000463b.jpg?%20%20%20%20%20%20%20%20%20%20%20%20%20%20auto=format,compress&fmt=webp&format=webp&w=1200&h=900&dpr=1.0",
  }
];

const homePageData: HomePage = {
  headline: {
    id: 1,
    title: "India brings home its fourth bronze at the Paris Olympicsxxxx",
    content:
      "Featured ",
    imageURL:
      "https://images.thequint.com/thequint/2024-08-08/nzckdiku/08081-ap08_08_2024_000463b.jpg?%20%20%20%20%20%20%20%20%20%20%20%20%20%20auto=format,compress&fmt=webp&format=webp&w=1200&h=900&dpr=1.0",
  },
  sports: [{
    id:2,
    title: "pr sregesh  ",
    content: " sports",
    imageURL: "https://t3.ftcdn.net/jpg/02/87/04/00/360_F_287040077_U2ckmhpzeyqDHiybj0dfCfX6NRCEKdoe.jpg"
  }],
  trending: [
    {
      id:2,
      title: " Artificial intelligence - BBC",
      content: "Trending",
      imageURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyOD3jZb8LP2vaujzHa8VIVmak4wH_QUg02w&s"
    }
  ],
};

app.get("/artical", (req: Request, res: Response) => {
  console.log("CALLED artical data");
  res.send(article);
});


app.get("/homePageData", (req: Request, res: Response) => {
  console.log("CALLED home page data");
  res.send(homePageData);
});

const todos: Todo[] = [
  { id: 1, name: "car washing" },
  { id: 2, name: "clening house" },
];

app.use(cors());

app.get("/", (req, res) => {
  res.send("hello, Typescript with express..");
});

app.get("/user", (request, response) => {
  response.send({
    id: 1,
    name: "Abin",
    email: "abin@gmail.com",
  });
});

app.get("/todo", (req: Request, res: Response) => {
  console.log("TODO GET CALLED");
  res.send(todos);
});

// CREATE TODO

app.post("/todo", async (req: Request, res: Response) => {
  try {
    const newtodo: Todo = {
      // id: Math.random(),
      name: req.body.name,
      id: todos.length + 1,
    };

    todos.push(newtodo);
    console.log(todos);
    console.log(todos.length);

    res.send(todos);
  } catch (e) {
    console.error(e);
  }
});

//DELETE TODO

app.delete("/todo/:id", (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const index = todos.findIndex((t) => t.id === id);
    if (index > -1) {
      todos.splice(index, 1);
      console.log("todo data deleted");
    }

    console.log(todos);
    console.log(todos.length);

    res.send(todos);
  } catch (e) {
    console.error(e);
  }
});

// EDIT TODO (PUT REQUEST)
// app.put("/todo/:id",(req:Request,res:Response)=>{
//   try{

//   }catch(e){
//     console.error(e);

//   }
// });

app.put("/todo/:id", (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const todo = todos.find((t) => t.id === id);

    if (todo) {
      todo.name = name;
      console.log(`ToDo item with id ${id} updated`);
      res.send(todos);
    } else {
      res.status(404).send({ message: "ToDo item not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Server error" });
  }
});

app.patch("/todo/:id", (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const todo = todos.find((t) => t.id === id);

    if (todo) {
      todo.name = name;
      console.log(`ToDo item with id ${id} updated`);
      res.send(todos);
    } else {
      res.status(404).send({ message: "ToDo item not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
