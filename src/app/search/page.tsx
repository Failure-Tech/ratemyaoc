// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";
// import { auth, firestore } from "@/utils/firebase/firebaseConfig";
// import Select from "react-select";

// import rateMyProfessor from "@/app/search/rateMyProfessor";
// import { TeacherRatings } from "rate-my-professor-api-ts";
// import { onAuthStateChanged } from "firebase/auth";
// import { useRouter } from "next/navigation";
// import redis from "@/utils/redis/redisConfig";

// import { Professor } from "@/utils/types/types";

// const Search: React.FC = () => {
//     const [professorList, setProfessorList] = useState<Professor[]>([]);
//     const [selectedOption, setSelectedOption] = useState<{value: string, label: string} | null>(null);

//     // implement redis caching for rmp reviews on same prof
//     const [rmpReviews, setRmpReviews] = useState<TeacherRatings[]>();

//     const [fetchRating, setFetchRating] = useState<{id: string, data: DocumentData}[] | null>(null);
//     const db = firestore;

//     const collectionName = "data";

//     const [userEmailTeam, setUserEmailTeam] = useState<boolean>(false);
//     const router = useRouter();

//     // TODO: boutta be a hella inefficient algo but whtevr ill fix it later
    
//     useEffect(() => {
//         onAuthStateChanged(auth, (user) => {
//             if (user?.email === "99066493@my.hartdistrict.org") {
//                 setUserEmailTeam(true);
//             }
//         })

//         const setProfessors = async () => {
//             const cachedFaculty: Professor[] | null = await redis.get("faculty");
//             try {
//                 if (cachedFaculty) {
//                     setProfessorList(cachedFaculty);
//                 }
//                 else {
//                     console.log("sent request to api");

//                     const response = await fetch("http://localhost:8080/faculty");
//                     const result = response.json();

//                     await redis.set("faculty", result);
//                     setProfessorList(await result);
//                     console.log("prfoessor name" + professorList[0].professor);
//                 }
//             }
//             catch (error: unknown) {
//                 if (error instanceof Error) {
//                     console.log(error?.message);
//                 }
//                 else {
//                     console.log("Unexpected Error: \n", error);
//                 }
//             }            
//         }

//         const fetchDocument = async () => {
//                 try {
//                     if (selectedOption != null && userEmailTeam) {
//                         const profDocQuery = query(collection(db, collectionName), where("professorName", "==", selectedOption.label));
//                         const profDocs = await getDocs(profDocQuery);
//                         console.log(profDocs);

//                         if (!profDocs.empty) {
//                             const allData = profDocs.docs.map(doc => ({
//                                 id: doc.id,
//                                 data: doc.data()
//                             }))

//                             console.log("ALL DATA => ", allData);

//                             setFetchRating(allData);
//                         }
//                     }

//                     else {
//                         setFetchRating(null);
//                     }
                    
//                 } catch (error) {
//                     console.error("Error fetching document: ", error);
//                 }
//         }

//         const setRateMyProfReviews = async () => {
//             try {
//                 setRmpReviews(await rateMyProfessor(selectedOption?.label));
//             }
//             catch (error) {
//                 console.error("Error fetchign reviews: ", error);
//             }
//         }

//         const setAllData = async () => {
//             await setProfessors();
//             await fetchDocument();

//             if (selectedOption) {
//                 await setRateMyProfReviews();
//             }
//         }

//         setAllData();

//     }, [selectedOption, db]);
    
//     const new_professor_name_list = useMemo(
//         () => {
//             const result = [];
//             for (let i = 0; i < professorList.length; i++) {
//                 result.push({
//                     value: professorList[i].department,
//                     label: professorList[i].professor
//                 });
//             }      
            
//             return result;
//         },
//         [professorList]
//     );

//     // from professor, retrieve RMP + AOC ratemy from firestore

//     return (
//         (userEmailTeam) ? (
//         <>
//             <div className="mt-20 justify-center align-center">
//                 <p>Pick a professor...</p>
//                 <Select className="text-black" options={new_professor_name_list} onChange={setSelectedOption} defaultValue={selectedOption} />
//                 {/* from db, get metrics regarding professor (calculate averages, etc) 
//                 , reviews, etc with rmp tab and AOC tab, if no ratemy exists, redirect to login page if they want to make rating */}

//                     Generate Professor Ratings

//                     {
//                         (selectedOption!==null) ? (
//                             <>
//                                 <>
//                                     {(fetchRating && fetchRating.length > 0) ? (
//                                             fetchRating.map((doc) => (
//                                                 <div key={doc.id}>
//                                                     <p>Review from {doc.data.name}</p>
//                                                     <p>Rating: {doc.data.rating}</p>
//                                                     <p>Review: {doc.data.review}</p>
//                                                 </div>
//                                             ))
//                                     ) : (
//                                         <>
//                                             <p>No ratemyaoc reviews for this professor</p>
//                                         </>
//                                     )}
//                                 </>
//                             </>
//                         ) : (
//                             <>
//                             </>
//                         )
//                     }

//                     {
//                         (rmpReviews !== null) ? (
//                             <>
//                                 <div>
//                                     <p>RMP REVIEW</p>
//                                     {
//                                         <p>{rmpReviews?.[1]?.comment}</p>
//                                     }
//                                 </div>
//                             </>
//                         ) : (
//                             <></>
//                         )
//                     }
//             </div>
//         </>
//         ) : 
//         (
//             <>
//                 <div>
//                     <p>Page currently under construction</p>
//                     <p>Please revisit some other time</p>
//                     <button className="hover:cursor-pointer bg-amber-600" onClick={() => router.push("/")} >Navigate back to home page</button>
//                 </div>
//             </>
//         )
//     )
// }

// export default Search;

"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";
import { auth, firestore } from "@/utils/firebase/firebaseConfig";
import rateMyProfessor from "@/app/search/rateMyProfessor";
import { TeacherRatings } from "rate-my-professor-api-ts";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import redis from "@/utils/redis/redisConfig";
import { Professor } from "@/utils/types/types";

const REVIEWS_PER_PAGE = 5;

const StatCard = ({ label, value, sub }: { label: string; value: string | number; sub?: string }) => (
    <div className="flex-1 bg-white/4 border border-white/8 rounded-xl px-5 py-4 flex flex-col gap-1 min-w-25">
        <span className="text-[10px] tracking-widest uppercase text-white/30 font-semibold">{label}</span>
        <span className="text-2xl font-black text-white" style={{ fontFamily: "'Georgia', serif" }}>{value}</span>
        {sub && <span className="text-[11px] text-white/30">{sub}</span>}
    </div>
);

const ProfessorSearch = ({
    professorList,
    selectedProfessor,
    onSelect,
}: {
    professorList: Professor[];
    selectedProfessor: string;
    onSelect: (professor: string) => void;
}) => {
    const [query, setQuery] = useState<string>(selectedProfessor ?? "");
    const [open, setOpen] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);

    const filtered = query.trim().length === 0
        ? professorList
        : professorList.filter((f) =>
            f.professor.toLowerCase().includes(query.toLowerCase()) ||
            f.department.toLowerCase().includes(query.toLowerCase())
        );

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (f: Professor) => {
        setQuery(f.professor);
        onSelect(f.professor);
        setOpen(false);
    };

    return (
        <div className="relative w-full" ref={ref}>
            <input
                type="text"
                placeholder="Search by professor name or department..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
                onFocus={() => setOpen(true)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-white/30 transition-all duration-150"
            />
            {open && filtered.length > 0 && (
                <div
                    className="absolute top-full mt-1 left-0 right-0 z-50 max-h-60 overflow-y-auto rounded-lg border border-white/10 shadow-2xl"
                    style={{ backgroundColor: "rgb(22, 38, 72)" }}
                >
                    {filtered.slice(0, 40).map((f, i) => (
                        <div
                            key={i}
                            onMouseDown={() => handleSelect(f)}
                            className="flex flex-col px-4 py-2.5 cursor-pointer hover:bg-white/6 transition-all duration-100 border-b border-white/5 last:border-b-0"
                        >
                            <span className="text-sm text-white font-medium">{f.professor}</span>
                            <span className="text-[11px] text-white/35">{f.department}</span>
                        </div>
                    ))}
                </div>
            )}
            {open && filtered.length === 0 && query.trim().length > 0 && (
                <div
                    className="absolute top-full mt-1 left-0 right-0 z-50 rounded-lg border border-white/10 px-4 py-3"
                    style={{ backgroundColor: "rgb(22, 38, 72)" }}
                >
                    <span className="text-xs text-white/30">No professors found</span>
                </div>
            )}
        </div>
    );
};

const AOCReviewCard = ({ doc }: { doc: { id: string; data: DocumentData } }) => (
    <div className="bg-white/4 border border-white/8 rounded-xl p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex flex-col gap-0.5">
                <span className="text-sm font-bold text-white">{doc.data.name || "Anonymous"}</span>
                <span className="text-[11px] text-white/30">{doc.data.classYear || ""} · {doc.data.courseCode || ""}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-[#1c3059] border border-white/10 text-white/60">
                    AOC
                </span>
                {doc.data.grade && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/8 text-white/50 border border-white/10">
                        Grade: {doc.data.grade}
                    </span>
                )}
                {doc.data.wouldTake && (
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${doc.data.wouldTake === "yes" ? "bg-green-900/30 border-green-700/30 text-green-400" : "bg-red-900/30 border-red-700/30 text-red-400"}`}>
                        {doc.data.wouldTake === "yes" ? "Would take again" : "Would not take again"}
                    </span>
                )}
            </div>
        </div>
        <div className="flex gap-4">
            {doc.data.rating > 0 && (
                <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest">Rating</span>
                    <span className="text-lg font-black text-white">{doc.data.rating}<span className="text-white/30 text-sm font-normal">/5</span></span>
                </div>
            )}
            {doc.data.difficulty > 0 && (
                <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest">Difficulty</span>
                    <span className="text-lg font-black text-white">{doc.data.difficulty}<span className="text-white/30 text-sm font-normal">/5</span></span>
                </div>
            )}
        </div>
        {doc.data.review && (
            <p className="text-sm text-white/55 leading-relaxed border-t border-white/6 pt-3">
                {doc.data.review}
            </p>
        )}
    </div>
);

const RMPReviewCard = ({ review }: { review: TeacherRatings }) => (
    <div className="bg-white/3 border border-white/6 rounded-xl p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex flex-col gap-0.5">
                <span className="text-sm font-bold text-white/70">RateMyProfessors Review</span>
                <span className="text-[11px] text-white/25">{(review as any).class || ""}</span>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase border border-[#8B1A1A]/40 text-[#8B1A1A] bg-[#8B1A1A]/10">
                RMP
            </span>
        </div>
        <div className="flex gap-4">
            {(review as any).rating !== undefined && (
                <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest">Rating</span>
                    <span className="text-lg font-black text-white/70">{(review as any).rating}<span className="text-white/25 text-sm font-normal">/5</span></span>
                </div>
            )}
            {(review as any).difficulty !== undefined && (
                <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest">Difficulty</span>
                    <span className="text-lg font-black text-white/70">{(review as any).difficulty}<span className="text-white/25 text-sm font-normal">/5</span></span>
                </div>
            )}
        </div>
        {review.comment && (
            <p className="text-sm text-white/40 leading-relaxed border-t border-white/6 pt-3">
                {review.comment}
            </p>
        )}
    </div>
);

const Search: React.FC = () => {
    const [professorList, setProfessorList] = useState<Professor[]>([]);
    const [selectedOption, setSelectedOption] = useState<{value: string, label: string} | null>(null);

    // implement redis caching for rmp reviews on same prof
    const [rmpReviews, setRmpReviews] = useState<TeacherRatings[]>();

    const [fetchRating, setFetchRating] = useState<{id: string, data: DocumentData}[] | null>(null);
    const db = firestore;

    const collectionName = "data";

    const [userEmailTeam, setUserEmailTeam] = useState<boolean>(false);
    const router = useRouter();

    const [visibleAOC, setVisibleAOC] = useState<number>(REVIEWS_PER_PAGE);
    const [visibleRMP, setVisibleRMP] = useState<number>(REVIEWS_PER_PAGE);

    // TODO: boutta be a hella inefficient algo but whtevr ill fix it later
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user?.email === "99066493@my.hartdistrict.org") {
                setUserEmailTeam(true);
            }
        })

        const setProfessors = async () => {
            const cachedFaculty: Professor[] | null = await redis.get("faculty");
            try {
                if (cachedFaculty) {
                    setProfessorList(cachedFaculty);
                }
                else {
                    console.log("sent request to api");

                    const response = await fetch("http://localhost:8080/faculty");
                    const result = response.json();

                    await redis.set("faculty", result);
                    setProfessorList(await result);
                    console.log("prfoessor name" + professorList[0].professor);
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
                    if (selectedOption != null && userEmailTeam) {
                        const profDocQuery = query(collection(db, collectionName), where("professorName", "==", selectedOption.label));
                        const profDocs = await getDocs(profDocQuery);
                        console.log(profDocs);

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

    const stats = useMemo(() => {
        const aocRatings = (fetchRating ?? []).map(d => d.data.rating).filter(r => r > 0);
        const rmpRatings = (rmpReviews ?? []).map(r => (r as any).rating).filter((r): r is number => typeof r === "number");
        const allRatings = [...aocRatings, ...rmpRatings];

        const aocDiff = (fetchRating ?? []).map(d => d.data.difficulty).filter(r => r > 0);
        const rmpDiff = (rmpReviews ?? []).map(r => (r as any).difficulty).filter((r): r is number => typeof r === "number");
        const allDiff = [...aocDiff, ...rmpDiff];

        const wouldTakeCount = (fetchRating ?? []).filter(d => d.data.wouldTake === "yes").length;
        const totalWithWouldTake = (fetchRating ?? []).filter(d => d.data.wouldTake).length;

        return {
            avgRating: allRatings.length > 0 ? (allRatings.reduce((a, b) => a + b, 0) / allRatings.length).toFixed(1) : "—",
            avgDifficulty: allDiff.length > 0 ? (allDiff.reduce((a, b) => a + b, 0) / allDiff.length).toFixed(1) : "—",
            wouldTakePercent: totalWithWouldTake > 0 ? `${Math.round((wouldTakeCount / totalWithWouldTake) * 100)}%` : "—",
            totalReviews: (fetchRating?.length ?? 0) + (rmpReviews?.length ?? 0),
        };
    }, [fetchRating, rmpReviews]);

    const professorSelected = selectedOption !== null;

    return (
        userEmailTeam ? (
            <div
                className="min-h-screen px-4 py-12 flex flex-col items-center"
                style={{ backgroundColor: "rgb(28, 48, 89)" }}
            >
                <div className="fixed top-0 left-0 w-full h-1 bg-[#8B1A1A]" />

                <div className="w-full max-w-2xl flex flex-col gap-8">

                    {/* Header */}
                    <div className="text-center flex flex-col items-center gap-3">
                        <p className="text-[10px] tracking-[0.3em] uppercase text-[#8B1A1A] font-semibold">
                            AOC Student Portal
                        </p>
                        <h1
                            className="text-3xl font-black text-white"
                            style={{ fontFamily: "'Georgia', serif" }}
                        >
                            Professor Search
                        </h1>
                        <div className="flex items-center gap-3">
                            <div className="h-px w-10 bg-[#8B1A1A]" />
                            <div className="w-1.5 h-1.5 rounded-full bg-[#8B1A1A]" />
                            <div className="h-px w-10 bg-[#8B1A1A]" />
                        </div>
                        <p className="text-white/40 text-xs">
                            Search a professor to view ratings from AOC students and RateMyProfessors.
                        </p>
                    </div>

                    {/* Search */}
                    <ProfessorSearch
                        professorList={professorList}
                        selectedProfessor={selectedOption?.label ?? ""}
                        onSelect={(professor) => {
                            const match = new_professor_name_list.find(p => p.label === professor);
                            setSelectedOption(match ?? null);
                            setVisibleAOC(REVIEWS_PER_PAGE);
                            setVisibleRMP(REVIEWS_PER_PAGE);
                        }}
                    />

                    {/* Stats + Rate CTA */}
                    {professorSelected && (
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-wrap gap-3">
                                <StatCard label="Overall Rating" value={stats.avgRating} sub="combined avg" />
                                <StatCard label="Difficulty" value={stats.avgDifficulty} sub="combined avg" />
                                <StatCard label="Would Take Again" value={stats.wouldTakePercent} sub="AOC students" />
                                <StatCard label="Total Reviews" value={stats.totalReviews} sub="AOC + RMP" />
                            </div>

                            <button
                                onClick={() => router.push("/rate")}
                                className="w-full py-2.5 rounded text-sm font-bold text-white transition-all duration-150 hover:brightness-110 active:scale-[0.98] hover:cursor-pointer"
                                style={{ backgroundColor: "#8B1A1A" }}
                            >
                                Rate {selectedOption?.label} →
                            </button>
                        </div>
                    )}

                    {/* Reviews */}
                    {professorSelected && (
                        <div className="flex flex-col gap-6">

                            {/* AOC Reviews */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <p className="text-[10px] tracking-widest uppercase text-white/30 font-semibold">
                                        AOC Student Reviews
                                    </p>
                                    {fetchRating && fetchRating.length > 0 && (
                                        <span className="text-[10px] text-white/20">({fetchRating.length})</span>
                                    )}
                                    <div className="flex-1 h-px bg-white/8" />
                                </div>

                                {fetchRating && fetchRating.length > 0 ? (
                                    <>
                                        {fetchRating.slice(0, visibleAOC).map((doc) => (
                                            <AOCReviewCard key={doc.id} doc={doc} />
                                        ))}
                                        {visibleAOC < fetchRating.length && (
                                            <button
                                                onClick={() => setVisibleAOC(v => v + REVIEWS_PER_PAGE)}
                                                className="w-full py-2.5 rounded text-xs font-semibold text-white/50 border border-white/10 hover:border-white/25 hover:text-white/70 transition-all duration-150 hover:cursor-pointer"
                                            >
                                                Load more AOC reviews ({fetchRating.length - visibleAOC} remaining)
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <div className="bg-white/2 border border-white/6 rounded-xl px-5 py-6 text-center">
                                        <p className="text-white/30 text-sm">No AOC reviews yet for this professor.</p>
                                        <button
                                            onClick={() => router.push("/rate")}
                                            className="mt-3 text-[#8B1A1A] text-xs font-semibold hover:underline hover:cursor-pointer"
                                        >
                                            Be the first to leave a review →
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* RMP Reviews */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <p className="text-[10px] tracking-widest uppercase text-white/30 font-semibold">
                                        RateMyProfessors
                                    </p>
                                    {rmpReviews && rmpReviews.length > 0 && (
                                        <span className="text-[10px] text-white/20">({rmpReviews.length})</span>
                                    )}
                                    <div className="flex-1 h-px bg-white/8" />
                                </div>

                                {rmpReviews && rmpReviews.length > 0 ? (
                                    <>
                                        {rmpReviews.slice(0, visibleRMP).map((review, i) => (
                                            <RMPReviewCard key={i} review={review} />
                                        ))}
                                        {visibleRMP < rmpReviews.length && (
                                            <button
                                                onClick={() => setVisibleRMP(v => v + REVIEWS_PER_PAGE)}
                                                className="w-full py-2.5 rounded text-xs font-semibold text-white/50 border border-white/10 hover:border-white/25 hover:text-white/70 transition-all duration-150 hover:cursor-pointer"
                                            >
                                                Load more RMP reviews ({rmpReviews.length - visibleRMP} remaining)
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <div className="bg-white/2 border border-white/6 rounded-xl px-5 py-6 text-center">
                                        <p className="text-white/30 text-sm">No RateMyProfessors reviews found.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {!professorSelected && (
                        <div className="bg-white/2 border border-white/6 rounded-xl px-5 py-10 text-center">
                            <p className="text-white/25 text-sm">Search for a professor above to see ratings and reviews.</p>
                        </div>
                    )}

                    <p
                        className="text-center text-white/20 text-xs tracking-widest uppercase"
                        style={{ fontFamily: "monospace" }}
                    >
                        AOC Student Portal
                    </p>
                </div>
            </div>
        ) : (
            <div
                className="min-h-screen flex flex-col items-center justify-center gap-4 px-6"
                style={{ backgroundColor: "rgb(28, 48, 89)" }}
            >
                <div className="fixed top-0 left-0 w-full h-1 bg-[#8B1A1A]" />
                <div className="text-center flex flex-col items-center gap-3">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#8B1A1A] font-semibold">AOC Student Portal</p>
                    <h1 className="text-2xl font-black text-white" style={{ fontFamily: "'Georgia', serif" }}>
                        Under Construction
                    </h1>
                    <p className="text-white/40 text-sm">This page is not yet available. Please check back later.</p>
                </div>
                <button
                    className="hover:cursor-pointer px-6 py-2.5 rounded text-sm font-semibold text-white transition-all hover:brightness-110 active:scale-95"
                    style={{ backgroundColor: "#8B1A1A" }}
                    onClick={() => router.push("/")}
                >
                    Back to Home
                </button>
            </div>
        )
    );
};

export default Search;