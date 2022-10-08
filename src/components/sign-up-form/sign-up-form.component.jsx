import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-up-form.styles.scss"


const initialFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(initialFormFields); // Creating a state variable
  const { displayName, email, password, confirmPassword } = formFields; // Destructoring

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value }); // ... = Foreach element of formFields 
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      setFormFields(initialFormFields);
    } catch (error) {
      if (error.cod3e === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use.")
      } else {
        console.log(error.code);
        console.log(error.message);
      }
    }
  }

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          inputOptions={{
            type: "text",
            required: true,
            name: "displayName",
            value: displayName,
            onChange: handleChange,
          }}
        />

        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
            name: "email",
            value: email,
            onChange: handleChange,
          }}
        />

        <FormInput
          label="Password"
          inputOptions={{
            type: "password",
            name: "password",
            value: password,
            onChange: handleChange,
          }}
        />

        <FormInput
          label="Confirm Password"
          inputOptions={{
            type: "password",
            name: "confirmPassword",
            value: confirmPassword,
            onChange: handleChange,
          }}
        />

        <Button
          buttonOptions={{
            type: "submit",
          }}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
}


export default SignUpForm;