"use client";

import { useRouter } from "next/navigation";

import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";

import { useEffect, useState } from "react";

import Button from "@/components/Button";
import { postData } from "@/libs/helpers";

const AccountContent = () => {

    const router = useRouter();
    const subscribeModal = useSubscribeModal();
    const {isLoading,user,subscription} = useUser();

    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if(!isLoading && !user)
        {
            router.replace('/');
        }
    }

    ,[isLoading,user,router]);

    const redirectToCustomerPortal = async () => {
        setLoading(true);
        try {
            const {url,error} = await postData({
                url:'/api/create-portal-link',
            });
            window.location.assign(url);
        } catch(error)
        {
            if(error) return alert((error as Error).message);
        }

        setLoading(false);
    };
  
    return (
        <div className="mb-7 px-6">
            {!subscription && (
                <div className="flex flex-col gap-y-4">
                    <p>
                        You are not subscribed to any plan.
                    </p>
                    <Button
                    onClick={subscribeModal.onOpen}
                    className="w-[300px]"
                    >
                        Subscribe

                    </Button>

                </div>
            )
                }
                {subscription && (
                    <div className="flex flex-col gap-y-4">
                        <p>
                            You are subscribed to the <b>{subscription?.prices?.products?.name}</b> plan.
                        </p>
                        <Button
                         disabled={loading || isLoading}
                         onClick={redirectToCustomerPortal}
                         className="w-[300px]"
                        >
                            Open customer portal
                        </Button>


                    </div>
                )

                }
            
        </div>
    )
}
export default AccountContent;