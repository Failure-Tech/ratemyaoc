import Header from "@/components/header";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "@/constants/constants";

const Login = async () => {
    const session = (await cookies()).get(SESSION_COOKIE_NAME)?.value || null;    

    return (
        <>
            <Header session={session} />
        </>
    )
}

export default Login;