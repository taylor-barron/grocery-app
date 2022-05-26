import CompletedItem from './CompletedItem'

const Infrequent = ({ email, items, categories, mode, toggle, onEditItem, onDeleteItem }) => {

    const infrequentItems = items.filter(item => item.frequency === false)
    const infrequentCompletedItems = infrequentItems.filter(infrequentItem => infrequentItem.completed === true)

    if (infrequentCompletedItems != 0) {
        return (
            <>
                <h2 className='completed-h2'>Infrequent Purchases</h2>
                {infrequentCompletedItems.map((item, index) => (
                    <div key={index}>
                        <CompletedItem email={email} categories={categories} item={item} mode={mode} toggle={toggle} onEditItem={onEditItem} onDeleteItem={onDeleteItem} />
                        <hr></hr>
                    </div>
                ))}
                <br></br>
            </>
        )
    }
}

export default Infrequent