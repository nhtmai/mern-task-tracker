import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
    const [form, setForm] = useState({
        description: "",
        priority: "",
        date: "",
    });
    const navigate = useNavigate();

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }

    // This function will handle the submission.
    async function onSubmit(e) {
        e.preventDefault();

        // When a post request is sent to the create url, we'll add a new record to the database.
        const newTask = { ...form };

        await fetch("http://localhost:5000/task/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        })

        .catch(error => {
            window.alert(error);
            return;
        });

        setForm({ description: "", priority: "", date: "" });
        navigate("/");
    }

    // This following section will display the form that takes the input from the user.
    return (
        <div>
            <h3>Create New Task</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                    type="text"
                    className="form-control"
                    id="description"
                    value={form.description}
                    onChange={(e) => updateForm({ description: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <input
                    type="text"
                    className="form-control"
                    id="priority"
                    value={form.priority}
                    onChange={(e) => updateForm({ priority: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                    type="text"
                    className="form-control"
                    id="date"
                    value={form.date}
                    onChange={(e) => updateForm({ date: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <input
                    type="submit"
                    value="Create task"
                    className="btn btn-primary"
                    />
                </div>
            </form>
        </div>
    );
}