import CompletedItem from './CompletedItem'

const Infrequent = ({ items, mode, onShoppingFaItem }) => {

    const infrequentItems = items.filter(item => item.frequency === false)
    const infrequentCompletedItems = infrequentItems.filter(infrequentItem => infrequentItem.completed === true)
    return (
        <>
            <h2 className='completed-h2'>Infrequent Purchases</h2>
            <hr></hr>
            {infrequentCompletedItems.map((item, index) => (
                <CompletedItem key={index} item={item} mode={mode} onShoppingFaItem={onShoppingFaItem} />
            ))}
            <br></br>
        </>
    )
}

export default Infrequent