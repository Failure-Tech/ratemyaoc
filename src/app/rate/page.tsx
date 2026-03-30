"use client";

import React, { FormEvent, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { firestore } from "@/utils/firebase/firebaseConfig";

/* 
- your name <=> current grade (c/o '26 - c/o '29)

- department (scrape)*
- course codes (scrape)*
- professor rating (1-5 <=> terrible-great)*
- professor difficulty (1-5 <=> terrible-great)*
- Would you take prof again (Y/N answer)*
- select 0-3 tags about the professor*
- write review*
*/

interface Form {
    name: string | undefined,
    grade: string | undefined,
    department: string | undefined,
    courseCode: string | undefined,
    professorName: string | undefined,
    rating: number,
    difficulty: number,
    wouldTake: string | undefined,
    review: string | undefined
}

const Form: React.FC = () => {
    const [name, setName] = useState<Form["name"]>("");
    const [grade, setGrade] = useState<Form["grade"]>("");
    const [department, setDepartment] = useState<Form["department"]>("");
    const [courseCode, setCourseCode] = useState<Form["courseCode"]>("");
    const [professorName, setProfessorName] = useState<Form["professorName"]>();
    const [rating, setProfessorRating] = useState<Form["rating"]>(0);
    const [difficulty, setDifficulty] = useState<Form["difficulty"]>(0);
    const [wouldTake, setWouldTake] = useState<Form["wouldTake"]>("");
    const [review, setReview] = useState<Form["review"]>("");

    const handleFormSubmission = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData: Form = {
            name,
            grade,
            department,
            courseCode,
            professorName,
            rating,
            difficulty,
            wouldTake,
            review,
        }
        try {
            await addDoc(collection(firestore, "data"), formData);
            console.log("Review successfully saved");

        } catch (error) {
            console.log("Error submitting document" + error);
        }
    }

    return (
        <>
            <main>
                <form onSubmit={handleFormSubmission}>
                    <div>
                        <label>Name: </label>
                        <input
                            type="text"
                            placeholder="First and Last Name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <label>Grade: </label>
                        <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                            <option value="">Select...</option>
                            <option value="freshman">Class of 2029</option>
                            <option value="sophomore">Class of 2028</option>
                            <option value="junior">Class of 2027</option>
                            <option value="senior">Class of 2026</option>
                        </select>

                        <label>Department: </label>
                        <input
                            type="text"
                            placeholder="Department..."
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                        />

                        <label>Course Code: </label>
                        <input
                            type="text"
                            placeholder="e.g. CS101"
                            value={courseCode}
                            onChange={(e) => setCourseCode(e.target.value)}
                        />

                        <label>Professor Name: </label>
                        <input
                            type="text"
                            value={professorName}
                            placeholder="Professor name"
                            onChange={(e) => setProfessorName(e.target.value)}
                        />

                        <label>Rating (1-5): </label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(e) => setProfessorRating(Number(e.target.value))}
                        />

                        <label>Difficulty (1-5): </label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={difficulty}
                            onChange={(e) => setDifficulty(Number(e.target.value))}
                        />

                        <label>Would Take Again: </label>
                        <select value={wouldTake} onChange={(e) => setWouldTake(e.target.value)}>
                            <option value="">Select...</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>

                        <label>Review: </label>
                        <textarea
                            placeholder="Write your review..."
                            value={review} 
                            onChange={(e) => setReview(e.target.value)}
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form> 
            </main>
        </>
    )
}

export default Form;