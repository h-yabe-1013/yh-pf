import { useEffect, useState } from "react";
import style from "./style.module.scss"
import { createClient } from "microcms-js-sdk";
import { useParams } from "react-router-dom";
import { ListTitle } from "@/components/parts/listTitle/ListTitle";

export const GalleryDetail = () => {
    const [group, setGroup] = useState([])
    const [isLoading, setIsLoading] = useState(true)

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
        <div className={style.main}>
            <ListTitle text={group.title} size="l" />
            <p>作品詳細</p>
        </div>
    )
}