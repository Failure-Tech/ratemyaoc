"use server";

import { RateMyProfessor } from "rate-my-professor-api-ts";

const rateMyProfessor = async (professor: string | undefined) => {
    const rmp_instance = new RateMyProfessor("College of the Canyons");
    // const list_of_professors = await rmp_instance.get_professor_list();
    if (professor) {
        rmp_instance.set_professor_name(professor);
    }
    const specific_prof = await rmp_instance.get_comments_by_professor();
    // console.log(specific_prof);

    return specific_prof;
}

export default rateMyProfessor;