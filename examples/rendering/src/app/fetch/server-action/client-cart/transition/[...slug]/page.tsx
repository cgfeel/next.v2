import WithTheme from '@/src/lib/WithTheme';
import SearchBar from './SearchBar';
import styles from './styles.module.css';
import List from './List';

export default function Page({ params }: { params: { slug: string; } }) {
    const { slug } = params;

    return (
        <WithTheme>
            <div
                className={styles.search}
            >
                <SearchBar slug={slug} />
                <h1
                    className={styles.tips}
                >
                    This search page is: {slug}
                </h1>
                <List />
            </div>
        </WithTheme>
    );
}