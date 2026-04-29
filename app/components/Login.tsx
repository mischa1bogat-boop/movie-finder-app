import React from 'react';
import { GoogleLogin } from '@react-oauth/google';


interface LoginFormProps {
    isDark: boolean;
    user: string;
    setUser: (val: string) => void;
    password: string;
    setPassword: (val: string) => void;
    errorMsg: string;
    remember: boolean;
    setRemember: (val: boolean) => void;
    handleLogin: () => void;
    navigateTo: (page: string) => void;
    handleGoogleLogin: (response: any) => void;
    setErrorMsg: (msg: string) => void;
}

export default function LoginForm(props: LoginFormProps) {
    const {
        isDark, user, setUser, password, setPassword,
        errorMsg, remember, setRemember, handleLogin, navigateTo, handleGoogleLogin
    } = props;

    return (
        <div className="flex flex-grow items-center justify-center">
            <div className={`p-10 mb-50 max-w-md w-full rounded-2xl`}>
                <h2 className={`mt-10 text-center text-2xl/9 font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>
                    Sign in to your account
                </h2>

                <div className="mt-2">
                    {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
                    <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>Username</label>
                    <input
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        className={`block w-full rounded-md px-3 py-1.5 ${isDark ? 'text-white border-zinc-100 bg-zinc-800' : 'text-black border-zinc-800 bg-zinc-400'}`}
                    />
                </div>

                <div className="mt-2">
                    <label className={`block text-sm font-medium ${isDark ? 'text-white' : 'text-black'}`}>Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
                        className={`block w-full rounded-md px-3 py-1.5 ${isDark ? 'text-white border-zinc-100 bg-zinc-800' : 'text-black border-zinc-800 bg-zinc-400'}`}
                    />
                </div>

                <div className="flex justify-between items-center mt-4">
                    <label className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>Remember me</label>
                    <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl mt-4" onClick={handleLogin}>Login</button>

                <div className="flex items-center gap-4 mt-6">
                    <hr className="flex-grow border-zinc-300" />
                    <span className="text-zinc-500">or</span>
                    <hr className="flex-grow border-zinc-300" />
                </div>
                <div className="flex justify-center mt-6">
                    <GoogleLogin
                        onSuccess={(response) => handleGoogleLogin(response)}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        useOneTap
                        theme={isDark ? "filled_black" : "outline"}
                        shape="pill"
                        width="320"
                    />

                </div>

                <p className="text-center mt-6 text-gray-500">Don't have an account?{' '}
                    <button className="text-sky-400 hover:underline" onClick={() => navigateTo('register')}>Register</button>
                </p>
            </div>
        </div>
    );
}
