import { FC } from "react";
import { useForm } from "react-hook-form";
import { FormInput } from "../../../components/FormElements";
import Button from "../../../components/Button";

interface TodoFormProps {
  defaultValues?: {
    title: string;
  };
  handleSubmit: (values: { title: string }) => void;
}

const TodoForm: FC<TodoFormProps> = (props) => {
  const { register, handleSubmit } = useForm<{ title: string }>({
    defaultValues: props.defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(props.handleSubmit)}>
      <div className="mb-2">
        <FormInput
          placeholder="Enter title"
          {...register("title", { required: true })}
        />
      </div>
      <div className="flex justify-center">
        <Button className="w-full">Save</Button>
      </div>
    </form>
  );
};

export default TodoForm;
