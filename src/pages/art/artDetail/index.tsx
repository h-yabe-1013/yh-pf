import { useEffect, useState } from "react";
import style from "./style.module.scss"
import { createClient } from "microcms-js-sdk";
import { useParams } from "react-router-dom";
import { ListTitle } from "@/components/parts/listTitle/ListTitle";
import { Content } from "../../../types/type";
// import { Card, CardContent } from "@/components/ui/card";
import parse from 'html-react-parser';
import { Loading } from "@/pages/misc/loading";

export const ArtDetail = () => {
    const [art, setArt] = useState<Content>(
        {
            id: "",
            createdAt: "",
            updatedAt: "",
            publishedAt: "",
            revisedAt: "",
            title: "",
            category: ["画像"],
            thumbnail: {
                url: "",
                height: 0,
                width: 0
            },
            image: {
                url: "",
                height: 0,
                width: 0
            },
            created_date: "",
            creation_time: ""
        }
    );
    const [isLoading, setIsLoading] = useState(true);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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
                <Loading />
            </>
            :
            <>
                <div className={style.main}>
                    <ListTitle text={art.title} size="l" />
                    <div className={style["main-box"]}>
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
                        <div>
                            <p>作品コメント</p>
                            <div className={style.description}>
                                {art?.comment==null ? '' : 
                                    parse(String(art?.comment))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    )
}