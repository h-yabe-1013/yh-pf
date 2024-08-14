import style from "./style.module.scss"

export const Loading=()=>{
    return (
      <div className={style.box}>
        <div className={style.container}>
            <div className={style.circle} />
        </div>
      </div>
    )
}