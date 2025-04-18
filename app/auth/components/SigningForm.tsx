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
  const route = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //Handling form with React Hook Form and Zod
  const methods = useForm({
    resolver: zodResolver(signinSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit(async ({ email, password }) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) return setError(result.error);
      if (!result?.ok) throw new Error("Something went wrong");
      route.push("/");
      route.refresh();
    } catch (error) {
      console.log("An Error occured while authenticating", error);
      setError("An Error occured while authenticating");
    } finally {
      setLoading(false);
    }
  });
  ///////////////////////////////////////////////

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

          {error && (
            <Callout.Root color={error ? "red" : "green"}>
              <Callout.Icon>
                {loading ? <Spinner /> : <RxInfoCircled />}
              </Callout.Icon>
              <Callout.Text>{error}</Callout.Text>
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
        <Button
          onClick={() => signIn("github", { callbackUrl: `/` })}
          variant="outline"
        >
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
