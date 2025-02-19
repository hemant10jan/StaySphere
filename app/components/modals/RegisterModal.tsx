"use client"

import React, { useCallback, useState } from 'react'
import axios from 'axios'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import useRegisterModal from '@/app/hooks/useRegisterModal'
import { FieldValues,SubmitHandler,useForm } from 'react-hook-form'
import Modal from './Modal'
import Heading from '../Heading'
import Input from "../inputs/Input"
import toast from 'react-hot-toast'
import Button from '../Button'
import { signIn } from 'next-auth/react'
import useLoginModal from '@/app/hooks/useLoginModal'

function RegisterModal() {
  const registerModal=useRegisterModal()
  const loginModal=useLoginModal()

  const [loading,setLoading]=useState(false)

  const {
    register,
    handleSubmit,
    formState:{ errors },
  }=useForm<FieldValues>({
    defaultValues:{
        name:"",
        email:"",
        password:""
    }
  });

  const onSubmit : SubmitHandler<FieldValues> = (data) =>{
    setLoading(true)
    
    axios.post("/api/register",data)
    .then(()=>{
      toast.success("Success!")
      registerModal.onClose()
      loginModal.onOpen()
    })
    .catch((error)=>{
      toast.error("Something went wrong.")
    })
    .finally(()=>{
      setLoading(false)
    })
  }

  const toggle=useCallback(()=>{
    loginModal.onOpen()
    registerModal.onClose()
  },[loginModal,registerModal])

  const bodyContent=(
    <div className='flex flex-col gap-4'>
        <Heading title='Welcome to Airbnb' subtitle='Create an account' center/>
        <Input id="email" required disabled={loading} label='Email' register={register} errors={errors}/>
        <Input id="name" required disabled={loading} label='Name' register={register} errors={errors}/>
        <Input id="password" type='password' required disabled={loading} label='Password' register={register} errors={errors}/>
    </div>
  )

  const footerContent=(
    <div className='flex flex-col gap-4 mt-3'>
      <hr/>
      <Button label='Continue with Google' icon={FcGoogle} onClick={()=>signIn("google")} outline/>
      <Button label='Continue with Github' icon={AiFillGithub} onClick={()=>signIn("github")} outline/>
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='justify-center flex flex-row items-center gap-2'>
          <div>Already have an account?</div>
          <div onClick={toggle} className='text-neutral-800 cursor-pointer hover:underline'>
            Login
          </div>
        </div>
      </div>
    </div>
  )
  return (
    <Modal disabled={loading} isOpen={registerModal.isOpen} title='Register' actionLabel='Continue'
    onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent}/>
  )
}

export default RegisterModal
