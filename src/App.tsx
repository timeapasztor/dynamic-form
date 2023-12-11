import "./styles.css";

import DynamicForm from "./DynamicForm";
import { getData } from "./utils";

export default function App() {
  return (
    <div className="App" style={{ backgroundColor: "grey" }}>
      <h1>Dynamic Renderer</h1>
      <DynamicForm object={getData()} />
    </div>
  );
}
