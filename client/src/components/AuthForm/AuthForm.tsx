import { useState } from "react";
import { LoginForm } from "../LoginForm";
import { RegisterForm } from "../RegisterForm";
import "./AuthForm.css";
import { User } from "../../api/users";

interface Props {
  onSuccess: (user: User) => void;
}

export const AuthForm = ({ onSuccess }: Props) => {
  const [authType, setAuthType] = useState<string>("register");

  const handleClick = () => {
    setAuthType((prevState) =>
      prevState === "register" ? "auth" : "register",
    );
  };

  return (
    <>
      <div className="auth-form-container" />
      <div className="auth-form">
        {authType === "register" ? (
          <RegisterForm onSuccess={onSuccess} />
        ) : (
          <LoginForm onSuccess={onSuccess} />
        )}

        <div className="auth-form__info">
          <span>
            {authType === "register"
              ? "Уже есть аккаунт?"
              : "Ещё нет аккаунта?"}
          </span>

          <button className="auth-form__button" onClick={handleClick}>
            {authType === "register" ? "Войти" : "Создать аккаунт"}
          </button>
        </div>
      </div>
    </>
  );
};