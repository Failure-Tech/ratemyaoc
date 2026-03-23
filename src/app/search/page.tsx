"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

interface Professor {
    department: string,
    professor_name: string,
    email: string
}

// interface DropdownSelectOptions {
//     department: string,
//     professor_name: string
// }

const Search: React.FC = () => {
    const [professorList, setProfessorList] = useState<Professor[]>([
        // {
        // department: "type",
        // professor_name: "shit",
        // email: "neheh"
        // }
    ]);
    const [selectedOption, setSelectedOption] = useState<{value: string, label: string} | null>(null);
    const professor_name_list = [];

    useEffect(() => {
        const setProfessors = async () => {
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

            return null;
        }
        setProfessors();
        // alert(professorList);
    }, []);

    for (let i = 0; i < professorList.length; i++) {
        professor_name_list.push({
            value: professorList[i].department,
            label: professorList[i].professor_name
        });
    }
    

    // console.log("PROFESSOR LIST: " + professorList[0]);

    // interface object with department, professor
    // useEffect(() => {
    //     axios.get("")
    //     .then(response => {
    //         setProfessorList(() => (
    //             // ...prev,
    //             response.data
    //         ))
    //     })
    //     .catch(error => {
    //         console.error(error);
    //         alert(error.message);
    //     })
    // }, []);

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
                <Select className="text-black" options={professor_name_list} onChange={setSelectedOption} defaultValue={selectedOption} />
                {/* from api, get metrics regarding professor, reviews, etc */}
            </div>            
        </>
    )
}

export default Search;