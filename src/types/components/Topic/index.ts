export type TOPIC = {
    nameTopic: string,
    faculty: FACULTY,
    nameFaculty:string,
    level: LEVEL,
    nameLevel: string,
    fieldTopic:FIELD,
    fieldName: string,
    updatedAt: Date,
    updatedBy: string,
    year: number,
    status: string
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
    position: string,
    degree: string
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
    status: string,
    year: number,
}

export type LECTURER_DETAIL = {
    fullName: string,
    position: string,
    primary: boolean
}

export type DETAIL_FACULTY = {
    key: number,
    teamId: number,
    completed: string,
    current: number,
    dateApproved: string,
    dateExpired: string,
    dateExtend: string,
    facultyReview: string,
    finish: boolean,
    start: string,
    status: string,
    team: TEAM[],
}

export type TEAM = {
    fullName: string,
    position: string,
    primary: boolean
}