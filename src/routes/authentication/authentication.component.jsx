import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth
} from "../../utils/firebase/firebase.utils";

import "./authentication.styles.scss"

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignIn from "../../components/sign-in/sign-in.component";


const Authentication = () => {
  return (
    <div className="authentication-container">
      {/* <h1>Sign in page</h1> */}
      <SignIn />
      <SignUpForm />
    </div>
  );
}


export default Authentication;