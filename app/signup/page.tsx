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
import ErrorMessage from "../components/ErrorMessage";
import { userSchema, UserSchemaType } from "../validation";
import { useRouter } from "next/navigation";


//SINGUP PAGE
const Signup = () => {
  const [status, setStatus] = useState<{
    message?: string;
    error?: boolean;
  }>({
    message: "",
    error: false,
  });
  const [loading, setLoading] = useState(false);

  const route = useRouter()

  const methods = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
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
      const res= await axios.post("/api/users", data);
      setStatus({ message: res.data.message, error: false });
      setLoading(false);
      methods.reset()
      route.push(`/signup/verify-Email?userId=${res.data.userId}`)
      
    } catch (error: any) {
      console.log("Error while creating user", error);
      setStatus({ error: true, message: error.response.data.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className="flex w-full justify-center">
        <Flex
          direction="column"
          gap="3"
          maxWidth="340px"
          className="w-full p-7 border border-gray-200 rounded-lg"
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
              className="!rounded-md !h-[40px]"

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
              className="!rounded-md  !h-[40px]"
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
              className="!rounded-md  !h-[40px]"

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
              className="!rounded-md  !h-[40px]"

            />
            <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
          </Box>
          <Flex justify={"center"} mt="4">
            <Button
              type="submit"
              size="4"
              className="text-center !w-[200px] !rounded-lg"
            >
              Create Account
            </Button>
          </Flex>
        </Flex>
      </form>
    </FormProvider>
  );
};

export default Signup;
