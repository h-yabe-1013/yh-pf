import { Button } from "@/components/ui/button"
import style from "./style.module.scss"
import { Link } from "react-router-dom"

export const NotFound=()=>{
    return (
        <div className={style["not-found"]}>
            <div className="not-found-contents">
                <p className={style["not-found-text"]}>404 NotFound !</p>
                <Link to="/articles" className={style.link}>
                    <Button className={style.button}>記事一覧へ</Button>
                </Link>
            </div>
        </div>
    )
}