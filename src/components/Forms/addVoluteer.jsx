import { useForm } from "react-hook-form";
import styles from "../../CSS/Admin/addnews.module.css"; // Reuse existing form styles
import { useState } from 'react';
import apiClient from '../../utils/apiClients.js';

// Regex validation (from your contact form)
const nameRegex = /^[A-Za-z\s'-]{2,40}$/;
const phoneRegex = /^[0-9]{7,15}$/;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

function AddVolunteerForm({ onVolunteerAdded, handleClose }) {
    const [serverError, setServerError] = useState('');
    
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            firstname: "",
            middlename: "",
            lastname: "",
            dob: "",
            email: "",
            phone: "",
            message: "",
            // Since admin is adding, default status to 'approved'
            status: "approved", 
            // Admin is implicitly giving consent
            consent: true, 
        },
    });

    const onSubmit = async (data) => {
        setServerError('');
        try {
            const res = await apiClient("/volunteer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                // Check for Mongoose validation errors
                if (errData.errors) {
                    const errorMsg = errData.errors.join(', ');
                    throw new Error(errorMsg);
                }
                throw new Error(errData?.message || "Submission failed");
            }
            
            reset();
            alert("New volunteer added successfully!");
            onVolunteerAdded(); // This will refresh the list in team.jsx
            handleClose(); // This will close the modal

        } catch (e) {
            setServerError(e.message);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Add New Volunteer</h2>

            <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                
                <div className={styles.field}>
                    <label>First Name</label>
                    <input
                        type="text"
                        {...register("firstname", {
                            required: "First name is required",
                            pattern: { value: nameRegex, message: "Invalid name format" },
                        })}
                    />
                    {errors.firstname && <span className={styles.error}>{errors.firstname.message}</span>}
                </div>

                <div className={styles.field}>
                    <label>Middle Name</label>
                    <input
                        type="text"
                        {...register("middlename", {
                            required: "Middle name is required",
                            pattern: { value: nameRegex, message: "Invalid name format" },
                        })}
                    />
                    {errors.middlename && <span className={styles.error}>{errors.middlename.message}</span>}
                </div>

                <div className={styles.field}>
                    <label>Last Name</label>
                    <input
                        type="text"
                        {...register("lastname", {
                            required: "Last name is required",
                            pattern: { value: nameRegex, message: "Invalid name format" },
                        })}
                    />
                    {errors.lastname && <span className={styles.error}>{errors.lastname.message}</span>}
                </div>

                <div className={styles.field}>
                    <label>Date of Birth</label>
                    <input
                        type="date"
                        {...register("dob", { required: "Date of birth is required" })}
                    />
                    {errors.dob && <span className={styles.error}>{errors.dob.message}</span>}
                </div>

                <div className={styles.field}>
                    <label>Email</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: { value: emailRegex, message: "Invalid email" },
                        })}
                    />
                    {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                </div>

                <div className={styles.field}>
                    <label>Phone Number</label>
                    <input
                        type="tel"
                        {...register("phone", {
                            required: "Phone is required",
                            pattern: { value: phoneRegex, message: "Invalid phone (7-15 digits)" },
                        })}
                    />
                    {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
                </div>

                <div className={styles.field}>
                    <label>Message (Optional)</label>
                    <textarea
                        rows="3"
                        {...register("message", { maxLength: { value: 500, message: "Max 500 characters" } })}
                    />
                    {errors.message && <span className={styles.error}>{errors.message.message}</span>}
                </div>

                <div className={styles.field}>
                    <label>Status</label>
                    <select {...register("status")}>
                        <option value="approved">Approved</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                {serverError && <span className={styles.error}>{serverError}</span>}

                <button className={styles.submit} type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Add Volunteer"}
                </button>
            </form>
        </div>
    );
}

export default AddVolunteerForm;
