import { useState, useContext } from "react";

import {
  signInWithGooglePopup,
  signUserInWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import { UserContext } from "../../contexts/user.context"

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss"


const initialFormFields = {
  email: "",
  password: "",
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(initialFormFields); // Creating a state variable
  const { email, password } = formFields; // Destructoring

  const { setCurrentUser } = useContext(UserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value }); // ... = Foreach element of formFields 
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signUserInWithEmailAndPassword(email, password);
      setCurrentUser(user);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert(`Incorrect password for ${email}`); // TODO: Replace with custom alert class?
          break;
        case "auth/user-not-found":
          alert(`No user was found for that email.`); // TODO: Replace with custom alert class?
          break;
        default:
          console.log(error);
      }
    }
  }

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput
          label="Email"
          inputOptions={{
            type: "email",
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

        <div className="buttons-container">

          <Button buttonOptions={{ type: "submit", }}>
            Sign In
          </Button>

          <Button buttonType="google"
            buttonOptions={{
              type: "button",
              onClick: signInWithGoogle,
            }}
          >
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
}


export default SignInForm;