import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import TodoItem from "./TodoItem";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

const TodoList = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const todos = useSelector((state: RootState) => state.todos);
  const complete = searchParams.get("complete") === "true";
  const incomplete = searchParams.get("incomplete") === "true";

  const renderList = useMemo(() => {
    const filteredList = todos.filter((todo) =>
      todo.title
        .toLowerCase()
        .trim()
        .startsWith((search || "")?.trim().toLowerCase())
    );

    if (complete && incomplete) return filteredList;

    if (complete) return filteredList.filter((todo) => todo.completed);

    if (incomplete) return filteredList.filter((todo) => !todo.completed);

    return [];
  }, [todos, complete, incomplete, search]);

  return (
    <div>
      {renderList.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}

      {renderList.length === 0 && (
        <div className="flex items-center justify-center">
          <p className="text-xl">No todos:🥳 </p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
