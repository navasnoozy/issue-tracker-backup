"use client";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(()=> import ("react-simplemde-editor"),{
    ssr:false,
})
import "easymde/dist/easymde.min.css";

import { Button, Callout, TextField } from "@radix-ui/themes";
import { RxInfoCircled } from "react-icons/rx";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IssueFormType {
  title: string;
  description: string;
}

const Newpage = () => {
  const { register, control, handleSubmit } = useForm<IssueFormType>();
  const router = useRouter();

  const [error, setError] = useState('');

  return (
    <div className="max-w-md space-y-5 shadow-2xl p-6 rounded-md">
        {error && <Callout.Root color="red" >
            <Callout.Icon>
		<RxInfoCircled />
	</Callout.Icon>
                
        <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
    <form
      className="space-y-5"
      onSubmit={handleSubmit(async (data) => {
       try {
        await axios.post("/api/issues",data);
        router.push('/issues')
       } catch (error) {
        setError('An unexpected Error occured')
       }
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
    </div>
  );
};

export default Newpage;
