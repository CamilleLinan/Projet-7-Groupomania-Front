import React from "react";
import Log from '../components/Log/index.log';

const Login = () => {
    return (
        <div>
            <div>
                <Log signin={false} signup={true} />
            </div>
        </div>
    );
};

export default Login;