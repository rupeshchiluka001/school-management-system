import { Course } from "./course";

export interface CourseQuery {
    courses: Course[],
    current: number,
    pages: number,
    filter: string,
    value: string,
}
