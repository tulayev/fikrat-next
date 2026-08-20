import styles from './About.module.css'

export default function Main() {
    return (
        <main>
            <div className={styles.main__img_wrapper}>
                <div>
                    <img
                        src="/images/about-img-1.jpg"
                        alt="About Image 1"
                    />
                    <h2>Bizning</h2>
                </div>
                <div>
                    <img
                        src="/images/about-img-2.jpg"
                        alt="About Image 2"
                    />
                    <h2>maqsad</h2>
                </div>
            </div>

            <div className="container">
                <div className={styles.main__wrapper}>
                    <div className="row">
                        <div className="col-12 col-xl-4">
                        <p>
                            Har kimning rivojlanish, o'zgarish va xabardorlikka ehtiyoji bor. Maqsadimiz - har bir vatandoshimiz bilan 
                            bilganlarimiz va o'rganayotganlarimizni baham ko'rish. O'z yondashuvimiz bilan har bir shaxsning 
                            rivojlanishiga hissa qo'shish, ilhomlantiruvchi fikr va g'oyalarni taklif qilish, bilimlarini oshirishlariga, 
                            muammolariga yechim topishlariga yordam berish.
                         </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}