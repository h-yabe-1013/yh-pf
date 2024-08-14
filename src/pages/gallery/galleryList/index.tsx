import { useEffect, useState  } from "react";
import { Link } from "react-router-dom";
import { Loading } from "@/pages/misc/loading";
import style from "./style.module.scss"
import { createClient } from "microcms-js-sdk";
import { ListTitle } from "@/components/parts/listTitle/ListTitle";

type Tag = {
    id: string
    name: string
}

type Img = {
    url: string,
    height: number,
    width: number
}

type Content = {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    title: string
    category: ["画像" | "動画"]
    thumbnail: Img
    image: Img
    created_date: string
    creation_time: string
    comment?: string
    tags?: Tag[]
}

type Groups = {
    id: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    revisedAt: string
    title: string
    description?: string
    items: Content[]
    totalCount: number
    offset: number
    limit: number
}

export const GalleryList=()=>{
    const [isLoading, setIsLoading] = useState(true)
    const [groups, setGroups] = useState<Groups[]>([])

    const client = createClient({
      serviceDomain: "yabeharu-portfolio",
      apiKey: import.meta.env.VITE_MICRO_CMS_API_KEY,
    });
    
    const microCMSAllData = async () => {
      client
      .get({
        endpoint: "group",
      })
      .then((res) => {
        setGroups(res.contents)
        setIsLoading(false)
      })
      .catch((err) => console.log(err));
    };

    useEffect(()=>{
            const getData=async()=>{
                setIsLoading(true)
                microCMSAllData()
            }
            getData()
    },[])
    return (
        <div>
            {isLoading ?
                <Loading /> :
            <>
                {groups.length === 0 ? <p className={style["no-article-text"]}>記事がありません</p> : (
                    <div className={style["card-box"]}>
                        {groups.map((group:any)=>
                            <Link to={`/gallery/${group.id}`} key={group.id}>
                                <div className={style.card}>
                                    <ListTitle text={group.title} />
                                    <div className={style["group-list-img"]}>
                                        <img src={group.items[0].thumbnail.url} alt="" />
                                    </div>
                                </div>
                            </Link>
                        )}
                    </div>
                )}
            </>
            }
        </div>
    )
}