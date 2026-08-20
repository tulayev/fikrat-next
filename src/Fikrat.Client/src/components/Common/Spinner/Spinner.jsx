import styles from './Spinner.module.css'

export default function Spinner() {
    return (
        <div id={styles.overlay}>
            <div id={styles.spinner}></div>
        </div>
    )
}