import { Controller, useFormContext } from "react-hook-form";
import dynamic from "next/dynamic";
import ErrorMessage from "./ErrorMessage";
import { IssueFormType } from "../validation";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const SimpleMDETextField = ({ description }: { description?: string }) => {
  const { control, formState:{errors} } = useFormContext<IssueFormType>();
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
      <ErrorMessage children={errors.description?.message} />
    </>
  );
};

export default SimpleMDETextField;
