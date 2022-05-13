import Item from './Item'

const Infrequent = ({ items, deleteOrShop }) => {

    const infrequentItems = items.filter(item => item.frequency === false)
    const infrequentCompletedItems = infrequentItems.filter(infrequentItem => infrequentItem.completed === true)
    return (
        <>
            <h2>Infrequent Purchases</h2>
            <hr></hr>
            {infrequentCompletedItems.map((item, index) => (
                <Item key={index} item={item} deleteOrShop={deleteOrShop} />
            ))}
            <br></br>
        </>
    )
}

export default Infrequent