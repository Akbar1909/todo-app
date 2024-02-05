import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import TodoForm from "./_components/TodoForm";
import { addTodo, deleteAll } from "../../store/todoSlice";
import TodoList from "./_components/TodoList";
import { FormInput } from "../../components/FormElements";
import Filter from "./_components/Filter";
import { useSearchParams } from "react-router-dom";
import { Trash } from "lucide-react";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const [modal, setModal] = useState<"create" | "closed" | "delete-all">(
    "closed"
  );

  const handleAddClick = () => setModal("create");

  const onClose = useCallback(() => setModal("closed"), []);

  const createTodo = useCallback(
    (values: { title: string }) => {
      dispatch(addTodo(values.title));
      onClose();
    },
    [dispatch, onClose]
  );

  useEffect(() => {
    searchParams.set("complete", "true");
    searchParams.set("incomplete", "true");
    setSearchParams(searchParams);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set("search", e.target.value || "");
    setSearchParams(searchParams);
  };

  const handleDeleteAll = () => {
    dispatch(deleteAll());
    onClose();
  };

  return (
    <>
      <div className="w-full sm:w-[500px] mt-10  m-auto">
        <div className="flex gap-4 mb-4 items-center">
          <Button onClick={() => setModal("delete-all")}>
            <Trash />
          </Button>

          <FormInput
            value={searchParams.get("search") || ""}
            placeholder="Search..."
            formInputSize="lg"
            onChange={handleSearch}
          />
          <Button onClick={handleAddClick}>Add</Button>
        </div>

        <div className="mb-2">
          <Filter />
        </div>

        <TodoList />
      </div>

      <Modal show={modal === "create"} onClose={onClose}>
        <TodoForm handleSubmit={createTodo} />
      </Modal>

      <Modal show={modal === "delete-all"}>
        <h2 className="text-[2rem] text-center">
          Are you sure to delete all ?{" "}
        </h2>
        <div className="flex items-center justify-center">
          <Button onClick={handleDeleteAll}>Delete</Button>
        </div>
      </Modal>
    </>
  );
};

export default HomePage;
