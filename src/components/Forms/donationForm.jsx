import { useForm } from "react-hook-form";
import styles from "../../CSS/Donationpage/donationform.module.css";
import { useTranslation } from 'react-i18next';
import apiClient from "../../utils/apiClients";
const nameRegex = /^[A-Za-z\s'-]{2,100}$/; // Updated to 100 to match model
const phoneRegex = /^[0-9]{7,15}$/;         
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const paymentIdRegex = /^[A-Za-z0-9_.-]+$/; // Simple regex for payment IDs


function DonationForm() {
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
            paymentId: "", // --- 1. ADDED paymentId ---
            message: "",
            consent: false,
        },
    });

    const onSubmit = async (data) => {
        try {
            // The API route is /api/donation, not api/donation
            const res = await apiClient("/donation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                // Check for Mongoose validation errors
                if (err.errors) {
                    throw new Error(err.errors.join(', '));
                }
                throw new Error(err?.message || "Submission failed");
            }
            reset();
            // Use a less intrusive success message
            alert("Thank you! Donation confirmation form submitted.");
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <>
        <div className={styles.container}>
            
            <h5>{t('donationinfo.subtitle')}</h5>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <h2 className={styles.title}>{t('form.title')}</h2>
                <p className={styles.subtitle}>{t('form.subtitle')}</p>

                <div className={styles.field}>
                    <label>{t('form.fullname')}</label>
                    <input
                        type="text"
                        placeholder="e.g., Ajay Suresh Salagre "
                        {...register("fullName", {
                            required: "Full name is required",
                            pattern: { value: nameRegex, message: "Use letters only (2–100 chars)" },
                        })} />
                    {/* --- 2. FIXED: errors.firstName -> errors.fullName --- */}
                    {errors.fullName && <span className={styles.error}>{errors.fullName.message}</span>}
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
                        // --- 3. FIXED: type="tel" -> type="number" ---
                        type="number" 
                        placeholder="Enter amount donated"
                        {...register("amount", {
                            required: "Amount is required",
                            // --- 4. FIXED: Use number validation ---
                            valueAsNumber: true,
                            min: { value: 1, message: "Donation must be at least ₹1" }
                        })} />
                    {/* --- 5. FIXED: errors.phone -> errors.amount --- */}
                    {errors.amount && <span className={styles.error}>{errors.amount.message}</span>}
                </div>

                {/* --- 6. ADDED: paymentId field --- */}
                <div className={styles.field}>
                    <label>Payment / Transaction ID</label>
                    <input
                        type="text"
                        placeholder="Enter the transaction ID from your payment"
                        {...register("paymentId", {
                            required: "Payment ID is required",
                            pattern: { value: paymentIdRegex, message: "Invalid payment ID format" }
                        })} />
                    {errors.paymentId && <span className={styles.error}>{errors.paymentId.message}</span>}
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
        </div>
            
        </>
    );
}
export default DonationForm;
