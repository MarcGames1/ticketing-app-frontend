interface ValidationError {
    class: string;
    field: string;
    violationMessage?: string;
}

export interface APIErrorResponse {
    message?: string;
    host: string;
    resource: string;
    title: string;
    errors?: ValidationError[];
}