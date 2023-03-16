const Book = (props) => {
    return (
        <>
        <h1>{props.title}</h1>
        <h2>Author: {props.author}</h2>
        <h3>ID: {props.id}</h3>
        <h3>Location: {props.loc}</h3>
        </>
    )
}