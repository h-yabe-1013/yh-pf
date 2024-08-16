import { ListTitle } from "@/components/parts/listTitle/ListTitle"
import style from "./style.module.scss"

export const Contact=()=>{
    return(
        <div className={style.main}>
            <p>↓お仕事のご依頼はこちらから↓</p>
            <div className={style.logo}>
                <a href="https://coconala.com/">
                    <img src="src/assets/coconala.jpg" alt="" />
                </a>
            </div>
            <div className={style.mail}>
                <label>E-mail: </label>
                <a href="mailto:@gmail.com">xxxxxxxxx@gmail.com</a>
            </div>
        </div>
    )
}