



type DislayNumberProps = {
    title: string
    value: number
    overMax: boolean
    prefix?: string
}

export function DisplayNumber(props: DislayNumberProps){
    return(
        <div>
            <h3>{props.title}</h3>
            <h5 style={props.overMax ? {color:"red"}:{}}>{(props.prefix) && props.prefix}{props.value}</h5>
        </div>
    )
}