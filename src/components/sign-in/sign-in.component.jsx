import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signUserInWithEmailAndPassword,
  getUserFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-in.styles.scss"

import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";


const initialFormValues = {
  email: "",
  password: "",
}

const SignIn = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const { email, password } = formValues;

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(`there was a change with formValues, new value for ${name} is ${value}`)
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { user } = await signUserInWithEmailAndPassword(email, password);
    console.log("user = ", user);

    try {
      const userRecord = await getUserFromAuth(user);
      console.log(userRecord.data());
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }

  }

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div className="log-in-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          inputOptions={{
            type: "text",
            required: true,
            name: "email",
            value: email,
            onChange: handleChange,
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            required: true,
            name: "password",
            value: password,
            onChange: handleChange,
          }}
        />

        <Button
          buttonOptions={{
            type: "submit",
          }}
        >
          Sign In
        </Button>
      </form>

      <Button
        buttonType="google"
        buttonOptions={{
          onClick: logGoogleUser,
        }}
      >
        Sign in with google
      </Button>
    </div>
  );
}


export default SignIn