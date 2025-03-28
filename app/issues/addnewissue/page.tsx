// 'use client'
// import { IssueFormType, IssueSchema } from "@/app/validation";
import IssueForm from "../_components/IssueForm";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm, FormProvider } from "react-hook-form";

const Newpage = () => {
  // const methods = useForm<IssueFormType>({
  //     resolver: zodResolver(IssueSchema),
  //   });
  return (
    // <FormProvider {...methods}>
      <IssueForm />
    // </FormProvider>
  )
};

export default Newpage;
