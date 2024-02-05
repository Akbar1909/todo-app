import { useSearchParams } from "react-router-dom";
import { FormInput } from "../../../components/FormElements";

const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchParams.set(e.target.name, String(e.target.checked));
    setSearchParams(searchParams);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center">
        <FormInput
          onChange={handleCheckbox}
          name="complete"
          type="checkbox"
          checked={searchParams.get("complete") === "true"}
          className="w-5 h-5 mr-3 cursor-pointer"
        />
        <label htmlFor="">Completed</label>
      </div>
      <div className="flex items-center">
        <FormInput
          name="incomplete"
          onChange={handleCheckbox}
          checked={searchParams.get("incomplete") === "true"}
          type="checkbox"
          className="w-5 h-5 mr-3 cursor-pointer"
        />
        <label htmlFor="">InCompleted</label>
      </div>
    </div>
  );
};

export default Filter;
