interface Props{
    size?:number
}
function Loading({size=30}:Props) {
    return (
        <div className={'w-full mx-auto mt-3 loading '} style={{width:size, height:size}}/>
    );
}

export default Loading;