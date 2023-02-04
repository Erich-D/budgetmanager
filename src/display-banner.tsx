



type DislayNumberProps = {
    title: string
    value: number
    prefix?: string
}

export function DisplayNumber(props: DislayNumberProps){
    return(
        <div>
            <h3>{props.title}</h3>
            <h5>{(props.prefix) && props.prefix}{props.value}</h5>
        </div>
    )
}