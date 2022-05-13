import Item from './Item'

const Frequent = ({ items, mode, onShoppingFaItem }) => {

    const frequentItems = items.filter(item => item.frequency === true)
    const frequentCompletedItems = frequentItems.filter(frequentItem => frequentItem.completed === true)
    return (
        <>
            <h2 className='completed-h2'>Frequent Purchases</h2>
            <hr></hr>
            {frequentCompletedItems.map((item, index) => (
                <Item key={index} item={item} mode={mode} onShoppingFaItem={onShoppingFaItem} />
            ))}
            <br></br>
        </>
    )
}

export default Frequent