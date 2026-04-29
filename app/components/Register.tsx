import React from 'react';
import { GoogleLogin } from '@react-oauth/google';


interface RegisterProps {
    isDark: boolean;
    user: string;
    password: string;
    remember: boolean;
    errorMsg: string;
    setUser: (user: string) => void;
    setPassword: (password: string) => void;
    setRemember: (remember: boolean) => void;
    setErrorMsg: (errorMsg: string) => void;
    handleRegister: () => void;
    navigateTo: (page: string) => void;
    handleGoogleLogin: (response: any) => void;
}

export default function Register({ isDark, user, password, remember, errorMsg, setUser, setPassword, setRemember, setErrorMsg, handleRegister, navigateTo, handleGoogleLogin }: RegisterProps) {
    return (


        <div className={`min-h-screen flex flex-col ${isDark ? 'bg-black' : 'bg-white'}`}>
            <div className="flex flex-grow items-center justify-center">
                <div className={` p-10 mb-50 max-w-md w-full rounded-2xl`}>
                    <h2 className={`mt-10 text-center text-2xl/9 font-bold tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>Create your account</h2>
                    <div className="mt-2">
                        <label htmlFor="email" className={`block text-sm font-medium leading-6 ${isDark ? 'text-white' : 'text-black'}`}>Email address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            className={`block w-full rounded-md ${isDark ? 'text-white border border-zinc-100 bg-zinc-800' : ' text-black border border-zinc-800 bg-zinc-400 text-black'} px-3 py-1.5`}
                        />
                    </div>
                    <div className="mt-2">
                        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
                        <label htmlFor="username" className={`block text-sm font-medium leading-6 ${isDark ? 'text-white' : 'text-black'}`}>Username</label>
                        <input
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            id="username"
                            name="username"
                            type="text"
                            required
                            autoComplete="username"
                            className={`block w-full rounded-md ${isDark ? 'text-white border border-zinc-100 bg-zinc-800' : ' text-black border border-zinc-800 bg-zinc-400 text-black'} px-3 py-1.5`}
                        />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="password" className={`block text-sm font-medium leading-6 ${isDark ? 'text-white' : 'text-black'}`}>Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                            name="password"
                            type="password"
                            onKeyDown={(e) => { if (e.key === 'Enter') handleRegister(); }}
                            required
                            autoComplete="password"
                            className={`block w-full rounded-md ${isDark ? 'text-white border border-zinc-100 bg-zinc-800' : 'text-black border border-zinc-800 bg-zinc-400 text-black'} px-3 py-1.5`}
                        />
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <label htmlFor="remember" className={`font-medium ${isDark ? 'text-white' : 'text-black'}`}>Remember me</label>
                        <input
                            checked={remember}
                            onChange={(e) => setRemember(e.target.checked)}
                            id="remember"
                            name="remember"
                            type="checkbox"
                            className={`block rounded-md ${isDark ? 'text-white border border-zinc-100 bg-zinc-800' : 'text-black border border-zinc-800 bg-zinc-400 text-black'}`}
                        />
                    </div>
                    <button className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl mt-2`} onClick={handleRegister}>Register</button>
                    <div className="flex items-center gap-4 mt-6">
                        <hr className="flex-grow border-zinc-300" />
                        <span className="text-zinc-500">or</span>
                        <hr className="flex-grow border-zinc-300" />
                    </div>
                    <div className="mt-6 flex flex-col items-center gap-4">
                        <GoogleLogin
                            onSuccess={(response) => handleGoogleLogin(response)}
                            onError={() => {
                                console.log('Login Failed');
                                setErrorMsg("Google Authentication failed");
                            }}
                            useOneTap
                            theme={isDark ? "filled_black" : "outline"}
                            shape="pill"
                            width="320"
                        />

                    </div>
                    <div className="flex justify-center gap-2 mt-4 gap-4">
                        <p className={`text-center mt-6 text-gray-500`}>Already have an account?</p>
                        <button className={`cursor-pointer mt-6 hover:underline ${isDark ? 'text-sky-400' : 'text-sky-600'}`} onClick={() => navigateTo('login')}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}