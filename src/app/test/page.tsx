'use client'

import Image from "next/image";

// https://bucketdemojava.s3.eu-west-3.amazonaws.com/2efc65fa-bb39-4168-887c-368061eedc5d
const TestPage = () =>{


    return (
        <>
        <Image src={'https://bucketdemojava.s3.eu-west-3.amazonaws.com/2efc65fa-bb39-4168-887c-368061eedc5d'} alt={'test'} width={200} height={200} />
        </>
    )
}

export  default TestPage