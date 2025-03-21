"use client";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});
import "easymde/dist/easymde.min.css";

import { Button, Callout, Spinner, Text, TextField } from "@radix-ui/themes";
import { RxInfoCircled } from "react-icons/rx";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createIssueSchema } from "@/app/validation";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueFormType = z.infer<typeof createIssueSchema>;

const Newpage =  () => {


    const router = useRouter();
    const [error, setError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors,isSubmitting },
  } = useForm<IssueFormType>({
    resolver: zodResolver(createIssueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected Error occured");
          }
        })



  return (
    <div className="max-w-xl w-[100%] space-y-5 shadow-2xl p-6 rounded-md">
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <RxInfoCircled />
          </Callout.Icon>

          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
     onSubmit={onSubmit}
      >
        <TextField.Root placeholder="Title" {...register("title")} />
        <ErrorMessage children={errors.title?.message} />
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE className="mt-4" placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage children={errors.description?.message} />

        <Button disabled={isSubmitting} type="submit">Create Issue {isSubmitting && <Spinner />}</Button>
      </form>
    </div>
  );
};

export default Newpage;
