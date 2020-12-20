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

export type LECTURES = {
    lecturerId: number,
    dob: any,
    fullName: string,
    major: string,
    email: string,
    phone: string,
    contract: string,
    faculty: string,
    position: string
}

export type CONTRACT = {
    contractId: number,
    nameContract: string
}

export type NameLecturer = {
    lecturerId: number,
    username: string,
}

export type MYTOPIC = {
    nameTopic: string,
    description: string,
    facultyName: string,
    levelName: string,
    fieldTopic: string,
    status: string
}

export type LECTURER_DETAIL = {
    fullName: string,
    position: string,
    primary: boolean
}