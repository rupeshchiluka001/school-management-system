import { CourseLink } from "./course-link";

export interface Course {
    name: string,
    professor: string,
    description: string,
    links: CourseLink[],
    _id: string
}
