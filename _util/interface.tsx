
export interface userInterface {
    username: string | null | undefined,
    email?: string,
    joinedDate: Date,
    posts?: Array<any> | null,
    profile_pic?: {
        data: Buffer | null | undefined,
        contentType: String | null | undefined,
    } | null,
    biography?: String | null,
    SocialMediaLinks?: Array<any> | null,
    coverPhoto?: { data: Buffer, contentType: String } | null,
    images?: Array<any> | null,
    communitiesFollowed?: Array<any> | null,
    connection?: Array<any> | null,
    connectionRequests?: Array<any> | null,
    notifications?: Array<object> | null,
    message?: Array<any> | null,
    tasks?: Array<taskType> | null,
    _id: string,
}

export interface tokenInterface extends userInterface {
    iat: number,
    exp: number,
    jti: string,
}

export type messageType = {
    param?: string,
    msg?: string,
}
export interface GlobalInterface {
    message: Array<messageType>,
    setMessage: (c: Array<messageType> | []) => void,
    containerRef: React.RefObject<HTMLDivElement>,
    loading: boolean,
    setLoading: (c: boolean) => void,
    session: SessionInterface | undefined,
    taskList: Array<taskType> | [],
    setList: (c: Array<taskType> | []) => void,
}

export interface HeaderBarType {
    MenuRef: React.RefObject<HTMLDivElement>,
    openMenu: (c: HTMLDivElement | null) => void,
    closeMenu: (c: HTMLDivElement | null) => void,
    AccountLinkRef: React.RefObject<HTMLDivElement>,
    MobileMenuRef: React.RefObject<HTMLDivElement>,
    MobileIconRef: React.RefObject<HTMLImageElement>,
}

export type imageType = {
    contentType: string | null | undefined,
    data: Array<any> | string | null | undefined,
}

export type taskType = {
    name: string,
    dateCreated: Date,
    finished: boolean,
    _id: string,
    _v: any,
}

export type newTaskType = {
    name: string,
    dateCreated: Date,
    finished: boolean,
}

export type listItem = Array<taskType>;

export type ListInterface = {
    list: Array<taskType> | undefined | [] | null,
    setList: (c: Array<taskType>) => void,
    userData?: tokenInterface,
}

export interface SessionInterface {
    user: {
        name: string,
        email: string,
        image: string,
        ObjectId: string,
    },
    token: userInterface,
}

export interface EditTaskContext {
    name?: string | null,
    taskId: string,
    setEdit: (c: boolean) => void,
    taskList: Array<taskType>,
    setList: (c: Array<taskType>) => void,
    index: number,
}


export type ErrorMessageType = {
    message: string, 
}

export interface CreateNewAccountInt {
    name: string | null |undefined,
    email: string | null | undefined,
    image: any | undefined,
}