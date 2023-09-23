"use client";


import { useSupabaseClient ,useSessionContext} from "@supabase/auth-helpers-react";
import Modal  from "/home/suhaib/spotify-clone/components/Modal";
import { useRouter } from "next/navigation";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";

const AuthModal = () => {

    const supabaseClient = useSupabaseClient();

    const router =useRouter();
    const { session } = useSessionContext();
   

    const {onClose,isOpen}= useAuthModal();
    console.log("auth modal client");

    useEffect(()=>{
        if(session) {
            router.refresh();
            onClose();
        }
    },[session,router,onClose]);

    const onChange= (open:boolean) =>{
        if(!open)
        {
            onClose();
        }
    }


    return (
        <Modal title="Welcome back" 
        description="Login to your accont"
        isOpen={isOpen}
        onChange={onChange}
        >

        <Auth 
        theme="dark"
        magicLink
        providers={["github"]}
        supabaseClient={supabaseClient}
        appearance={{
            theme:ThemeSupa,
            variables:{
                default:{
                    colors:{
                        brand: '#404040',
                        brandAccent: '#22c55e'
                    }
                }
            }
        }}>

        </Auth>

        </Modal>
    );
}

export default AuthModal;



