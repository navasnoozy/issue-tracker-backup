"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  Flex,
  Heading,
  TextField,
  Text,
  Box,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { userSchema, UserSchemaType } from "../validation";
import ErrorMessage from "../components/ErrorMessage";
import axios from "axios";

const Signup = () => {
  const [error, setError] = useState();

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
      axios.get('')
    } catch (error) {}
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
          <Flex justify={"center"} mt='4'>
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
