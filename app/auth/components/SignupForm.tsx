//app/auth/components/signupForm.tsx file

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Callout,
  Flex,
  Heading,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RxInfoCircled } from "react-icons/rx";
import ErrorMessage from "@/app/components/ErrorMessage";
import { signupSchema, signUpSchemaType } from "@/app/validation";
import { useRouter } from "next/navigation";
import Link from "next/link";

type customError = {
     response?:{
      data?:{
        message:string
      
     }
  }
}

//SINGUP PAGE
const SignupForm = () => {
  const [status, setStatus] = useState<{
    message?: string;
    error?: boolean;
  }>({
    message: "",
    error: false,
  });
  const [loading, setLoading] = useState(false);

  const route = useRouter();

  const methods = useForm<signUpSchemaType>({
    resolver: zodResolver(signupSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      setStatus({ message: "Creating Account", error: false });
      setLoading(true);
      const res = await axios.post("/api/users", data);
      setStatus({ message: res.data.message, error: false });
      setLoading(false);
      methods.reset();
      route.push(`/auth/verify-Email?userId=${res.data.userId}`);
    } catch (error) {
      const err = error as customError
      console.log("Error while creating user", error);
      setStatus({
        error: true,
        message: err.response?.data?.message|| "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  });

  return (
    <FormProvider {...methods}>
      <Flex
        direction="column"
        gap="3"
        maxWidth="340px"
        className="w-full p-7 border border-gray-200 rounded-lg"
      >
        <form
          onSubmit={onSubmit}
          className="space-y-2 flex flex-col justify-center"
        >
          <Heading size="5" mb="5" className="text-center">
            Create Account
          </Heading>

          {status?.message && (
            <Callout.Root color={status.error ? "red" : "green"}>
              <Callout.Icon>
                {loading ? <Spinner /> : <RxInfoCircled />}
              </Callout.Icon>
              <Callout.Text>{status.message}</Callout.Text>
            </Callout.Root>
          )}

          <Box>
            <Text size="3" color="gray">
              Name
            </Text>
            <TextField.Root
              {...register("name")}
              placeholder="Enter your name"
              className="!rounded-md "
            />
            <ErrorMessage>{errors.name?.message}</ErrorMessage>
          </Box>

          <Box>
            <Text size="3" color="gray" mt="4">
              Email
            </Text>
            <TextField.Root
              {...register("email")}
              placeholder="Enter your email"
              className="!rounded-md  "
            />
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </Box>

          <Box>
            <Text size="3" color="gray">
              Password
            </Text>
            <TextField.Root
              {...register("password")}
              type="password"
              placeholder="Enter your password"
              className="!rounded-md  "
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </Box>

          <Box>
            <Text size="3" color="gray">
              Confirm password
            </Text>
            <TextField.Root
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm the password"
              className="!rounded-md  "
            />
            <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
          </Box>

          <Button type="submit" className="text-center !mt-3 ">
            Create Account
          </Button>
        
        </form>
        <Flex align="center" gap="2">
            <Text size="3">Already have an account?</Text>
            <Link href={`/auth?formType=signin`}>Signin</Link>
          </Flex>
      </Flex>
    </FormProvider>
  );
};

export default SignupForm;
