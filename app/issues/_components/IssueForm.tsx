// app/issues/_components/IssueForm.tsx file

"use client";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

import ErrorMessage from "@/app/components/ErrorMessage";
import { IssueFormType, IssueSchema } from "@/app/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue, Status } from "@prisma/client";
import { Box, Button, Callout, Spinner, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RxInfoCircled } from "react-icons/rx";
import { z } from "zod";
import SelectStatus from "@/app/components/SelectStatus";



//ADD NEW ISSUE
const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormType>({
    resolver: zodResolver(IssueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
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
          <Controller
            name="status"
            control={control}
            defaultValue={issue?.status || "OPEN"}
            render={({ field }) => (
              <SelectStatus status={field?.value as Status} />
            )}
          />
        </Box>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE className="mt-4" placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage children={errors.description?.message} />

        <Button type="submit" disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit Issue "}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
