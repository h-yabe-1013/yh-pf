import { useEffect, useState } from "react";
import style from "./style.module.scss"
import { createClient } from "microcms-js-sdk";
import { Link, useParams } from "react-router-dom";
import { ListTitle } from "@/components/parts/listTitle/ListTitle";
import { Groups } from "../../../types/type";
// import { Card, CardContent } from "@/components/ui/card"
import { Loading } from "@/pages/misc/loading";

export const GalleryDetail = () => {
    const [group, setGroup] = useState<Groups>(
        {
            id: "",
            createdAt: "",
            updatedAt: "",
            publishedAt: "",
            revisedAt: "",
            title: "",
            description: "",
            items: [],
            totalCount: 0,
            offset: 0,
            limit: 0
        }
    )
    const [isLoading, setIsLoading] = useState(true)
    const [isPreviewOpen, setIsPreviewOpen] = useState(false)
    // const [selectingIndex, setSelectingIndex] = useState(0)
    const [selectingIndex] = useState(0)

    const {id} = useParams()

    const client = createClient({
        serviceDomain: "yabeharu-portfolio",
        apiKey: import.meta.env.VITE_MICRO_CMS_API_KEY,
      });
      
    const microCMSGroupData = async () => {
    client
    .get({
        endpoint: "group",
        contentId: id,
    })
    .then((res) => {
        setGroup(res)
        setIsLoading(false)
    })
    .catch((err) => console.log(err));
    };

    useEffect(()=>{
        const getData=async()=>{
            setIsLoading(true)
            microCMSGroupData()
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
                    <ListTitle text={group.title} size="l" />
                    <p className={style.description}>{group?.description}</p>
                    <div className={style.imgs}>
                        { isPreviewOpen ?
                            <>
                                <img className={style["preview-img"]} src={group.items[selectingIndex].image.url} alt="" />
                                <div className={style["preview-box"]} onClick={()=>{setIsPreviewOpen(false)}} />
                            </>
                        :
                            <div className={style["img-list"]}>
                                { group.items.map((item)=>{
                                    return (
                                        <>
                                          <Link to={`/art/`+item.id}>
                                            <img className={style.thumbnail} src={item.image.url} alt=""/>
                                          </Link>
                                        </>
                                    )
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
            </>
        )
    )
}