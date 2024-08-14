import { useEffect, useState } from "react";
import style from "./style.module.scss"
import { createClient } from "microcms-js-sdk";
import { useParams } from "react-router-dom";
import { ListTitle } from "@/components/parts/listTitle/ListTitle";
import { Groups } from "../../../types/type";
import { Card, CardContent } from "@/components/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogImg
  } from "@/components/ui/dialog"

export const GalleryDetail = () => {
    const [group, setGroup] = useState<Groups>()
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
        ( isLoading ?
            <>
                <p>...</p>
            </>
            :
            <>
                <div className={style.main}>
                    <ListTitle text={group.title} size="l" />
                    <p>{group?.description}</p>
                    <div className={style.imgs}>
                        <div className={style["img-list"]}>
                            { group.items.map((item)=>{
                                return (
                                    <>
                                        <Dialog>
                                            <DialogTrigger>
                                                <img className={style.thumbnail} src={item.image.url} alt="" />
                                            </DialogTrigger>
                                            <DialogContent className="max-h-[90%] overflow-hidden">
                                                <DialogHeader>
                                                    <DialogTitle>{item.title}</DialogTitle>
                                                </DialogHeader>
                                                <DialogImg>
                                                    <div className={style["dialog-img"]}>
                                                        <img src={item.image.url} alt="" />
                                                    </div>
                                                </DialogImg>
                                                <DialogDescription>{item.comment}</DialogDescription>
                                            </DialogContent>
                                        </Dialog>
                                    </>
                                )
                                })
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    )
}