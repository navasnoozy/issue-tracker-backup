"use client";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(()=> import ("react-simplemde-editor"),{
    ssr:false,
})
import "easymde/dist/easymde.min.css";

import { Button, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueFormType {
  title: string;
  desription: string;
}

const Newpage = () => {
  const { register, control, handleSubmit } = useForm();
  const router = useRouter();

  return (
    <form
      className="max-w-md space-y-5 shadow-2xl p-6 rounded-md"
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/issues",data);
        router.push('/issues')
      })}
    >
      <TextField.Root placeholder="Title" {...register("title")} />
      <Controller
        name="description"
        control={control}
        render={({field}) => <SimpleMDE placeholder="Description" {...field} />}
      />

      <Button type="submit">Create Issue</Button>
    </form>
  );
};

export default Newpage;
