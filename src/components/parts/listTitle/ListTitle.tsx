import style from "./style.module.scss"

type Props = {
    text: string
    size?: "s" | "m" | "l"
}

export const ListTitle = (props:Props) => {
    const { text, size="m" } = props;
    return (
        <div className={style["list-title"]}>
            <p className={style[size]}>{text}</p>
            <div className={style["border"]} />
        </div>
    )
};