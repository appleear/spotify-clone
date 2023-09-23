"use client"

import MediaItem from "@/components/MediaItems";
import LikeButton from "@/components/LikeButton";
import { Song } from "@/types";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import {useEffect } from "react";
import useOnPlay from "@/hooks/useOnPlay";
interface LikedContentProps {
    songs:Song[];
};

const LikedContent : React.FC<LikedContentProps> =({
    songs
}) =>{
    const router = useRouter();
    const {isLoading, user} = useUser(); //isLoading is part of a type of design pattern

    const onPlay = useOnPlay(songs);

    useEffect(()=> {
        if(!isLoading && !user)
        {
            router.replace('/');
        }

    },[router,user,isLoading]);

    if(songs.length ===0)
    {
        return (
            <div className="
             flex
             flex-col
             gap-y-2
             w-full
             px-6
             text-neutral-400
            "> 
            No liked Songs.

            </div>
        )
    }
    return (
        <div className="flex flex-col gap-y-2 w-full p-6">
            {
                songs.map((song)=>(
                    <div key={song.id} 
                     className="flex items-center gap-x-4 w-full"
                    >
                        <div className="flex-1">
                        <MediaItem
                        onClick={(id:string)=>onPlay(id)}
                        data={song}
                        
                        />
                        </div>
                        <LikeButton songId={song.id}/>
                    </div>
                )
                    )
            }
        </div>
    );
}

export default LikedContent;




