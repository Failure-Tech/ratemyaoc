"use client";

import React, { useEffect, useMemo, useState } from "react";
import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import { auth, firestore } from "@/utils/firebase/firebaseConfig";
import Select from "react-select";

import rateMyProfessor from "@/app/search/rateMyProfessor";
import { TeacherRatings } from "rate-my-professor-api-ts";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import redis from "@/utils/redis/redisConfig";

interface Professor {
    department: string,
    office: string,
    professor: string,
    title: string,
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

    const [userEmailTeam, setUserEmailTeam] = useState<boolean>(false);
    const router = useRouter();

    // need to make it so that we can index/search through documentIds for specific prof name given
    // TODO: boutta be a hella inefficient algo but whtevr ill fix it later
    // const documentId = "wrd";
    
    // { collectionName, documentId}: {collectionName: string, documentId: string}

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user?.email === "99066493@my.hartdistrict.org") {
                setUserEmailTeam(true);
            }
        })

        /*
        setProfessorList([
                    // {
                    //     department: "type shit",
                    //     professor_name: "shit",
                    //     email: "type"
                    // },
                    // {
                    //     department: "yippe",
                    //     professor_name: "wrd",
                    //     email: "hehe"
                    // },
                    {
                        department: "history",
                        professor_name: "Brent Riffel",
                    },
                    {
                        department: "mathematics",
                        professor_name: "Kelly Aceves",
                    }
                ])
        */

        const setProfessors = async () => {
            const cachedFaculty: Professor[] | null = await redis.get("faculty");
            try {
                if (cachedFaculty) {
                    setProfessorList(cachedFaculty);
                    console.log("Used cached value");
                }
                else {
                    const response = await fetch("http://localhost:8080/faculty");
                    const result = response.json()

                    await redis.set("faculty", result);
                    setProfessorList(await result);
                    console.log("prfoessor name" + professorList[0].professor);

                    console.log("sent request to api")
                }
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
                    label: professorList[i].professor
                });
            }      
            
            return result;
        },
        [professorList]
    );

    // from professor, retrieve RMP + AOC ratemy from firestore
    //
    return (
        (userEmailTeam) ? (
        <>
            <div className="mt-20 justify-center align-center">
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
                                {/* <p>tu madre</p> */}
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
        ) : 
        (
            <>
                <div>
                    <p>Page currently under construction</p>
                    <p>Please revisit some other time</p>
                    <button className="hover:cursor-pointer bg-amber-600" onClick={() => router.push("/")} >Navigate back to home page</button>
                </div>
            </>
        )
    )
}

export default Search;