import type { JSX } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../ts/api";
import { useAuth } from "../context/UseAuth";

type SignInFormInputs = {
    username: string;
    password: string;
};

function Sign_in(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<SignInFormInputs>();
    const { verifyAuth } = useAuth();

    const onSubmit = async (data: SignInFormInputs) => {
        const username = data.username;
        const password = data.password;
        try {
            const res = await api.post("api/Auth/login/", {
                username,
                password,
            });
            console.log(res);
            verifyAuth();

            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1>SIGN IN</h1>
            <div className="form-block">
                <form className="input-area" onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-field">
                        <p>Username</p>
                        <input
                            placeholder="New username..."
                            className="input-username"
                            {...register("username", {
                                required: "Username is required",
                            })}
                        />
                    </div>
                    <div className="input-field">
                        <p>Password</p>
                        <input
                            type="password"
                            placeholder="Password..."
                            className="input-password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />
                    </div>
                    <button className="login-button" type="submit">
                        Sign In
                    </button>
                </form>
                <div className="text-field">
                    <p>Already have an account?</p>
                    <Link to="/sign-up" className="sign-in-link">
                        Sign up
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Sign_in;
