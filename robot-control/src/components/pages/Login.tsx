import React, { useContext, useState } from "react";
import { LoginPageButton } from "../login/LoginPageButton.tsx";
import LoginInput from "../login/LoginInput.tsx";
import { useNavigate } from "react-router-dom";
import { POST } from "../../composables/api.ts";
import urls from "../../composables/urls.json";
import { UserContext } from "../ContentRouter.tsx";
import Loading from "../common/Loading.tsx";
import { ITokenModel } from "../../models/ITokenModel.ts";

export function Login() {
  const { setLogin } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function signIn() {
    setLoading(true);
    const data = {
      password: password,
      username: username,
    };
    try {
      //const token_vals = await POST(urls.login, data);
      const token_vals: ITokenModel = {
        success: true,
        access_token: "",
        refresh_token: "",
        token_type: "",
      };
      console.log(token_vals);
      if (token_vals.success) {
        setLoading(false);
        setLogin(token_vals);
        navigate("/dashboard");
      }
    } catch (e) {
      setLoading(false);
      setError("Incorrect Username or Password");
      console.error("Error logging in: ", e);
    }
  }

  console.log(username, password);
  return (
    <div className="w-full h-full flex items-center justify-center overflow-x-hidden overscroll-contain overflow-auto p-4">
      <div className="pt-4 h-full flex flex-col items-center w-full md:w-[34rem]">
        <div className="w-full flex items-center justify-center min-h-[3.75rem] max-h-[180px] gap-4">
          <p className="text-6xl text-neutral-100 md:my-10 mb-14 md:mb-20 text-center text-nowrap">
            Capstone 2023/2024
          </p>
        </div>

        <div
          className={`relative p-10 w-full flex flex-col bg-neutral-100 rounded-xl overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.8)] transition-all ease-in-out duration-300`}
        >
          <div className="h-[72px] max-h-[72px] min-h-[72px] flex flex-col">
            <h1 className="text-2xl font-semibold">Login</h1>
            <p className="text-red-500 mt-auto">{error}</p>
          </div>
          <form
            className="flex flex-col flex-grow gap-10 text-xl"
            onSubmit={async (event) => {
              event.preventDefault();
              await signIn();
            }}
          >
            <LoginInput setUsername={setUsername} setPassword={setPassword} />
            <div className="mt-auto w-full flex flex-col items-center justify-center gap-4">
              <LoginPageButton
                prompt={loading ? <Loading /> : "Login"}
                id="login"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
