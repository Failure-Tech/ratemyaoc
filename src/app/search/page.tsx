"use client";

import React, { useEffect, useMemo, useState } from "react";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { firestore } from "@/utils/firebase/firebaseConfig";
import Select from "react-select";

import rateMyProfessor from "@/app/search/rateMyProfessor";
import { TeacherRatings } from "rate-my-professor-api-ts";

interface Professor {
    department: string,
    professor_name: string,
    email: string
}

// interface RateMyProfessorReview {
//     class: string,
//     comment: string,
//     difficulty_rating: number,
//     teacher_id: string,
//     clarity_rating: number,
//     student_grade: string,
//     is_for_credit: boolean,
//     attendance_status: string,
//     is_online: boolean,
//     comments_like: number,
//     comments_dislikes: number,
//     rating_tags: string,
//     textbook_use: number,
//     would_take_again: boolean
// }

const Search: React.FC = () => {
    const [professorList, setProfessorList] = useState<Professor[]>([]);
    const [selectedOption, setSelectedOption] = useState<{value: string, label: string} | null>(null);

    // implement redis caching for rmp reviews on same prof
    const [rmpReviews, setRmpReviews] = useState<TeacherRatings[]>();

    const [fetchRating, setFetchRating] = useState<{id: string, data: DocumentData} | null>(null);
    const db = firestore;
    const collectionName = "data";
    const documentId = "wrd";


    // { collectionName, documentId}: {collectionName: string, documentId: string}

    useEffect(() => {
        const setProfessors = async () => {
            try {
                setProfessorList([
                    {
                        department: "type shit",
                        professor_name: "shit",
                        email: "type"
                    },
                    {
                        department: "yippe",
                        professor_name: "wrd",
                        email: "hehe"
                    },
                    {
                        department: "mathematics",
                        professor_name: "Brent Riffel",
                        email: "shi"
                    }
                ])
            }
            catch (error: unknown) {
                if (error instanceof Error) {
                    console.log(error?.message);
                }
                else {
                    console.log("Unexpected Error: \n", error);
                }
            }            
        }

        const fetchDocument = async () => {
                try {
                    const docRef = doc(db, collectionName, documentId);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        console.log("name CHECK: ", docSnap.data());
                        setFetchRating({id: docSnap.id, data: docSnap.data()});
                    }
                    else {
                        setFetchRating(null);
                    }
                } catch (error) {
                    console.error("Error fetching document: ", error);
                }
        }

        const setRateMyProfReviews = async () => {
            try {
                await setRmpReviews(await rateMyProfessor(selectedOption?.label));
            }
            catch (error) {
                console.error("Error fetchign reviews: ", error);
            }
        }

        // need to do in async way for async methods
        const setAllData = async () => {
            await setProfessors();
            await fetchDocument();

            if (selectedOption) {
                await setRateMyProfReviews();
            }
        }

        // if (selectedOption) {
        // }

        setAllData();

        // remove selectedOption?.value
    }, [selectedOption, db]);

    
    const new_professor_name_list = useMemo(
        () => {
            const result = [];
            for (let i = 0; i < professorList.length; i++) {
                console.log("department: ", professorList[i].department)
                result.push({
                    value: professorList[i].department,
                    label: professorList[i].professor_name
                });
            }      
            
            return result;
        },
        [professorList]
    );

    // const professor_name_list = useMemo(() => 
    //     professorList.map(prof => ({
    //         value: prof.department,
    //         label: prof.professor_name
    //     })), [professorList]);   
    /*
    interface object with department, professor
    useEffect(() => {
        axios.get("")
        .then(response => {
            setProfessorList(() => (
                // ...prev,
                response.data
            ))
        })
        .catch(error => {
            console.error(error);
            alert(error.message);
        })
    }, []);
    */

    // from professor, retrieve RMP + AOC ratemy from firestore

    return (
        <>
            <div>
                <p>Pick a professor...</p>
                <Select className="text-black" options={new_professor_name_list} onChange={setSelectedOption} defaultValue={selectedOption} />
                {/* from db, get metrics regarding professor (calculate averages, etc) 
                , reviews, etc with rmp tab and AOC tab, if no ratemy exists, redirect to login page if they want to make rating */}

                    Generate Professor Ratings

                    {
                        (selectedOption!==null) ? (
                            <>
                                {/* run an average on it \\ save in db */}
                                <p>Review from {fetchRating?.data.aoc.reviews.name}</p>
                                <p>Rating: {fetchRating?.data.aoc.rating}</p>
                                <p>Review: {fetchRating?.data.aoc.reviews.message}</p>
                                {/* {console.log(fetchRating)} */}
                            </>
                        ) : (
                            <div>
                                <p>tu madre</p>
                            </div>
                        )
                    }

                    {
                        (rmpReviews !== null) ? (
                            <>
                                <div>
                                    {
                                        <p>Review from {rmpReviews?.[1]?.comment}</p>
                                    }
                                </div>
                            </>
                        ) : (
                            <></>
                        )
                    }
            </div>
        </>
    )
}

export default Search;