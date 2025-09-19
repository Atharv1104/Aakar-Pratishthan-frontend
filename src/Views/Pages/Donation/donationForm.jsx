


import { useForm } from "react-hook-form";
import styles from "../../../CSS/Donationpage/donationform.module.css";
import { useTranslation } from 'react-i18next';
const nameRegex = /^[A-Za-z\s'-]{2,40}$/;   // basic letters-only names
const phoneRegex = /^[0-9]{7,15}$/;         // digits only
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i; // common email

function donationForm() {
    const { t } = useTranslation('donationpage');
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            amount: "",
            message: "",
            consent: false,
        },
    });

    const onSubmit = async (data) => {
        try {
            const res = await fetch("/donation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err?.message || "Submission failed");
            }
            reset();
            alert("Thank you! Donation confirmation form submitted.");
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <>
        <div className={styles.container}>
            <h1> {t('title')}</h1>
            <h3>{t('subtitle')}</h3>
            <p className={styles.para}>{t('para')}</p>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <h2 className={styles.title}>{t('form.title')}</h2>
                <p className={styles.subtitle}>{t('form.subtitle')}</p>

                <div className={styles.field}>
                    <label>{t('form.fullname')}</label>
                    <input
                        type="text"
                        placeholder="e.g., Ajay Suresh Salagre "
                        {...register("fullName", {
                            required: "First name is required",
                            pattern: { value: nameRegex, message: "Use letters only (2–40 chars)" },
                        })} />
                    {errors.firstName && <span className={styles.error}>{errors.firstName.message}</span>}
                </div>





                <div className={styles.field}>
                    <label>{t('form.email')}</label>
                    <input
                        type="email"
                        placeholder="name@example.com"
                        {...register("email", {
                            required: "Email is required",
                            pattern: { value: emailRegex, message: "Enter a valid email address" },
                        })} />
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
                        })} />
                    {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
                </div>
                <div className={styles.field}>
                    <label>{t('form.amount')}</label>
                    <input
                        type="tel"
                        placeholder="Enter amount donated"
                        {...register("amount", {
                            required: "amount is required",
                            pattern: { value: phoneRegex, message: "Use 1–15 digits" },
                        })} />
                    {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
                </div>



                <div className={styles.field}>
                    <label>{t('form.message')}</label>
                    <textarea
                        rows="4"
                        placeholder="Share interests, skills, or preferred programs"
                        {...register("message", { maxLength: { value: 500, message: "Max 500 characters" } })} />
                    {errors.message && <span className={styles.error}>{errors.message.message}</span>}
                </div>

                <div className={styles.checkboxRow}>
                    <input
                        id="consent"
                        type="checkbox"
                        {...register("consent", { required: "Please accept to proceed" })} />
                    <label htmlFor="consent">
                        {t('form.agreement')}
                    </label>
                </div>
                {errors.consent && <span className={styles.error}>{errors.consent.message}</span>}

                <button className={styles.submit} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
            
        </>
    );
}
export default donationForm;