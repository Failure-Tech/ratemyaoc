"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { firestore, auth } from "@/utils/firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { LOGIN_ROUTE } from "@/constants/constants";
import redis from "@/utils/redis/redisConfig";

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
    classYear: string | undefined,
    department: string | undefined,
    courseCode: string,
    professorName: string | undefined,
    grade: string | undefined,
    rating: number,
    difficulty: number,
    wouldTake: string | undefined,
    review: string | undefined,
    date: Date | undefined
}

const ScaleSelector = ({
    label,
    value,
    onChange,
    lowLabel,
    highLabel,
}: {
    label: string;
    value: number;
    onChange: (v: number) => void;
    lowLabel: string;
    highLabel: string;
}) => (
    <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold tracking-widest uppercase text-white/50">
            {label}
        </label>
        <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
                <button
                    key={n}
                    type="button"
                    onClick={() => onChange(n)}
                    className={`flex-1 py-2.5 rounded text-sm font-bold transition-all duration-150 border hover:cursor-pointer ${
                        value === n
                            ? "bg-[#8B1A1A] border-[#8B1A1A] text-white shadow-lg shadow-[#8B1A1A]/20"
                            : "bg-white/5 border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"
                    }`}
                >
                    {n}
                </button>
            ))}
        </div>
        <div className="flex justify-between text-[10px] text-white/30 px-0.5">
            <span>{lowLabel}</span>
            <span>{highLabel}</span>
        </div>
    </div>
);

const GradeScaleSelector = ({
    label,
    value,
    onChange,
    lowLabel,
    highLabel,
}: {
    label: string | undefined;
    value: string | undefined;
    onChange: (v: string) => void;
    lowLabel: string;
    highLabel: string;
}) => (
    <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold tracking-widest uppercase text-white/50">
            {label}
        </label>
        <div className="flex gap-2">
            {["A", "B", "C", "D", "F"].map((g) => (
                <button
                    key={g}
                    type="button"
                    onClick={() => onChange(g)}
                    className={`flex-1 py-2.5 rounded text-sm font-bold transition-all duration-150 border hover:cursor-pointer ${
                        value === g
                            ? "bg-[#8B1A1A] border-[#8B1A1A] text-white shadow-lg shadow-[#8B1A1A]/20"
                            : "bg-white/5 border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"
                    }`}
                >
                    {g}
                </button>
            ))}
        </div>
        <div className="flex justify-between text-[10px] text-white/30 px-0.5">
            <span>{lowLabel}</span>
            <span>{highLabel}</span>
        </div>
    </div>
);

const Form: React.FC = () => {

    // interface children with all captured form elements
    const [name, setName] = useState<Form["name"]>("");
    const [classYear, setClassYear] = useState<Form["classYear"]>("");
    const [department, setDepartment] = useState<Form["department"]>("");
    const [courseCode, setCourseCode] = useState<Form["courseCode"]>("");
    const [professorName, setProfessorName] = useState<Form["professorName"]>();
    const [grade, setGrade] = useState<Form["grade"]>();
    const [rating, setProfessorRating] = useState<Form["rating"]>(0);
    const [difficulty, setDifficulty] = useState<Form["difficulty"]>(0);
    const [wouldTake, setWouldTake] = useState<Form["wouldTake"]>("");
    const [review, setReview] = useState<Form["review"]>("");

    const [departmentList, setDepartmentList] = useState<string[] | null>();

    // user auth
    const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);

    const date: Date = new Date();

    const router = useRouter();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserLoggedIn(true);
            }
        })

        // fetch departments
        const fetchDepartments = async () => {
            try {
                const cachedDepartments: string[] | null = await redis.get("departments");
                if (cachedDepartments) {
                    setDepartmentList(cachedDepartments);
                    console.log("used cached value")
                }
                else {
                    const response = await fetch("http://localhost:8080/departments")
                    const result = await response.json();
                    await redis.set("departments", result);
                    setDepartmentList(result);
                    console.log("sent request to api")
                }
            }
            catch (err) {
                // default for now since i lazy
                setDepartmentList(["Administration of Justice","Anthropology","Architecture","Art","Art Gallery","Athletics Department","Automotive","Biological and Environmental Sciences","Business","Computer Applications & Web Technologies","Certified Nursing Assistant","Chemistry","Cinema","Communication Studies","Community Ed","Computer Science","Construction Technology","Culinary Arts","Dance","Earth, Space and Environmental Sciences","Early Childhood Education","ECE Center","Economics","Electronic Systems","EMT","Engineering","English","ESL","Ethnic Studies","Fire Technology","Free Classes (Noncredit)","Graphic and Multimedia Design ","Health Science","History","Hotel Restaurant","Humanities","Interior Design","Kinesiology and Physical Education ","Manufacturing Technology","Mathematics","Media Entertainment Arts","Medical Laboratory Technician","Modern Languages & Cultures","Music","Networking","Nursing","Occupational Therapy Assistant","Paralegal","Philosophy","Photography","Physical Therapist Assistant","Physics","Political Science","Psychology","Real Estate","Recreation Management","Sign Language","Sociology","Sports Medicine","Surveying","Theatre","Water","Welding"]);
                console.log(err);
            }
        }

        fetchDepartments();

    }, []);

    const handleFormSubmission = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData: Form = {
            name,
            classYear,
            department,
            courseCode,
            professorName,
            grade,
            rating,
            difficulty,
            wouldTake,
            review,
            date
        }
        try {
            await addDoc(collection(firestore, "data"), formData);
            alert("Review successfully saved");
            location.reload();

        } catch (error) {
            console.log("Error submitting document" + error);
        }
    }

    const inputClass =
        "w-full bg-white/5 border border-white/10 rounded px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 focus:bg-white/8 transition-all duration-150";

    const selectClass =
        "w-full bg-[rgb(28,48,89)] border border-white/10 rounded px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/30 transition-all duration-150 appearance-none cursor-pointer";

    const labelClass =
        "text-xs font-semibold tracking-widest uppercase text-white/50";

    const fieldClass = "flex flex-col gap-2";

    return (
        userLoggedIn ? (
            <div
                className="min-h-screen px-4 py-12 flex flex-col items-center"
                style={{ backgroundColor: "rgb(28, 48, 89)" }}
            >
                <div className="fixed top-0 left-0 w-full h-1 bg-[#8B1A1A]" />

                <div className="w-full max-w-xl">
                    <div className="mb-10 text-center">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-[#8B1A1A] mb-2 font-semibold">
                            AOC Student Portal
                        </p>
                        <h1
                            className="text-3xl font-black text-white"
                            style={{ fontFamily: "'Georgia', serif" }}
                        >
                            Rate a Professor
                        </h1>
                        <p className="text-white/40 text-sm mt-2">
                            Help your fellow students make informed decisions
                        </p>
                    </div>

                    <form onSubmit={handleFormSubmission} className="flex flex-col gap-6">

                        <div className="bg-white/4 border border-white/8 rounded-xl p-6 flex flex-col gap-5">
                            <p className="text-[10px] tracking-widest uppercase text-white/30 font-semibold border-b border-white/8 pb-3">
                                About You
                            </p>

                            <div className={fieldClass}>
                                <label className={labelClass}>Your Name</label>
                                <input
                                    type="text"
                                    placeholder="First and Last Name..."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className={inputClass}
                                />
                            </div>

                            <div className={fieldClass}>
                                <label className={labelClass}>Class Year</label>
                                <div className="relative">
                                    <select
                                        value={classYear}
                                        onChange={(e) => setClassYear(e.target.value)}
                                        className={selectClass}
                                    >
                                        <option value="">Select...</option>
                                        <option value="freshman">Class of 2029</option>
                                        <option value="sophomore">Class of 2028</option>
                                        <option value="junior">Class of 2027</option>
                                        <option value="senior">Class of 2026</option>
                                    </select>
                                    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-xs">
                                        ▾
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/4 border border-white/8 rounded-xl p-6 flex flex-col gap-5">
                            <p className="text-[10px] tracking-widest uppercase text-white/30 font-semibold border-b border-white/8 pb-3">
                                Course Info
                            </p>

                            <div className={fieldClass}>
                                <label className={labelClass}>Department</label>
                                {/* <input
                                    type="text"
                                    placeholder="Department..."
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    className={inputClass}
                                /> */}
                                <select
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    className={selectClass}
                                >
                                    {departmentList?.map((specificDepartment) => (
                                        <option key={specificDepartment}>{specificDepartment}</option>
                                    ))}
                                </select>
                                {}
                            </div>

                            <div className={fieldClass}>
                                <label className={labelClass}>Course Code</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Math-211"
                                    value={courseCode}
                                    onChange={(e) => setCourseCode(e.target.value)}
                                    className={inputClass}
                                />
                            </div>

                            <div className={fieldClass}>
                                <label className={labelClass}>Professor Name</label>
                                <input
                                    type="text"
                                    value={professorName}
                                    placeholder="Professor name"
                                    onChange={(e) => setProfessorName(e.target.value)}
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div className="bg-white/4 border border-white/8 rounded-xl p-6 flex flex-col gap-6">
                            <p className="text-[10px] tracking-widest uppercase text-white/30 font-semibold border-b border-white/8 pb-3">
                                Your Rating
                            </p>

                            <GradeScaleSelector 
                                label="Grade (A-F)"
                                value={grade}
                                onChange={setGrade}
                                lowLabel="Excelled"
                                highLabel="Failed"
                            />

                            <ScaleSelector
                                label="Rating (1–5)"
                                value={rating}
                                onChange={setProfessorRating}
                                lowLabel="Terrible"
                                highLabel="Great"
                            />

                            <ScaleSelector
                                label="Difficulty (1–5)"
                                value={difficulty}
                                onChange={setDifficulty}
                                lowLabel="Very Easy"
                                highLabel="Very Hard"
                            />

                            <div className={fieldClass}>
                                <label className={labelClass}>Would Take Again</label>
                                <div className="flex gap-3">
                                    {["yes", "no"].map((val) => (
                                        <button
                                            key={val}
                                            type="button"
                                            onClick={() => setWouldTake(val)}
                                            className={`hover:cursor-pointer flex-1 py-2.5 rounded text-sm font-bold capitalize transition-all duration-150 border ${
                                                wouldTake === val
                                                    ? "bg-[#8B1A1A] border-[#8B1A1A] text-white shadow-lg shadow-[#8B1A1A]/20"
                                                    : "bg-white/5 border-white/10 text-white/40 hover:border-white/30 hover:text-white/70"
                                            }`}
                                        >
                                            {val === "yes" ? "Yes" : "No"}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className={fieldClass}>
                                <label className={labelClass}>Written Review</label>
                                <textarea
                                    placeholder="Write your review..."
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    rows={5}
                                    className={`${inputClass} resize-none`}
                                />
                            </div>
                        </div>


                        <button
                            type="submit"
                            className="hover: cursor-pointer w-full py-3 rounded text-sm font-bold text-white tracking-wide transition-all duration-150 hover:brightness-110 active:scale-[0.98]"
                            style={{ backgroundColor: "#8B1A1A" }}
                        >
                            Submit Review
                        </button>
                    </form>

                    <p className="text-center text-white/20 text-xs mt-8 tracking-widest uppercase" style={{ fontFamily: "monospace" }}>
                        AOC Student Portal
                    </p>
                </div>
            </div>
        ) : (
            <div
                className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 "
                style={{ backgroundColor: "rgb(28, 48, 89)" }}
            >
                <div className="fixed top-0 left-0 w-full h-1 bg-[#8B1A1A]" />
                <p className="text-white/60 text-sm">You need to be logged in to view this page.</p>
                <button
                    onClick={() => router.push(LOGIN_ROUTE)}
                    className="px-6 py-2.5 rounded text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95 hover:cursor-pointer"
                    style={{ backgroundColor: "#8B1A1A" }}
                >
                    Go to Login
                </button>
            </div>
        )
    )
}

export default Form;