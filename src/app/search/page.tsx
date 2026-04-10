"use client";

import React, { useEffect, useMemo, useState } from "react";
import { collection, doc, DocumentData, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { firestore } from "@/utils/firebase/firebaseConfig";
import Select from "react-select";

import rateMyProfessor from "@/app/search/rateMyProfessor";
import { TeacherRatings } from "rate-my-professor-api-ts";

interface Professor {
    department: string,
    professor_name: string,
    email: string
}

const Search: React.FC = () => {
    const [professorList, setProfessorList] = useState<Professor[]>([]);
    const [selectedOption, setSelectedOption] = useState<{value: string, label: string} | null>(null);

    // implement redis caching for rmp reviews on same prof
    const [rmpReviews, setRmpReviews] = useState<TeacherRatings[]>();

    const [fetchRating, setFetchRating] = useState<{id: string, data: DocumentData}[] | null>(null);
    const db = firestore;
    // wrd
    const collectionName = "data";

    // need to make it so that we can index/search through documentIds for specific prof name given
    // TODO: boutta be a hella inefficient algo but whtevr ill fix it later
    // const documentId = "wrd";
    
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
                    },
                    {
                        department: "mathematics",
                        professor_name: "Kelly Aceves",
                        email: ""
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
                    if (selectedOption != null) {
                        const profDocQuery = query(collection(db, collectionName), where("professorName", "==", selectedOption.label));
                        const profDocs = await getDocs(profDocQuery);

                        if (!profDocs.empty) {
                            const allData = profDocs.docs.map(doc => ({
                                id: doc.id,
                                data: doc.data()
                            }))

                            console.log("ALL DATA => ", allData);

                            setFetchRating(allData);
                        }
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
                setRmpReviews(await rateMyProfessor(selectedOption?.label));
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

        setAllData();

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
                                <>
                                    {(fetchRating && fetchRating.length > 0) ? (
                                            fetchRating.map((doc) => (
                                                <div key={doc.id}>
                                                    <p>Review from {doc.data.name}</p>
                                                    <p>Rating: {doc.data.rating}</p>
                                                    <p>Review: {doc.data.review}</p>
                                                </div>
                                            ))
                                    ) : (
                                        <>
                                            <p>No ratemyaoc reviews for this professor</p>
                                        </>
                                    )}
                                </>
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
                                        <p>RMP REVIEW from {rmpReviews?.[1]?.comment}</p>
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