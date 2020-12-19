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
    facultyId: string,
    nameFaculty: string,
    nameUniversity: string
}
export type LEVEL = {
    levelId: string,
    nameLevel: string
}
export type FIELD = {
    fieldId: string,
    fieldName: string
}

