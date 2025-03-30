
import { Controller, useFormContext } from "react-hook-form";
import { IssueFormType } from "../validation";
import ErrorMessage from "./ErrorMessage";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";

const SimpleMDETextField = ({ description }: { description?: string }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<IssueFormType>();
  return (
    <>
      <Controller
        name="description"
        control={control}
        defaultValue={description}
        render={({ field }) => (
          <SimpleMDE className="mt-4" placeholder="Description" {...field} />
        )}
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>
    </>
  );
};

export default SimpleMDETextField;
