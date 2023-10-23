import List from "./List";

export default function page() {
    return (
        <List>
            <input
                name="message"
                type="text"
                style={{
                    backgroundColor: '#666'
                }}
            />
            <button
                type="submit"
            >
                submit
            </button>
        </List>
    );
}