import { useState } from "react";
import loginUser from "../../data/apiRequest/graphQLRequest/authentication/login";
import signUpUser from "../../data/apiRequest/graphQLRequest/authentication/signUp";

export default function useAuthentication() {
  const [isLoading, setIsLoading] = useState(false);

  const login = (email, password) => {
    setIsLoading(true);
    return loginUser(email, password)
      .then(payload => {
        setIsLoading(false);
        return {
          errors: null,
          user: payload.login.user,
          token: payload.login.token
        };
      })
      .catch(errors => {
        setIsLoading(false);
        return { errors, user: null, token: null };
      });
  };

  const signUp = (name, email, password) => {
    setIsLoading(true);
    signUpUser(name, email, password)
      .then(payload => {
        setIsLoading(false);
        return {
          errors: null,
          user: payload.signup.user,
          token: payload.signup.token
        };
      })
      .catch(errors => {
        setIsLoading(false);
        return { errors, user: null, token: null };
      });
  };

  return { isLoading, login, signUp };
}
