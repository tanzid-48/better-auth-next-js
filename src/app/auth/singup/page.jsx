"use client";
import React, { useState } from "react";
import { Check, Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

const SingUpPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // Convert FormData to plain object
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    console.log(data);

    const { data: res, error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });

    if (error) {
      alert("❌ Error:", error);
    } else {
      alert("✅ Success:", res);
    }

    console.log(res, error);
  };

  return (
    <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
      <TextField isRequired className="w-full max-w-64" name="fullName">
        <Label>Full Name</Label>
        <Input name="name" placeholder="Your Name" />
        <Description>This field is required</Description>
      </TextField>
      <TextField
        isRequired
        name="email"
        type="email"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label>Email</Label>
        <Input name="email" placeholder="your email  abc@example.com" />
        <FieldError />
      </TextField>
      <TextField className="w-full max-w-[280px]" name="password">
        <Label>Password</Label>
        <InputGroup>
          <InputGroup.Input
            className="w-full max-w-[280px]"
            type={isVisible ? "text" : "password"}
            name="password"
            placeholder="Your Password"
          />
          <InputGroup.Suffix className="pr-0">
            <Button
              isIconOnly
              aria-label={isVisible ? "Hide password" : "Show password"}
              size="sm"
              variant="ghost"
              onPress={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <Eye className="size-4" />
              ) : (
                <EyeSlash className="size-4" />
              )}
            </Button>
          </InputGroup.Suffix>
        </InputGroup>
      </TextField>
      <div className="flex gap-2">
        <Button type="submit">
          <Check />
          Submit
        </Button>
        <Button type="reset" variant="secondary">
          Reset
        </Button>
      </div>
    </Form>
  );
};

export default SingUpPage;
