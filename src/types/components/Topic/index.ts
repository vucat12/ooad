export type TOPIC = {
    nameTopic: string,
    faculty: FACULTY,
    nameFaculty:string,
    level: LEVEL,
    nameLevel: string,
    fieldTopic:FIELD,
    fieldName: string,
    updatedAt: Date,
    updatedBy: string
  }
  
export type FACULTY = {
    id: string,
    nameFaculty: string,
    nameUniversity: string
}
export type LEVEL = {
    id: string,
    nameLevel: string
}
export type FIELD = {
    id: string,
    fieldName: string
}