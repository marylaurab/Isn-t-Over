export default function Pagination({next, prev}) {
    return (
        <div>
            <button onClick={()=>prev()}>Prev</button>
            <button onClick={()=>next()}>Next</button>
        </div>
    )
}