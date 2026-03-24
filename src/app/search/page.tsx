"use client";

import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { firestore } from "@/utils/firebase/firebaseConfig";
import Select from "react-select";
interface Professor {
    department: string,
    professor_name: string,
    email: string
}

const Search: React.FC = () => {
    const [professorList, setProfessorList] = useState<Professor[]>([]);
    const [selectedOption, setSelectedOption] = useState<{value: string, label: string} | null>(null);

    const [fetchRating, setFetchRating] = useState<{id: string, data: DocumentData} | null>(null);
    const db = firestore;
    const collectionName = "wrd";
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
                    }
                ])
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            catch(error: any) {
                console.log(error?.message);
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

            // need to do in async way for async methods
            const setAllData = async () => {
                await setProfessors();
                await fetchDocument();
            }

            setAllData();

    }, [db]);

    
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
            <Image 
                src="/aoc_assets/search_bg.jpg"
                alt="search page background"
                width={500}
                height={500}
            />
            <div>
                <p>Pick a professor...</p>
                <Select className="text-black" options={new_professor_name_list} onChange={setSelectedOption} defaultValue={selectedOption} />
                {/* from db, get metrics regarding professor, reviews, etc with rmp tab and AOC tab, if no ratemy exists, redirect to login page if they want to make rating */}

                    Generate Professor Ratings

                    {
                        (selectedOption!==null) ? (
                            <>
                                <p>{fetchRating?.id}</p>
                                {console.log(fetchRating)}
                            </>
                        ) : (
                            <div>
                                <p>tu madre</p>
                            </div>
                        )
                    }
                    
            </div>
        </>
    )
}

export default Search;