import { SetStateAction, useEffect, useState } from "react";
import style from "./style.module.scss"
import { createClient } from "microcms-js-sdk";
import { useParams } from "react-router-dom";
import { ListTitle } from "@/components/parts/listTitle/ListTitle";
import { Content } from "../../../types/type";
import { Card, CardContent } from "@/components/ui/card"

export const ArtDetail = () => {
    const [art, setArt] = useState<Content>()
    const [isLoading, setIsLoading] = useState(true)
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)

    const {id} = useParams()

    const client = createClient({
        serviceDomain: "yabeharu-portfolio",
        apiKey: import.meta.env.VITE_MICRO_CMS_API_KEY,
      });
      
    const microCMSArtData = async () => {
    client
    .get({
        endpoint: "art",
        contentId: id,
    })
    .then((res) => {
        setArt(res)
        setIsLoading(false)
    })
    .catch((err) => console.log(err));
    };

    useEffect(()=>{
        const getData=async()=>{
            setIsLoading(true)
            microCMSArtData()
        }
        getData()
    },[])

    return (
        ( isLoading ?
            <>
                <p>...</p>
            </>
            :
            <>
                <div className={style.main}>
                    <ListTitle text={art.title} size="l" />
                    <p className={style.description}>{art?.comment}</p>
                    <div className={style.imgs}>
                        { isPreviewOpen ?
                            <>
                                <img className={style["preview-img"]} src={art?.image.url} alt="" />
                                <div className={style["preview-box"]} onClick={()=>{setIsPreviewOpen(false)}} />
                            </>
                        :
                            <div className={style["img-box"]}>
                                <img className={style.img} src={art?.image.url} alt="" onClick={()=>{
                                    setIsPreviewOpen(true);
                                }}/>
                            </div>
                        }
                    </div>
                </div>
            </>
        )
    )
}