import Image from "next/image";
import React from "react";

const contributors = [
    {
        name: "Gautham Korrapati",
        role: "Website Developer / 2027",
        profile_picture: "/team/gk_pfp.png",
        bio: "I'm Gautham, and I'm a current junior here at AOC. I like going to the gym, playing basketball, and doing other physical activities. I'm planning to pursue an engineering degree at a 4-year university, and am currently taking the Math + Physics route at COC.",
    },
    {
        name: "Ishan Vaish",
        role: "Marketer / 2027",
        profile_picture: "/team/ishan_pfp.jpg",
        bio: "My name is Ishan Vaish, and I am a Junior at AOC while also being dual-enrolled at COC. Wanting to pursue engineering at a 4-year university, I have been primarily taking math and physics professors and COC and have joined many extracurriculars relating to engineering. Outside of school, I love playing violin, taking long walks, and listening to music!",
    },
    {
        name: "Avantika Jangeesh",
        role: "Marketer / 2027",
        profile_picture: "/team/avantika.jpeg",
        bio: "Hello, I am Avantika Jangeesh, a current Junior at the Academy of the Canyons and a dual enrollment student at College of the Canyons. I love computer science and math, and using them to help solve problems in our community. Outside of academics, I also enjoy art and reading!",
    },
];

const About: React.FC = () => {
    return (
        <div
            className="min-h-screen px-4 py-12 flex flex-col items-center"
            style={{ backgroundColor: "rgb(28, 48, 89)" }}
        >
            <div className="fixed top-0 left-0 w-full h-1 bg-[#8B1A1A]" />

            <div className="w-full max-w-2xl flex flex-col gap-14">

                {/* Hero */}
                <div className="text-center flex flex-col items-center gap-4">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#8B1A1A] font-semibold">
                        AOC Student Portal
                    </p>
                    <h1
                        className="text-4xl font-black text-white leading-tight"
                        style={{ fontFamily: "'Georgia', serif" }}
                    >
                        About RateMyAOC
                    </h1>
                    <div className="flex items-center gap-3">
                        <div className="h-px w-12 bg-[#8B1A1A]" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#8B1A1A]" />
                        <div className="h-px w-12 bg-[#8B1A1A]" />
                    </div>
                    <p className="text-white/55 text-sm leading-relaxed max-w-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                        deserunt mollit anim id est laborum
                    </p>
                </div>

                {/* Why we built this */}
                <div className="bg-white/4 border border-white/8 rounded-xl p-7 flex flex-col gap-4">
                    <p className="text-[10px] tracking-widest uppercase text-white/30 font-semibold border-b border-white/8 pb-3">
                        Why We Built This
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                        deserunt mollit anim id est laborum
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad 
                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                        in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
                        deserunt mollit anim id est laborum
                    </p>
                </div>

                {/* Features */}
                <div className="flex flex-col gap-4">
                    <p className="text-[10px] tracking-widest uppercase text-white/30 font-semibold">
                        What&apos;s Inside
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                            { title: "Professor Ratings", desc: "Real reviews from AOC students with rating, difficulty, and written feedback." },
                            { title: "Course Search", desc: "Browse and search courses across departments quickly." },
                            { title: "Would Take Again", desc: "A simple signal to know if a professor is worth your time." },
                            { title: "Schedule Helper", desc: "Mess around with course scheduling without the usual headache." },
                        ].map((f) => (
                            <div
                                key={f.title}
                                className="bg-white/4 border border-white/8 rounded-lg p-5 flex flex-col gap-1.5"
                            >
                                <div className="flex items-center gap-2">
                                    <div className="w-1 h-4 rounded-full bg-[#8B1A1A]" />
                                    <span className="text-white text-sm font-semibold">{f.title}</span>
                                </div>
                                <p className="text-white/45 text-xs leading-relaxed pl-3">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contributors */}
                <div className="flex flex-col gap-5">
                    <p className="text-[10px] tracking-widest uppercase text-white/30 font-semibold">
                        The Team
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {contributors.map((person, i) => (
                            <div
                                key={i}
                                className="bg-white/4 border border-white/8 rounded-xl p-5 flex flex-col items-center text-center gap-3"
                            >
                                {/* Avatar placeholder */}
                                <div className="w-20 h-20 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/20 text-xs tracking-wide">
                                    <Image
                                        src={person.profile_picture}
                                        alt="lksdjfldskf"
                                        className="w-20 h-20 rounded-full bg-white/8 border border-white/10 flex items-center justify-center text-white/20 text-xs tracking-wide"
                                        width={134}
                                        height={100}
                                    />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                    <span className="text-white text-sm font-bold">{person.name}</span>
                                    <span className="text-[#8B1A1A] text-[11px] font-semibold tracking-wide">{person.role}</span>
                                </div>
                                <p className="text-white/40 text-xs leading-relaxed">{person.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer note */}
                <div className="text-center flex flex-col items-center gap-3 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="h-px w-10 bg-white/10" />
                        <div className="w-1 h-1 rounded-full bg-white/10" />
                        <div className="h-px w-10 bg-white/10" />
                    </div>
                    <p className="text-white/20 text-xs tracking-widest uppercase" style={{ fontFamily: "monospace" }}>
                        AOC Student Portal
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;