import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useState } from 'react';
import styles from "../../CSS/Admin/addnews.module.css"; // Reuse the news form CSS
import apiClient from '../../utils/apiClients.js';

// This component is used inside a modal
function AddEventForm({ onUploadSuccess, handleClose }) { // Added handleClose
    const { t } = useTranslation('forms');
    const [imagePreview, setImagePreview] = useState([]);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: {
            title_mr: "",
            title_en: "",
            description_mr: "",
            description_en: "",
            location_mr: "",
            location_en: "",
            category: "Community",
            time: "",
            status: "upcoming",
            date: "",
            images: null,
        }
    });

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 4) {
            alert("You can only upload up to 5 images.");
            event.target.value = null;
            setImagePreview([]);
            return;
        }
        const previewUrls = files.map(file => URL.createObjectURL(file));
        setImagePreview(previewUrls);
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            
            // --- 1. Append all new bilingual fields ---
            formData.append('title_mr', data.title_mr);
            formData.append('title_en', data.title_en);
            formData.append('description_mr', data.description_mr);
            formData.append('description_en', data.description_en);
            formData.append('location_mr', data.location_mr);
            formData.append('location_en', data.location_en);

            // Append shared fields
            formData.append('category', data.category);
            formData.append('time', data.time);
            formData.append('status', data.status);
            formData.append('date', data.date); // This is eventDate
            
            if (data.images.length > 5) {
                 alert("Cannot upload more than 5 images.");
                 return;
            }
            for (let i = 0; i < data.images.length; i++) {
                formData.append('images', data.images[i]);
            }

            const res = await apiClient("/api/events", {
                method: "POST",
                body: formData, // Send FormData
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err?.message || "Submission failed");
            }
            reset();
            setImagePreview([]);
            alert("Event added successfully.");
            
            if (onUploadSuccess) onUploadSuccess();
            if (handleClose) handleClose(); // Close the modal

        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{t("event.add")}</h2>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                
                {/* --- 2. MARATHI FIELDS (Required) --- */}
                <h3 className={styles.sectionHeader}>Marathi Content (Required)</h3>
                <div className={styles.field}>
                    <label>{t("event.title")} (Marathi)</label>
                    <input type="text" {...register("title_mr", { required: "Marathi title is required" })} />
                    {errors.title_mr && <span className={styles.error}>{errors.title_mr.message}</span>}
                </div>
                <div className={styles.field}>
                    <label>{t("event.description")} (Marathi)</label>
                    <textarea {...register("description_mr", { required: "Marathi description is required" })} />
                    {errors.description_mr && <span className={styles.error}>{errors.description_mr.message}</span>}
                </div>
                <div className={styles.field}>
                    <label>{t("event.venu")} (Marathi)</label>
                    <input type="text" {...register("location_mr", { required: "Marathi location is required" })} />
                    {errors.location_mr && <span className={styles.error}>{errors.location_mr.message}</span>}
                </div>

                {/* --- 3. ENGLISH FIELDS (Optional) --- */}
                <h3 className={styles.sectionHeader}>English Content (Optional)</h3>
                <div className={styles.field}>
                    <label>{t("event.title")} (English)</label>
                    <input type="text" {...register("title_en")} />
                </div>
                <div className={styles.field}>
                    <label>{t("event.description")} (English)</label>
                    <textarea {...register("description_en")} />
                </div>
                <div className={styles.field}>
                    <label>{t("event.venu")} (English)</label>
                    <input type="text" {...register("location_en")} />
                </div>

                {/* --- 4. SHARED FIELDS (Unchanged) --- */}
                <h3 className={styles.sectionHeader}>Event Details</h3>
                <div className={styles.field}>
                    <label>{t("event.category")}</label> 
                    <select {...register("category", { required: "Category is required" })}>
                        <option value="Community">Community</option>
                        <option value="Educational">Educational</option>
                        <option value="Sports">Sports</option>
                        <option value="Awards">Awards</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.category && <span className={styles.error}>{errors.category.message}</span>}
                </div>
                <div className={styles.field}>
                    <label>{t("event.time")}</label>
                    <input type="text" {...register("time")} placeholder="e.g., 9:00 AM" />
                </div>
                <div className={styles.field}>
                    <label>{t("event.status")}</label> 
                    <select {...register("status", { required: "Status is required" })}>
                        <option value="upcoming">Upcoming</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div className={styles.field}>
                    <label>{t("event.date")}</label>
                    <input type="date" {...register("date", { required: "Date is required" })} />
                    {errors.date && <span className={styles.error}>{errors.date.message}</span>}
                </div>
                <div className={styles.field}>
                    <label>{t("event.upload")}</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        {...register("images", {
                            required: "Image(s) are required",
                            onChange: handleImageChange,
                            validate: {
                                maxFiles: (files) => files.length <= 5 || 'You can only upload up to 5 images.',
                            }
                        })}
                    />
                    {errors.images && <span className={styles.error}>{errors.images.message}</span>}
                    {imagePreview.length > 0 && (
                        <div className={styles.previewContainer}>
                            {imagePreview.map((src, index) => (
                                <div className={styles.preview} key={index}>
                                    <img src={src} alt={`Preview ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button className={styles.submit} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Add Event"}
                </button>
            </form>
        </div>
    );
}

export default AddEventForm;
