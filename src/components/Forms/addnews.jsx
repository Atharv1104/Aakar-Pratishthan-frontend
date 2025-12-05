import { useForm } from "react-hook-form";
import styles from "../../CSS/Admin/addnews.module.css";
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import apiClient from '../../utils/apiClients.js';

function AddNews() {
    const { t } = useTranslation('forms');
    const [imagePreview, setImagePreview] = useState(null);
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            image: null,
        },
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('image', data.image[0]);

            
            const res = await apiClient("/news", { // Was "/api/upload"
                method: "POST",
                body: formData,
            });
            

            if (!res.ok) {
                throw new Error("Image upload failed");
            }

            reset();
            setImagePreview(null);
            alert("Image uploaded successfully!");
        } catch (e) {
            alert(e.message);
        }
    };

    return (
        <div className={styles.container}>
            <h2>{t('news.title')}</h2>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className={styles.field}>
                    <label>{t('news.upload')}</label>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image", {
                            required: "Image is required",
                            onChange: handleImageChange,
                            validate: {
                                fileSize: (files) => 
                                    !files[0] || files[0].size <= 5000000 || 'Image must be less than 5MB',
                                fileType: (files) =>
                                    !files[0] || files[0].type.startsWith('image/') || 'Please upload an image file',
                            }
                        })}
                    />
                    {errors.image && <span className={styles.error}>{errors.image.message}</span>}
                    {imagePreview && (
                        <div className={styles.preview}>
                            <img src={imagePreview} alt="Preview" />
                        </div>
                    )}
                </div>

                <button 
                    className={styles.submit} 
                    type="submit" 
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Uploading..." : "Upload Image"}
                </button>
            </form>
        </div>
    );
}

export default AddNews;