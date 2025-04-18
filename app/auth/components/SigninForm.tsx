//app/auth/components/signinForm.tsx file
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
  Separator,
} from "@radix-ui/themes";
import axios from "axios";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RxInfoCircled } from "react-icons/rx";
import ErrorMessage from "@/app/components/ErrorMessage";
import { signinSchema, signInSchemaType } from "@/app/validation";
import { useRouter } from "next/navigation";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Link from "next/link";

//SING-IN PAGE
const SigninForm = () => {
  const [status, setStatus] = useState<{
    message?: string;
    error?: boolean;
  }>({
    message: "",
    error: false,
  });
  const [loading, setLoading] = useState(false);

  const route = useRouter();

  const methods = useForm<signInSchemaType>({
    resolver: zodResolver(signinSchema),
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
    } catch (error: any) {
      console.log("Error while creating user", error);
      setStatus({
        error: true,
        message: error.response.data.message || "Something went wrong",
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
          <Heading size="5" mb="5" className="text-center ">
            Signin
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

          <Button type="submit" className="text-center !mt-3">
            Signin
          </Button>
        </form>

        <Separator size="4" mt="4" />
        <Text align={"center"} size="3">
          or signin with
        </Text>
        <Button
          onClick={() => signIn("google", { callbackUrl: `/` })}
          variant="outline"
        >
          <FaGoogle />
          Google
        </Button>
        <Button variant="outline">
          <FaGithub />
          GitHub
        </Button>
        <Flex align="center" gap="2" justify={"center"}>
          <Link href={`/auth?formType=signup`}>Create an Account</Link>
        </Flex>
      </Flex>
    </FormProvider>
  );
};

export default SigninForm;
