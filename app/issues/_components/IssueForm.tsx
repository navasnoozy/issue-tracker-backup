// app/issues/_components/IssueForm.tsx file

"use client";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

import ErrorMessage from "@/app/components/ErrorMessage";
import SelectStatus from "@/app/components/SelectStatus";
import SimpleMDETextField from "@/app/components/SimpleMDETextField";
import { IssueFormType, IssueSchema } from "@/app/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Box, Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {FormProvider, useForm} from "react-hook-form";
import { RxInfoCircled } from "react-icons/rx";

//ADD NEW ISSUE
const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [error, setError] = useState("");

  const methods = useForm<IssueFormType>({
    resolver: zodResolver(IssueSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);

      if (issue) {
        await axios.patch("/api/updateIssue", data);
      } else {
        await axios.post("/api/createIssue", data);
      }
      router.push("/issues");
    } catch (error) {
      setError("An unexpected Error occured");
    }
  });

  return (
    <FormProvider {...methods}>
      <div className="max-w-xl w-[100%] space-y-5 shadow-2xl p-6 rounded-md">
        {error && (
          <Callout.Root color="red">
            <Callout.Icon>
              <RxInfoCircled />
            </Callout.Icon>

            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <form onSubmit={onSubmit}>
          <TextField.Root
            placeholder="Title"
            defaultValue={issue?.title}
            {...register("title")}
          />
          <input className="hidden" {...register("id")} value={issue?.id} />
          <ErrorMessage children={errors.title?.message} />

          <Box className="mt-3">
            <SelectStatus status={issue?.status} />
          </Box>

          <SimpleMDETextField description={issue?.description} />

          <Button type="submit" disabled={isSubmitting}>
            {issue ? "Update Issue" : "Submit Issue "}
            {isSubmitting && <Spinner />}
          </Button>
        </form>
      </div>
    </FormProvider>
  );
};

export default IssueForm;
