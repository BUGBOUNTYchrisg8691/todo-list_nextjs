import { ObjectId } from "mongodb";
import { connectToDatabase } from "../util/mongodb";

const Dashboard = ({ todos, user }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", margin: "20px" }}>
      <h2 style={{ margin: "20px" }}>Welcome back, {user.username}!</h2>
      <h1 style={{ margin: "10px" }}>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo._id.toString() + "todo"}
            style={{
              display: "flex",
              margin: "10px",
              alignItems: "center",
            }}
          >
            <h3 style={{ marginRight: "5px" }}>{todo.title}</h3>
            <input
              type="checkbox"
              name="completed"
              checked={todo.completed}
              style={{ marginLeft: "5px" }}
              onChange={() => {}}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps = async () => {
  const user_id = ObjectId("609059e41258af920b7de93a");

  const { db } = await connectToDatabase();

  const user = await db.collection("users").find({ _id: user_id }).next();

  const todos = await db
    .collection("todos")
    .find({ user_id: user_id })
    .toArray();

  return {
    props: {
      todos: JSON.parse(JSON.stringify(todos)),
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};

export default Dashboard;
