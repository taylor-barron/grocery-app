import CompletedItem from './CompletedItem'

const Frequent = ({ email, items, categories, mode, toggle, onEditItem, onDeleteItem }) => {

    const frequentItems = items.filter(item => item.frequency === true)
    const frequentCompletedItems = frequentItems.filter(frequentItem => frequentItem.completed === true)

    if (frequentCompletedItems.length != 0) {
        return (
            <>
                <h2 className='completed-h2'>Frequent Purchases</h2>
                {frequentCompletedItems.map((item, index) => (
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

export default Frequent