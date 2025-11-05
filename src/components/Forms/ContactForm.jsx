import { useForm } from "react-hook-form";
import styles from "../../CSS/Contact/contactform.module.css";
import { useTranslation } from 'react-i18next';

const nameRegex = /^[A-Za-z\s'-]{2,40}$/;   // basic letters-only names
const phoneRegex = /^[0-9]{7,15}$/;         // digits only
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i; // common email

function RegForm() {
    const { t } = useTranslation('contactpage');
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            dob: "",
            email: "",
            phone: "",
            message: "",
            consent: false,
        },
    });

    const onSubmit = async (data) => {
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err?.message || "Submission failed");
            }
            reset();
            alert("Thank you! Registration submitted.");
        } catch (e) {
            alert(e.message);
        }
    };

    return (

        <>
        <div className={styles.container}></div>
            <h2>{t('contact.title')}</h2>
            <div className={styles.contactcards}>
                <div className={styles.card}>
                    <p>{t('contact.person1.Name')}</p>
                    <p>{t('contact.person1.Email')}</p>
                    <p>{t('contact.person1.Mobile')}</p>
                </div>
                <div className={styles.card}>
                    <p>{t('contact.person2.Name')}</p>
                    <p>{t('contact.person2.Email')}</p>
                    <p>{t('contact.person2.Mobile')}</p>
                </div>
                <div className={styles.card}>
                    <p>{t('contact.person3.Name')}</p>
                    <p>{t('contact.person3.Email')}</p>
                    <p>{t('contact.person3.Mobile')}</p>
                </div>
                <div className={styles.card}>
                    <p>{t('contact.person4.Name')}</p>
                    <p>{t('contact.person4.Email')}</p>
                    <p>{t('contact.person4.Mobile')}</p>
                </div>
                <div className={styles.card}>
                    <p>{t('contact.person5.Name')}</p>
                    <p>{t('contact.person5.Email')}</p>
                    <p>{t('contact.person5.Mobile')}</p>
                </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <h2 className={styles.title}>{t('form.title')}</h2>
                <p className={styles.subtitle}>{t('form.subtitle')}</p>

                <div className={styles.field}>
                    <label>{t('form.firstname')}</label>
                    <input
                        type="text"
                        placeholder="e.g., Ajay"
                        {...register("firstName", {
                            required: "First name is required",
                            pattern: { value: nameRegex, message: "Use letters only (2–40 chars)" },
                        })}
                    />
                    {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}
                </div>

                <div className={styles.field}>
                    <label>{t('form.lastname')}</label>
                    <input
                        type="text"
                        placeholder="e.g., Salagare"
                        {...register("lastName", {
                            required: "Last name is required",
                            pattern: { value: nameRegex, message: "Use letters only (2–40 chars)" },
                        })}
                    />
                    {errors.lastName && <span className={styles.error}>{errors.lastName.message}</span>}
                </div>

                <div className={styles.field}>
                    <label> {t('form.dob')}</label>
                    <input
                        type="date"
                        {...register("dob", {
                            required: "Date of birth is required",
                            validate: value => {
                                if (!value) return "Date of birth is required";
                                const minDate = new Date("1920-01-01");
                                const maxDate = new Date();
                                const inputDate = new Date(value);
                                if (inputDate < minDate) return "Date too far in the past";
                                if (inputDate > maxDate) return "Date cannot be in the future";
                                return true;
                            }
                        })}
                    />
                    {errors.dob && <span className={styles.error}>{errors.dob.message}</span>}
                </div>

                <div className={styles.field}>
                    <label>{t('form.email')}</label>
                    <input
                        type="email"
                        placeholder="name@example.com"
                        {...register("email", {
                            required: "Email is required",
                            pattern: { value: emailRegex, message: "Enter a valid email address" },
                        })}
                    />
                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                </div>

                <div className={styles.field}>
                    <label>{t('form.phone')}</label>
                    <input
                        type="tel"
                        placeholder="Digits only"
                        {...register("phone", {
                            required: "Phone is required",
                            pattern: { value: phoneRegex, message: "Use 7–15 digits" },
                        })}
                    />
                    {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
                </div>



                <div className={styles.field}>
                    <label>{t('form.message')}</label>
                    <textarea
                        rows="4"
                        placeholder="Share interests, skills, or preferred programs"
                        {...register("message", { maxLength: { value: 500, message: "Max 500 characters" } })}
                    />
                    {errors.message && <span className={styles.error}>{errors.message.message}</span>}
                </div>

                <div className={styles.checkboxRow}>
                    <input
                        id="consent"
                        type="checkbox"
                        {...register("consent", { required: "Please accept to proceed" })}
                    />
                    <label htmlFor="consent">
                        {t('form.agreement')}
                    </label>
                </div>
                {errors.consent && <span className={styles.error}>{errors.consent.message}</span>}

                <button className={styles.submit} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </>


    );
}
export default RegForm;