import type { JSX } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../ts/api";

type SignUpFormInputs = {
    username: string;
    password: string;
};

function Sign_up(): JSX.Element {
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<SignUpFormInputs>();

    const onSubmit = async (data: SignUpFormInputs) => {
        const username = data.username;
        const password = data.password;

        try {
            const res = await api.post("api/Auth/register/", {
                username,
                password,
            });
            console.log(res);
            navigate("/sign-in");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
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
                        Sign up
                    </button>
                </form>
                <div className="text-field">
                    <p>Already have an account?</p>
                    <Link to="/sign-in" className="sign-up-link">
                        Sign in
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Sign_up;
