import { FC, useCallback, useState } from "react";
import { TodoModel } from "../../../data/Todo";
import { Trash, Edit } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  toggleComplete,
  updateTodo,
} from "../../../store/todoSlice";
import Modal from "../../../components/Modal";
import TodoForm from "./TodoForm";
import { FormInput } from "../../../components/FormElements";
import { twMerge } from "tailwind-merge";

interface TodoItemProps extends TodoModel {}

const ICON_SIZE = 24;

const TodoItem: FC<TodoItemProps> = ({ id, title, completed, createdAt }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = (id: number) => dispatch(deleteTodo(id));

  const onClose = useCallback(() => setOpen(false), []);

  const openUpdateModal = () => setOpen(true);

  const update = useCallback(
    (values: { title: string }) => {
      dispatch(updateTodo({ id, title: values.title }));
      onClose();
    },
    [dispatch, id, onClose]
  );

  return (
    <>
      <div className="flex mb-1 first:mt-0 last:mb-0 items-center  shadow-sm p-2 border border-gray-300 rounded-lg">
        <div className="w-5 h-5 mr-2">
          <FormInput
            checked={completed}
            type="checkbox"
            onChange={() => dispatch(toggleComplete(id))}
            className="w-5 h-5 cursor-pointer"
          />
        </div>
        <div className="flex-1">
          <p
            className={twMerge(["text-xl flex-1", completed && "line-through"])}
          >
            {title}
          </p>
          <span className="ml-auto">
            {new Date(createdAt).toLocaleString()}
          </span>
        </div>
        <div className="w-10 h-full flex flex-row items-center">
          <Trash
            width={ICON_SIZE}
            onClick={() => handleDelete(id)}
            className="cursor-pointer"
            height={ICON_SIZE}
          />
          <Edit
            width={ICON_SIZE}
            onClick={openUpdateModal}
            className="cursor-pointer"
            height={ICON_SIZE}
          />
        </div>
      </div>
      <Modal show={open} onClose={onClose}>
        <TodoForm defaultValues={{ title }} handleSubmit={update} />
      </Modal>
    </>
  );
};

export default TodoItem;
