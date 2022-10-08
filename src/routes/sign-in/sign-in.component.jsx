import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

import "./sign-in.styles.scss"

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import LogIn from "../../components/log-in/log-in.component";


const SignIn = () => {
  return (
    <div className="sign-in-container">
      {/* <h1>Sign in page</h1> */}
      <LogIn />
      <SignUpForm />
    </div>
  );
}


export default SignIn;